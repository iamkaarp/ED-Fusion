import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import System from 'App/Models/System'
import Economy from 'App/Models/Economy'
import Security from 'App/Models/Security'
import Faction from 'App/Models/Faction'
import SuperPower from 'App/Models/SuperPower'
import Government from 'App/Models/Government'
import SystemFaction from 'App/Models/SystemFaction'
import Station from 'App/Models/Station'

export default class SystemsController {
  private columns = ['name', 'population', 'distance', 'updated_at']
  private directions = ['asc', 'desc']
  public async index({ response, params }: HttpContextContract) {
    const page = params.page ? parseInt(params.page) : 1
    const column = this.columns.includes(params.column) ? params.column : 'distance'
    const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
    const systems = await System.query()
      .select('*')
      .whereNot('address', 0)
      .preload('stations', (query) => {
        query.select('name', 'type')
      })
      .preload('government')
      .preload('security')
      .preload('primaryEconomy')
      .preload('allegiance')
      .orderBy(column, direction)
      .paginate(page, 25)
    return response.status(200).json({ systems })
  }

  public async indexStations({ response, params }: HttpContextContract) {
    try {
      const columns = ['type', 'name', 'updated_at', 'distance_from_star', 'max_landing_pad_size']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'distance_from_star'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stations = await Station.query()
        .where('system_id', sys)
        .preload('economies', (query) => {
          query.preload('economy')
        })
        .preload('faction', (query) => {
          query.preload('faction')
        })
        .preload('government')
        .orderBy(column, direction)

      return response.status(200).json(stations)
    } catch (e) {
      console.log(e.message)
      return response.status(404).json({ message: 'System not found' })
    }
  }

  public async indexFactions({ response, params }: HttpContextContract) {
    try {
      const columns = ['faction.name', 'influence', 'updated_at']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'influence'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stations = await SystemFaction.query()
        .where('system_id', sys)
        .join('factions', 'system_factions.faction_id', '=', 'factions.id')
        .preload('faction', (query) => {
          query.preload('government').preload('allegiance')
        })
        .orderBy(column, direction)

      return response.status(200).json(stations)
    } catch (e) {
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

  public async positions({ response, params }: HttpContextContract) {
    const dist = params.distance
      ? parseInt(params.distance) > 70000
        ? 70000
        : parseInt(params.distance)
      : 150
    const systems = await System.query()
      .select('name', 'position', 'distance')
      .whereNot('address', 0)
      .where('distance', '<=', dist)
      .orderBy('distance', 'asc')
    return response.status(200).json(systems)
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const name = decodeURI(params.name)
      const system = await System.query()
        .where('name', name)
        .preload('government')
        .preload('security')
        .preload('primaryEconomy')
        .preload('allegiance')
        .first()

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

  public async store({ request, response }: HttpContextContract) {
    const search = {
      name: request.input('name'),
      address: request.input('address'),
    }

    const government = await Government.query().where('key', request.input('government')).first()
    const economy = await Economy.query().where('key', request.input('economy')).first()
    const security = await Security.query().where('key', request.input('security')).first()
    const superPower = await SuperPower.query().where('name', request.input('allegiance')).first()

    const payload = {
      name: request.input('name'),
      address: request.input('address'),
      position: request.input('position'),
      population: request.input('population'),
      governmentId: government?.id,
      securityId: security?.id,
      primaryEconomyId: economy?.id,
      allegianceId: superPower?.id,
    }
    const system = await System.updateOrCreate(search, payload)
    if (request.input('factions')) {
      const factionsPayload = await Promise.all(
        request.input('factions').map(async (f) => {
          const allegiance = await SuperPower.query().where('name', f.alignment).first()
          const government = await Government.query().where('name', f.government).first()
          return {
            name: f.name,
            state: f.state,
            allegiance_id: allegiance ? allegiance.id : 5,
            government_id: government ? government.id : 10,
            happiness: f.happiness,
            influence: f.influence,
            activeStates: f.activeStates,
            pendingStates: f.pendingStates,
            recoveringStates: f.recoveringStates,
          }
        })
      )

      const factions = await Faction.updateOrCreateMany('name', factionsPayload)
      const systemFactions = factions.map((faction) => {
        return {
          systemId: system.id,
          factionId: faction.id,
        }
      })
      await SystemFaction.updateOrCreateMany(['systemId', 'factionId'], systemFactions)
    }
    return response.status(201).json({ system })
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
