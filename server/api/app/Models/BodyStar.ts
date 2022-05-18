import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import Body from 'App/Models/Body'

export default class BodyStar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bodyId: number

  @column()
  public name: string

  @column()
  public mass: number

  @column()
  public type: string

  @column()
  public distance: number

  @column()
  public isMain: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Body)
  public body: BelongsTo<typeof Body>
}
