import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Body from 'App/Models/Body'
import BodyPlanetComposition from 'App/Models/BodyPlanetComposition'
import BodyPlanetMaterial from 'App/Models/BodyPlanetMaterial'

export default class BodyPlanet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bodyId: number

  @column()
  public name: string

  @column()
  public mass: number

  @column()
  public class: string

  @column()
  public atmosphere: string

  @column()
  public landable: boolean

  @column()
  public distance: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Body)
  public body: BelongsTo<typeof Body>

  @hasMany(() => BodyPlanetComposition)
  public compositions: HasMany<typeof BodyPlanetComposition>

  @hasMany(() => BodyPlanetMaterial)
  public materials: HasMany<typeof BodyPlanetMaterial>
}
