import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

//import Body from 'App/Models/Body'
//import BodyPlanet from 'App/Models/BodyPlanet'
//import BodyStar from 'App/Models/BodyStar'
import Commodity from 'App/Models/Commodity'
import Economy from 'App/Models/Economy'
import Faction from 'App/Models/Faction'
import Government from 'App/Models/Government'
import Station from 'App/Models/Station'
import StationCommodity from 'App/Models/StationCommodity'
import StationShip from 'App/Models/StationShip'
import StationModule from 'App/Models/StationModule'
import SuperPower from 'App/Models/SuperPower'
import System from 'App/Models/System'
import SystemFaction from 'App/Models/SystemFaction'

import Log from 'App/Models/Log'

export default class StationsController {
  private columns = [
    'name',
    'systems.name',
    'super_powers.name',
    'distance_from_star',
    'distance',
    'updated_at',
  ]

  private stationTypes = [
    'Coriolis',
    'Ocellus',
    'Orbis',
    'Outpost',
    'Bernal',
    'MegaShip',
    'AsteroidBase',
  ]

  private directions = ['asc', 'desc']
  public async index({ response, params, request }: HttpContextContract) {
    let st = this.stationTypes
    const qs = request.qs()
    const page = params.page ? parseInt(params.page) : 1
    const column = this.columns.includes(params.column) ? params.column : 'systems.distance'
    const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
    const stationsQuery = Station.query()

    // Primary Query
    stationsQuery
      .select('stations.*', 'systems.name as system_name', 'systems.distance as distance')
      .whereNot('systems.address', 0)
      .join('systems', 'systems.id', '=', 'stations.system_id')

    // Preload
    stationsQuery
      .preload('system', (query) => {
        query.whereNot('address', 0)
      })
      .preload('government')
      .preload('economies', (query) => {
        query.preload('economy')
      })
      .preload('faction', (query) => {
        query.preload('faction')
      })
      .preload('allegiance')

    // Filters
    if (Object.keys(qs).includes('showFc') && qs.showFc === 'true') {
      st.push('FleetCarrier')
    } else {
      st = this.stationTypes.filter((t) => t !== 'FleetCarrier')
    }

    if (Object.keys(qs).includes('showPlanetary') && qs.showPlanetary === 'true') {
      st.push('CraterOutpost', 'CraterPort', 'OnFootSettlement')
    } else {
      st = this.stationTypes.filter((t) => t !== 'CraterOutpost')
      st = st.filter((t) => t !== 'CraterPort')
      st = st.filter((t) => t !== 'OnFootSettlement')
    }
    stationsQuery.whereIn('type', st)

    if (Object.keys(qs).includes('services')) {
      let services = qs.services
      if (services.includes('searchrescue')) {
        services.push('SearchAndRescue')
      } else {
        services = services.filter((s) => s !== 'SearchAndRescue')
      }
      stationsQuery.whereIn(
        'stations.id',
        Database.from('station_services').select('station_id').whereIn('name', services)
      )
    }

    if (Object.keys(qs).includes('commodities')) {
      stationsQuery.whereIn(
        'stations.id',
        Database.from('station_commodities').select('station_id').whereIn('name', qs.commodities)
      )
    }

    if (Object.keys(qs).includes('ships')) {
      stationsQuery.whereIn(
        'stations.id',
        Database.from('station_ships').select('station_id').whereIn('name', qs.ships)
      )
    }

    if (Object.keys(qs).includes('modules')) {
      stationsQuery.whereIn(
        'stations.id',
        Database.from('station_modules').select('station_id').whereIn('name', qs.modules)
      )
    }

    if (Object.keys(qs).includes('types')) {
      stationsQuery.whereIn('type', qs.types)
    }

    if (Object.keys(qs).includes('arrival') && qs.arrival !== '') {
      stationsQuery.where('distance_from_star', '<=', qs.arrival)
    }

    const stations = await stationsQuery
      .orderBy(column, direction)
      .orderBy('name', 'asc')
      .paginate(page, 25)
    return response.status(200).json({ stations })
  }

  public async indexTypes({ response }: HttpContextContract) {
    try {
      const types = await Station.query().distinct('type')

      return response.status(200).json(types)
    } catch (e) {
      return response.status(500).json({ message: 'Error fetching station types', msg: e.message })
    }
  }

  public async indexShips({ response, params }: HttpContextContract) {
    try {
      const ships = await StationShip.query()
        .select('station_ships.*')
        .join('ships', 'station_ships.name', '=', 'ships.key')
        .preload('ship')
        .where('station_id', params.id)
        .orderBy('price', 'asc')
      return response.status(200).json(ships)
    } catch (e) {
      return response.status(500).json({ message: 'Error fetching station ships', msg: e.message })
    }
  }

  public async indexModules({ response, params }: HttpContextContract) {
    const columns = ['modules.name', 'price', 'class', 'rating', 'updated_at']
    const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
    const column = columns.includes(params.column) ? params.column : 'name'
    try {
      const modules = await StationModule.query()
        .select('station_modules.*')
        .join('modules', 'station_modules.name', '=', 'modules.key')
        .preload('module')
        .where('station_id', params.id)
        .orderBy(column, direction)
      return response.status(200).json(modules)
    } catch (e) {
      return response
        .status(500)
        .json({ message: 'Error fetching station modules', msg: e.message })
    }
  }

  public async indexCommodities({ response, params }: HttpContextContract) {
    const columns = ['commodities.name', 'sell_price', 'buy_price', 'demand', 'stock', 'updated_at']
    const direction = this.directions.includes(params.direction) ? params.direction : 'asc'
    const column = columns.includes(params.column) ? params.column : 'name'
    try {
      const modules = await StationCommodity.query()
        .select('station_commodities.*')
        .preload('commodity')
        .join('commodities', 'station_commodities.name', '=', 'commodities.key')
        .where('station_id', params.id)
        .orderBy(column, direction)
      return response.status(200).json(modules)
    } catch (e) {
      return response
        .status(500)
        .json({ message: 'Error fetching station commodities', msg: e.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const slug = params.name ? decodeURI(params.name) : ''
    try {
      const stationQuery = Station.query()
        .where('name', slug)
        .preload('system')
        .preload('government')
        .preload('economy')
        .preload('economies', (query) => {
          query.preload('economy')
        })
        .preload('faction', (query) => {
          query.preload('faction')
        })
        .preload('commodities', (query) => {
          query.preload('commodity')
        })
        .preload('services', (query) => {
          query.preload('service')
        })
        .preload('allegiance')
        .firstOrFail()

      const station = await stationQuery

      /*const body = await Body.query()
        .preload('planets')
        .preload('stars')
        .where('system_id', station.systemId)
        .first()

      const planet = body?.planets.filter((p) => {
        //console.log(Math.trunc(p.distance) === Math.trunc(station.distanceFromStar), p.name)
        return Math.trunc(p.distance) === Math.trunc(station.distanceFromStar)
      })*/

      return response.status(200).json({ station })
    } catch (e) {
      return response.status(404).json({ message: 'Station not found' })
    }
  }

  public async find({ response, request }: HttpContextContract) {
    const qs = request.qs()
    if (qs.q.length <= 0) {
      return response.status(400).json({ stations: [] })
    }
    const stations = await Station.query()
      .where('name', 'like', `%${qs.q}%`)
      .preload('system')
      .preload('government')
      .preload('economy')
      .preload('allegiance')
      .limit(10)
    return response.status(200).json({ stations })
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const search = {
        name: request.input('system_name'),
        address: request.input('address'),
      }
      const stationSearch = {
        name: request.input('name'),
        market_id: request.input('market_id'),
      }
      const systemPayload = {
        name: request.input('system_name'),
        position: request.input('position'),
        address: request.input('address'),
      }

      const economiesPayload = request.input('economies').map((e) => {
        return {
          name: e.Name,
          proportion: e.Proportion,
        }
      })

      const factionPayload = {
        name: request.input('faction').Name,
        state: request.input('faction').FactionState ? request.input('faction').FactionState : '',
      }
      const factionSearch = {
        name: request.input('faction').Name,
      }
      const allegianceReq =
        request.input('allegiance') !== '' ? request.input('allegiance') : 'Independent'
      const system = await System.firstOrCreate(search, systemPayload)
      const faction = await Faction.updateOrCreate(factionSearch, factionPayload)
      const government = await Government.query().where('key', request.input('government')).first()
      const economy = await Economy.query().where('key', request.input('economy')).first()
      const allegiance = await SuperPower.query().where('name', allegianceReq).first()

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
      const landingPads = request.input('landingPads')
      let stationPayload
      if (landingPads) {
        let maxPadSize
        if (landingPads.Large > 0) {
          maxPadSize = 'L'
        } else if (landingPads.Medium > 0 && landingPads.Large === 0) {
          maxPadSize = 'M'
        } else if (landingPads.Small > 0 && landingPads.Medium === 0 && landingPads.Large === 0) {
          maxPadSize = 'S'
        }

        stationPayload = {
          name: request.input('name'),
          system_id: system.id,
          market_id: request.input('market_id'),
          distance_from_star: request.input('distance_from_star_LS'),
          allegianceId: allegiance?.id,
          governmentId: government?.id,
          type: request.input('type'),
          economyId: economy?.id,
          largePads: landingPads.Large,
          mediumPads: landingPads.Medium,
          smallPads: landingPads.Small,
          max_landing_pad_size: maxPadSize,
        }
      } else {
        stationPayload = {
          name: request.input('name'),
          system_id: system.id,
          market_id: request.input('market_id'),
          distance_from_star: request.input('distance_from_star_LS'),
          allegianceId: allegiance?.id,
          governmentId: government?.id,
          type: request.input('type'),
          economyId: economy?.id,
        }
      }

      const stationFactionSearch = {
        factionId: faction.id,
      }

      const servicesPayload = request.input('services').map((e) => {
        return {
          name: e,
        }
      })

      const station = await Station.updateOrCreate(stationSearch, stationPayload)
      await station.related('economies').updateOrCreateMany(economiesPayload)
      await station.related('services').updateOrCreateMany(servicesPayload)
      await station.related('faction').updateOrCreate(stationFactionSearch, stationFactionSearch)
      await Log.create({
        type: 'station',
        typeId: station.id,
        event: message.message.event ? message.message.event : 'station',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })
      await Log.create({
        type: 'system',
        typeId: system.id,
        event: message.message.event ? message.message.event : 'station',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })
      return response.status(201).json({ message: 'Station created', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  public async storeCommodities({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const stationSearch = {
        name: request.input('name'),
        market_id: request.input('market_id'),
      }

      const system = await System.firstOrCreate(
        { name: request.input('system_name') },
        { name: request.input('system_name') }
      )

      const stationPayload = {
        name: request.input('name'),
        system_id: system.id,
        market_id: request.input('market_id'),
      }

      const commodities = await Promise.all(
        request.input('commodities').map(async (c) => {
          const commodity = await Commodity.query().where('key', c.name).first()

          if (commodity) {
            return {
              name: c.name,
              commodityId: commodity?.id,
              buyPrice: c.buyPrice,
              sellPrice: c.sellPrice,
              demand: c.demand,
              stock: c.stock,
              demandBracket: c.demandBracket,
              stockBracket: c.stockBracket,
              meanPrice: c.meanPrice,
            }
          }
        })
      )

      const com = commodities.filter((c) => c !== undefined)

      const station = await Station.updateOrCreate(stationSearch, stationPayload)
      await station.related('commodities').updateOrCreateMany(com)

      request.input('commodities').forEach(async (c) => {
        const sc = await StationCommodity.query()
          .where('name', c.key)
          .min({ minSell: 'sell_price', minBuy: 'buy_price' })
          .max({ maxSell: 'sell_price', maxBuy: 'buy_price' })
          .avg({ avgSell: 'sell_price', avgBuy: 'buy_price' })
        console.log(sc[0])
        /*await Commodity.query().where('key', c.name).update({
            minSell: sc[0].$extras.minSell,
            maxSell: sc[0].$extras.maxSell,
            avgSell: sc[0].$extras.avgSell,
            minBuy: sc[0].$extras.minBuy,
            maxBuy: sc[0].$extras.maxBuy,
            avgBuy: sc[0].$extras.avgBuy,
          })*/
      })

      await Log.create({
        type: 'system',
        typeId: system.id,
        event: message.message.event ? message.message.event : 'commodity',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })

      await Log.create({
        type: 'station_commodity',
        typeId: station.id,
        event: message.message.event ? message.message.event : 'commodity',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })
      return response.status(201).json({ message: 'commodities added', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  public async storeShips({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const stationSearch = {
        name: request.input('name'),
        marketId: request.input('market_id'),
      }

      const stationPayload = {
        name: request.input('name'),
        marketId: request.input('market_id'),
      }

      const station = await Station.updateOrCreate(stationSearch, stationPayload)
      station.related('ships').updateOrCreateMany(
        request.input('ships').map((s) => {
          return { name: s.toLowerCase() }
        }),
        'name'
      )

      await Log.create({
        type: 'station_ships',
        typeId: station.id,
        event: message.message.event ? message.message.event : 'ships',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })

      return response.status(201).json({ message: 'ships added', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
  public async storeModules({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const stationSearch = {
        name: request.input('name'),
        marketId: request.input('market_id'),
      }

      const stationPayload = {
        name: request.input('name'),
        marketId: request.input('market_id'),
      }

      const station = await Station.updateOrCreate(stationSearch, stationPayload)
      station.related('modules').updateOrCreateMany(
        request.input('modules').map((s) => {
          return { name: s.toLowerCase() }
        }),
        'name'
      )

      await Log.create({
        type: 'station_modules',
        typeId: station.id,
        event: message.message.event ? message.message.event : 'module',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })

      return response.status(201).json({ message: 'modules added', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}
