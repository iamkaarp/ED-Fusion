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
import Body from 'App/Models/Body'

import Log from 'App/Models/Log'

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
        .andWhereNot('type', 'FleetCarrier')
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

  public async indexOribtalStations({ response, params }: HttpContextContract) {
    try {
      const columns = ['type', 'name', 'updated_at', 'distance_from_star', 'max_landing_pad_size']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'distance_from_star'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stationTypes = ['FleetCarrier', 'CraterOutpost', 'OnFootSettlement', 'CraterPort']
      const stations = await Station.query()
        .where('system_id', sys)
        .whereNotIn('type', stationTypes)
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

  public async indexPlanetaryStations({ response, params }: HttpContextContract) {
    try {
      const columns = ['type', 'name', 'updated_at', 'distance_from_star', 'max_landing_pad_size']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'distance_from_star'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stationTypes = ['CraterOutpost', 'OnFootSettlement', 'CraterPort']
      const stations = await Station.query()
        .where('system_id', sys)
        .whereIn('type', stationTypes)
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

  public async indexFleetCarriers({ response, params }: HttpContextContract) {
    try {
      const columns = ['type', 'name', 'updated_at', 'distance_from_star', 'max_landing_pad_size']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'distance_from_star'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stations = await Station.query()
        .where('system_id', sys)
        .andWhere('type', 'FleetCarrier')
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
      const columns = [
        'factions.name',
        'influence',
        'state',
        'super_powers.name',
        'governments.name',
        'factions.updated_at',
      ]
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'influence'
      const id = decodeURI(params.id)
      const system = await System.find(id)
      const sys = system ? system.id : 492
      const stations = await SystemFaction.query()
        .select('faction_id', 'factions.*', 'governments.name', 'super_powers.name')
        .where('system_id', sys)
        .join('factions', 'system_factions.faction_id', '=', 'factions.id')
        .join('governments', 'factions.government_id', '=', 'governments.id')
        .join('super_powers', 'factions.allegiance_id', '=', 'super_powers.id')
        .preload('faction', (query) => {
          query.preload('government').preload('allegiance')
        })
        .orderBy(column, direction)

      return response.status(200).json(stations)
    } catch (e) {
      console.log(e.message)
      return response.status(404).json({ message: 'System not found' })
    }
  }

  public async indexBodies({ response, params }: HttpContextContract) {
    try {
      const columns = ['name', 'class', 'atmosphere', 'mass', 'landable', 'distance', 'updated_at']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'name'
      const id = decodeURI(params.id)
      const system = await System.findOrFail(id)

      const bodies = await Body.query()
        .where('system_id', system.id)
        .preload('planets', (query) => {
          query.preload('compositions').preload('materials').orderBy(column, direction)
        })
        .first()

      if (bodies) {
        return response.status(200).json(bodies)
      } else {
        return response
          .status(200)
          .json({ id: null, system_id: system.id, updated_at: null, planets: [], stars: [] })
      }
    } catch (e) {
      return response.status(404).json({ message: 'System not found' })
    }
  }

  public async indexStars({ response, params }: HttpContextContract) {
    try {
      const columns = ['name', 'type', 'is_main', 'mass', 'distance', 'updated_at']
      const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
      const column = columns.includes(params.column) ? params.column : 'name'
      const id = decodeURI(params.id)
      const system = await System.findOrFail(id)

      const bodies = await Body.query()
        .where('system_id', system.id)
        .preload('stars', (query) => {
          query.orderBy(column, direction)
        })
        .first()

      if (bodies) {
        return response.status(200).json(bodies)
      } else {
        return response
          .status(200)
          .json({ id: null, system_id: system.id, updated_at: null, planets: [], stars: [] })
      }
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
    const message = request.input('message')
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
    const system = await System.firstOrCreate(search, payload)
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
    await Log.create({
      type: 'system',
      typeId: system.id,
      event: message.message.event ? message.message.event : 'system',
      schema: message.$schemaRef,
      software: message.header.softwareName,
      softwareVersion: message.header.softwareVersion,
      message,
    })
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
