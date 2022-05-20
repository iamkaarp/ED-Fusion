import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StationCommodity from 'App/Models/StationCommodity'

export default class StationCommoditiesController {
  private directions = ['asc', 'desc']

  public async index({ response, request, params }: HttpContextContract) {
    const qs = request.qs()
    const columns = ['commodities.name', 'sell_price', 'buy_price', 'demand', 'stock', 'updated_at']
    const direction = this.directions.includes(qs.direction) ? qs.direction : 'asc'
    const column = columns.includes(qs.column) ? qs.column : 'name'
    try {
      const modules = await StationCommodity.query()
        .select('station_commodities.*')
        .preload('commodity')
        .join('commodities', 'station_commodities.name', '=', 'commodities.key')
        .where('station_id', params.station_id)
        .orderBy(column, direction)
      return response.status(200).json(modules)
    } catch (e) {
      return response
        .status(500)
        .json({ message: 'Error fetching station commodities', msg: e.message })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
