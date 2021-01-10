'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name_user',100).notNullable()
      table.string('email',100).notNullable()
      table.string('payment_method',100).notNullable()
      table.string('seat',100).notNullable()
      table.string('total',100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
