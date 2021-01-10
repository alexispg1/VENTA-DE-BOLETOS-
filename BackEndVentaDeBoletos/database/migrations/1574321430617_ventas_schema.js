'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VentasSchema extends Schema {
  up () {
    this.create('ventas', (table) => {
      table.increments()
      table.string('nameBus',50).notNullable()
      table.integer('occupiedSeats').notNullable()
      table.string('typeSeat',50).notNullable();
      table.integer('freeSeats').notNullable()
      table.integer('specialFreeSeats').notNullable()
      table.integer('totalSeatsSold').notNullable()
      table.date('date').notNullable()
      table.integer('bus_id').unsigned().references('id').inTable('buses')
      table.timestamps()
    })
  }

  down () {
    this.drop('ventas')
  }
}

module.exports = VentasSchema
