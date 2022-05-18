import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import System from 'App/Models/System'
import Body from 'App/Models/Body'
import BodyStar from 'App/Models/BodyStar'
import BodyPlanet from 'App/Models/BodyPlanet'

import Log from 'App/Models/Log'

export default class BodiesController {
  public async storeStar({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const search = {
        name: request.input('name'),
        address: request.input('address'),
      }

      const systemPayload = {
        name: request.input('name'),
        position: request.input('position'),
        address: request.input('address'),
      }

      const system = await System.firstOrCreate(search, systemPayload)

      const bodySearch = {
        systemId: system.id,
      }

      const body = await Body.updateOrCreate(bodySearch, { systemId: system.id })

      const bodyStarSearch = {
        bodyId: body.id,
        name: request.input('bodyName'),
      }

      const bodyStarPayload = {
        bodyId: body.id,
        name: request.input('bodyName'),
        mass: request.input('stellarMass'),
        type: request.input('type'),
        distance: request.input('distance'),
        isMain: request.input('isMain'),
      }

      const star = await BodyStar.updateOrCreate(bodyStarSearch, bodyStarPayload)

      await Log.create({
        type: 'star',
        typeId: star.id,
        event: message.message.event ? message.message.event : 'star',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })

      return response.status(200).json({ star })
    } catch (e) {
      return response.status(404).json({ message: e.message })
    }
  }

  public async storePlanet({ request, response }: HttpContextContract) {
    try {
      const message = request.input('message')
      const search = {
        name: request.input('name'),
        address: request.input('address'),
      }

      const systemPayload = {
        name: request.input('name'),
        position: request.input('position'),
        address: request.input('address'),
      }

      const system = await System.firstOrCreate(search, systemPayload)

      const bodySearch = {
        systemId: system.id,
      }

      const body = await Body.updateOrCreate(bodySearch, { systemId: system.id })

      const planetSearch = {
        bodyId: body.id,
        name: request.input('bodyName'),
      }

      const planetPayload = {
        bodyId: body.id,
        name: request.input('bodyName'),
        mass: request.input('mass'),
        class: request.input('class'),
        landable: request.input('landable'),
        atmosphere: request.input('atmosphere'),
        distance: request.input('distance'),
      }

      const planet = await BodyPlanet.updateOrCreate(planetSearch, planetPayload)

      if (request.input('compositions').length > 0) {
        await planet.related('compositions').createMany(request.input('compositions'))
      }
      if (request.input('materials').length > 0) {
        await planet.related('materials').createMany(request.input('materials'))
      }

      await Log.create({
        type: 'planet',
        typeId: planet.id,
        event: message.message.event ? message.message.event : 'planet',
        schema: message.$schemaRef,
        software: message.header.softwareName,
        softwareVersion: message.header.softwareVersion,
        message,
      })

      return response.status(200).json({ planet })
    } catch (e) {
      return response.status(404).json({ message: e.message })
    }
  }
}
