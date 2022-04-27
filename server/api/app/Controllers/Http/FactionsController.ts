import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SystemFaction from 'App/Models/SystemFaction'
import Faction from 'App/Models/Faction'

export default class FactionsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const factions = await Faction.query().paginate(params.page, 25)
      return response.status(200).json(factions)
    } catch (e) {
      return response.status(404).json({ message: 'Faction not found' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const faction = await Faction.query()
        .where('name', params.name)
        .preload('government')
        .preload('allegiance')
        .first()
      return response.status(200).json(faction)
    } catch (e) {
      return response.status(404).json({ message: 'Faction not found' })
    }
  }

  public async indexBySystem({ response, params }: HttpContextContract) {
    try {
      const factions = await SystemFaction.query().where('system_id', params.id).preload('faction')
      return response.status(200).json(factions)
    } catch (e) {
      return response.status(404).json({ message: 'System not found' })
    }
  }
}
