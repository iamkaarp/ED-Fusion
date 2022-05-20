import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async hash({ response }: HttpContextContract) {
    const hash = await Hash.make('password')
    return response.status(200).json({ hash })
  }

  public async login({ auth, response, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.json({ token: token.token, type: 'Bearer' })
    } catch {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }
}
