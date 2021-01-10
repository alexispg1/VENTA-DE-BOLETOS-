'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorySchema extends Schema {
  up () {
    this.create('histories', (table) => {
      table.increments()
      table.string('nameBus',50).notNullable()
      table.string('class',50).notNullable()
      table.string('ticketsSolds').notNullable()
      table.string('destino').notNullable()
      table.integer('total').notNullable()
      table.integer('bus_id').unsigned().references('id').inTable('buses')
      table.timestamps()
    })
  }

  down () {
    this.drop('histories')
  }
}

module.exports = HistorySchema
