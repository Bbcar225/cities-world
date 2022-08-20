import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('countrie_id').unsigned().references('id').inTable('countries').onDelete('CASCADE')
      table.bigInteger('region_id').nullable()
      table.string('name').notNullable()
      table.float('latitude').nullable()
      table.float('longitude').nullable()
      table.integer('population').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
