import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ship from 'App/Models/Ship'

export default class ShipsController {
  public async index({ response }: HttpContextContract) {
    try {
      const ships = await Ship.query().orderBy('price', 'asc')
      return response.json(ships)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const ship = await Ship.query()
        .where('name', decodeURI(params.name))
        .preload('stats', (query) => {
          query
            .preload('core')
            .preload('optionals', (query) => {
              query.orderBy('type', 'asc').orderBy('size', 'desc')
            })
            .preload('hardpoints', (query) => {
              query.orderBy('size', 'desc')
            })
        })
        .first()
      if (!ship) {
        return response.status(404).json({ error: 'Ship not found' })
      }
      return response.status(200).json(ship)
    } catch (e) {
      return response.status(500).json({ error: e.message })
    }
  }
}
