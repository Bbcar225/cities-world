import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Countrie from './Countrie'

export default class Citie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public countrie_id: number

  @column()
  public region_id?: number

  @column()
  public name: string

  @column()
  public latitude?: number

  @column()
  public longitude?: number

  @column()
  public population?: number

  @belongsTo(() => Countrie, {
    foreignKey: 'countrie_id',
  })
  public country: BelongsTo<typeof Countrie>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
