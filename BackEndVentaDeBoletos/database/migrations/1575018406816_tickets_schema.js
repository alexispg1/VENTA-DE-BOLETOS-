'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketsSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.string("type_ticket",100).notNullable()
      table.string("class_bus",100).notNullable()
      table.date('deperture_date').notNullable()
      table.time('deperture_time').notNullable()
      table.string('deperture_place',100).notNullable()
      table.string('destination_place',100).notNullable()
      table.date('return_date').notNullable()
      table.integer('id_client').unsigned().references('id').inTable('clients')
      table.timestamps()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketsSchema
