'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bus=use('App/Models/Bus');
const User=use('App/Models/User');

class BusController {

  async index ({ request, response,auth }) {
    const user = await auth.getUser();
    const bus=await Bus.all();
    return response.json({bus});
  }

  async create ({ request, response,auth}) {
    const user = await auth.getUser();
    const data=request.all();
    const bus=new Bus();
    bus.nameBus=data.nameBus;
    bus.class=data.class;
    bus.status=data.status;
    bus.description=data.description;
    bus.time=data.time;
    bus.date=data.date;
    bus.departure=data.departure;
    bus.destination=data.destination;
    bus.totalSeats=data.totalSeats;
    bus.totalSeatsEspecialFree=data.totalSeatsEspecialFree;
    bus.priceBase=data.priceBase;
    bus.totalPrice=data.totalPrice;

    await bus.save();
    return response.json({bus});

  }
  async updateStatus({ params, request, response,auth}) {
    const user = await auth.getUser();
    const id=params.id;
    const data=request.all();
    const bus=await Bus.find(id);
    var valor=data.status;
    if(data.status=!null){
      bus.merge({
        status:valor,
      });
      await bus.save();
      return response.json({bus});
    }
    else{
      return response.json({message:"fields emptys"});
    }

  }
  async update ({ params, request, response,auth}) {
    const user = await auth.getUser();
    const id=params.id;
    const bus=await Bus.find(id);
    const data=request.all();
    if(data==null){
      return response.json({message:"fields emptys"}); 
    }
    else{
      var time=data.time;
      var date=data.date;
      var destination=data.destination;
      bus.merge({
        time:time,
        date:date,
        destination:destination,    
      })
      await bus.save();
      return response.json({bus});
    }
  }

  async show ({ params, request, response,auth }) {
    const user = await auth.getUser();
    const id=params.id;
    const bus=await Bus.find(id);
    return response.json({bus});
  }

  async showByName ({ params, request, response,auth }) {
    const user = await auth.getUser();
    const data=request.all();
    const bus=await Bus.findByOrFail('destination',data.destination);;
    return response.json({bus});
  }



}

module.exports = BusController
