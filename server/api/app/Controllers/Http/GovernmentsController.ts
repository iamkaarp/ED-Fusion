import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Government from 'App/Models/Government'

export default class GovernmentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const governments = Government.all()
      return response.status(200).json(governments)
    } catch (e) {
      return response.status(500).json({
        error: e.message,
      })
    }
  }
}
