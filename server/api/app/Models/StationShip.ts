import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Ship from 'App/Models/Ship'

export default class StationShip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stationId: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Ship, {
    localKey: 'name',
    foreignKey: 'key',
  })
  public ship: HasOne<typeof Ship>
}
