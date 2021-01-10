'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('user/register','UserController.store');
  Route.post('user/login','UserController.login');
  
  Route.post('user/add/bus','BusController.create');
  Route.put('user/update/status/bus/:id','BusController.updateStatus');
  Route.put('user/update/:id','BusController.update');
  Route.get('user/all','BusController.index'); 
  Route.get('user/bus/:id','BusController.show');
  Route.get('user/bus/name','BusController.showByName');

  Route.post('user/history','HistoryController.store');
  Route.get('user/history','HistoryController.index');
  Route.post('user/history/bus','HistoryController.indexByBus');
  
  Route.post('user/venta','VentaController.store'); 
  Route.get('user/venta','VentaController.index'); 
  Route.post('user/ventas/bus','VentaController.indexByBus'); 


}).prefix('api/v1/');
