'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BusesSchema extends Schema {
  up () {
    this.create('buses', (table) => {
      table.increments()
      table.string('nameBus',50).notNullable()
      table.string('class',50).notNullable()
      table.string('status',50).notNullable()
      table.string('description',50).notNullable()
      table.time('time').notNullable()
      table.date('date').notNullable()
      table.string('departure').notNullable()
      table.string('destination').notNullable()
      table.integer('totalSeats').notNullable()
      table.integer('totalSeatsEspecialFree').notNullable()
      table.integer('priceBase').notNullable() 
      table.integer('totalPrice').notNullable()     
      table.timestamps()
    })
  }

  down () {
    this.drop('buses')
  }
}

module.exports = BusesSchema
