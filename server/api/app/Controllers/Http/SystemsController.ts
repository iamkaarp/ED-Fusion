import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import System from 'App/Models/System'

export default class SystemsController {
  private columns = ['name', 'population', 'distance', 'updated_at', 'dist']
  private directions = ['asc', 'desc']
  public async index({ response, request }: HttpContextContract) {
    try {
      const qs = request.qs()
      const ref = qs.ref ? decodeURI(qs.ref) : null
      const page = qs.page ? parseInt(qs.page) : 1
      let column = this.columns.includes(qs.column) ? qs.column : 'distance'
      const direction = this.directions.includes(qs.direction) ? qs.direction : 'asc'
      const systemsQuery = System.query()

      // Preloads
      systemsQuery
        .select('*')
        .whereNot('address', 0)
        .preload('stations', (query) => {
          query.select('name', 'type')
        })
        .preload('government')
        .preload('security')
        .preload('primaryEconomy')
        .preload('allegiance')

      if (ref) {
        const system = await System.findBy('name', ref)
        if (system) {
          systemsQuery.select(
            Database.raw(`distanceBetweenSystems('${system.position}', position) as dist`)
          )
          column = column === 'distance' ? 'dist' : column
        }
      }

      if (Object.keys(qs).includes('showPopulated') && qs.showPopulated === 'true') {
        systemsQuery.whereNot('population', 0)
      }

      if (Object.keys(qs).includes('needsPermit') && qs.needsPermit === 'true') {
        systemsQuery.where('needs_permit', 1)
      }
      const systems = await systemsQuery.orderBy(column, direction).paginate(page, 25)
      return response.status(200).json({ systems })
    } catch (e) {
      console.log(e.message)
      return response.status(404).json({ message: 'System not found' })
    }
  }
  public async find({ response, request }: HttpContextContract) {
    const qs = request.qs()
    if (qs.q.length <= 0) {
      return response.status(400).json({ systems: [] })
    }
    const systems = await System.query()
      .where('name', 'like', `%${qs.q}%`)
      .preload('stations', (query) => {
        query.select('name', 'type')
      })
      .preload('government')
      .preload('security')
      .preload('primaryEconomy')
      .preload('allegiance')
      .limit(10)
    return response.status(200).json({ systems })
  }

  public async positions({ response, request }: HttpContextContract) {
    const qs = request.qs()
    const dist = qs.distance ? (parseInt(qs.distance) > 70000 ? 70000 : parseInt(qs.distance)) : 150
    const systems = await System.query()
      .select('name', 'position', 'distance')
      .whereNot('address', 0)
      .where('distance', '<=', dist)
      .orderBy('distance', 'asc')
    return response.status(200).json(systems)
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const name = decodeURI(params.id)
      const system = await System.query()
        .where('name', name)
        .preload('government')
        .preload('security')
        .preload('primaryEconomy')
        .preload('allegiance')
        .first()
      if (!system) {
        return response.status(404).json({ message: 'System not found' })
      }
      return response.status(200).json({ system })
    } catch (e) {
      return response.status(404).json({ message: 'System not found' })
    }
  }

  public async distance({ response, params }: HttpContextContract) {
    const systemA = params.a ? decodeURI(params.a) : 'Sol'
    const systemB = params.b ? decodeURI(params.b) : 'Sol'
    const distance = await this.distanceCalc(systemA, systemB)

    return response.status(200).json(distance)
  }

  private async distanceCalc(systemA: string = 'Sol', systemB: string = 'Sol'): Promise<number> {
    const system1 = await System.query().where('name', systemA).first()
    const system2 = await System.query().where('name', systemB).first()
    if (!system1 || !system2) {
      return 0.0
    }
    const distance = await Database.query()
      .select(Database.raw(`distanceBetweenSystems(${system1?.id}, ${system2?.id}) as distance`))
      .first()
    return distance
  }
}
