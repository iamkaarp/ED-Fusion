import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Commodity from 'App/Models/Commodity'

export default class CommoditiesController {
  public async index({ response }: HttpContextContract) {
    try {
      const commodities = await Commodity.all()

      return response.status(200).json(commodities)
    } catch (e) {
      console.log(e)
      return response.status(500).json({ error: e.message })
    }
  }

  public async indexCategories({ response }: HttpContextContract) {
    try {
      const categories = await Commodity.query().distinct('category')
      return response.status(200).json(categories)
    } catch (e) {
      return response.status(500).json({ error: e.message })
    }
  }
}
