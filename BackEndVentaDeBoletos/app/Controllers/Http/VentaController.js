'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const History=use('App/Models/History');
const Bus=use('App/Models/Bus');
const Database = use('Database');
const Ventas=use('App/Models/Venta');

class VentaController {

  async index ({ request, response, view,auth }) {
    const user = await auth.getUser();
    const solds=await Ventas.all();
    return response.json({solds});
  }

  async indexByBus({response,request,auth}){
    const user = await auth.getUser();
    const data=request.all();
    const solds=await Database.table('ventas')
    .innerJoin('buses','buses.id','ventas.bus_id')
    .where('ventas.nameBus',data.nameBus)
    .select('ventas.nameBus','ventas.occupiedSeats','ventas.typeSeat',
    'ventas.freeSeats','ventas.specialFreeSeats','ventas.totalSeatsSold',
    'ventas.date','ventas.bus_id');
    return response.json({solds});
  }

  async store ({ request, response ,auth}) {
    const user = await auth.getUser();
    const data=request.all();
    const ventas=new Ventas();
    const bus=await Bus.findByOrFail('id',data.bus_id);
    var total_Seats=bus.totalSeats;
    var total_Seats_Especial_Free=bus.totalSeatsEspecialFree;
    var today = new Date();
    var day = today.getDate();
    var month= today.getMonth()+1;
    var year= today.getFullYear();
    var date=year+"-"+month+"-"+day;

    if(bus.totalSeats==0||bus.status=="inactivo"){
      return response.json({message:'bus not permited'});
    }
    else{
      ventas.nameBus=data.nameBus;
      ventas.occupiedSeats=data.occupiedSeats;
      ventas.totalSeatsSold=data.totalSeatsSold;
      ventas.date=date;
      ventas.typeSeat=data.typeSeat;
      ventas.bus_id=data.bus_id;
      if(data.typeSeat=="especial"){
        var total=total_Seats_Especial_Free-data.totalSeatsSold;  
        ventas.specialFreeSeats=total;
        ventas.freeSeats=total_Seats;
        await ventas.save();
        bus.merge({
          totalSeatsEspecialFree:total,
        });
        await bus.save();
        return response.json({ventas});
      }
      else{
        var total=total_Seats-data.totalSeatsSold;  
        ventas.freeSeats=total;
        ventas.specialFreeSeats=total_Seats_Especial_Free;
        await ventas.save();
        bus.merge({
          totalSeats:total,
        });
        await bus.save();
        return response.json({ventas});
      }  
      
    }
    
  }

}

module.exports = VentaController
