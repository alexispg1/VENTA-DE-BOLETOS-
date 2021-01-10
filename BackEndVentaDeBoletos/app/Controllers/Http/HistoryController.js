'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const History=use('App/Models/History');
const Bus=use('App/Models/Bus');
const Database = use('Database')

class HistoryController {
  
  async index ({ request, response,auth}) {
    const user = await auth.getUser();
    const history=await History.all();
    response.json({history});  
  }
  async indexByBus({request,response,auth}){
    const user = await auth.getUser();
    const data=request.all();
    const bus =await Database.table('histories')
    .innerJoin('buses', 'buses.id', 'histories.bus_id')
    .where('histories.nameBus',data.nameBus)
    .select('histories.id','histories.nameBus','histories.class',
    'histories.ticketsSolds','histories.destino','histories.total','histories.bus_id')
    
    return response.json({bus});
  }
  async create ({ request, response, view }) {
  }
  async store ({ request, response,auth }) {
    const user = await auth.getUser();
    const data=request.all();
    const history=new History();
    history.nameBus=data.nameBus;
    history.class=data.class;
    history.ticketsSolds=data.ticketsSolds;
    history.destino=data.destino;
    history.total=data.total;
    history.bus_id=data.bus_id;
    await history.save();
    return response.json({history});
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

 
}

module.exports = HistoryController
