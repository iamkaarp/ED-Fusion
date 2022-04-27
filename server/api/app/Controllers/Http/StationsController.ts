import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Commodity from 'App/Models/Commodity'
import Economy from 'App/Models/Economy'
import Faction from 'App/Models/Faction'
import Government from 'App/Models/Government'
import Station from 'App/Models/Station'
import SuperPower from 'App/Models/SuperPower'
import System from 'App/Models/System'
import SystemFaction from 'App/Models/SystemFaction'

export default class StationsController {
  public async index({ response, params }: HttpContextContract) {
    const page = params.page ? parseInt(params.page) : 1
    try {
      const station = await Station.query().paginate(page)
      return response.status(200).json({ station })
    } catch (e) {}
  }

  public async show({ response, params }: HttpContextContract) {
    const slug = params.name ? decodeURI(params.name) : ''
    try {
      const station = await Station.query()
        .where('name', slug)
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
        .firstOrFail()
      return response.status(200).json({ station })
    } catch (e) {
      return response.status(404).json({ message: 'Station not found' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
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
      const system = await System.updateOrCreate(search, systemPayload)
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

      const stationPayload = {
        name: request.input('name'),
        system_id: system.id,
        market_id: request.input('market_id'),
        distance_from_star: request.input('distance_from_star_LS'),
        max_landing_pad_size: request.input('max_landing_pad_size'),
        allegianceId: allegiance?.id,
        governmentId: government?.id,
        type: request.input('type'),
        economyId: economy?.id,
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
      return response.status(201).json({ message: 'Station created', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  public async storeCommodities({ request, response }: HttpContextContract) {
    try {
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
      return response.status(201).json({ message: 'commodities added', station })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}
