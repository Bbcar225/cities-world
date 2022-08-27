import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Citie from 'App/Models/Citie'

export default class Countrie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_code: string

  @column()
  public code_iso: string

  @column()
  public name: string

  @column()
  public access: string

  @hasMany(() => Citie, {
    foreignKey: 'countrie_id'
  })
  public cities: HasMany<typeof Citie>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
