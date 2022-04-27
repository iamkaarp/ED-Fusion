import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Systems extends BaseSchema {
  protected tableName = 'systems'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('type').notNullable().defaultTo('unknown').after('address')
      table.boolean('needs_permit').notNullable().defaultTo(false).after('type')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type')
      table.dropColumn('needs_permit')
    })
  }
}
