import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Countrie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_code: string

  @column()
  public code_iso: string

  @column()
  protected name: string

  @column()
  public access: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
