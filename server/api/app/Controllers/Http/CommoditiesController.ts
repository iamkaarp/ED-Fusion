import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Commodity from 'App/Models/Commodity'
//import StationCommodity from 'App/Models/StationCommodity'

export default class CommoditiesController {
  public async index({ response }: HttpContextContract) {
    try {
      const commodities = await Commodity.query()
        .select('commodities.*', Database.raw('MIN(station_commodities.sell_price) AS minSell'))
        .join('station_commodities', 'commodities.key', 'station_commodities.name')
        .toSQL()

      //const res = commodities.map((commodity) => commodity.serialize())
      return response.status(200).json({ commodities })
    } catch (e) {
      console.log(e)
      return response.status(500).json({ error: e.message })
    }
  }

  public async categories({ response }: HttpContextContract) {
    try {
      const categories = await Commodity.query().distinct('category')
      return response.status(200).json(categories)
    } catch (e) {
      return response.status(500).json({ error: e.message })
    }
  }
}
