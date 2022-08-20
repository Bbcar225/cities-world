import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
