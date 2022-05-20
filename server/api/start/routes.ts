/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// EDDN ROUTES

Route.group(() => {
  Route.post('/eddn/receive', 'EDDNController.receive')
}).namespace('App/Controllers/Http')

// SYSTEM ROUTES
Route.group(() => {
  Route.get('systems/find', 'SystemsController.find')
  Route.get('systems/positions', 'SystemsController.positions')

  Route.resource('systems', 'SystemsController')
    .only(['index', 'show', 'store', 'update', 'destroy'])
    .middleware({
      index: ['auth'],
      show: ['auth'],
    })
  Route.get('systems/:system_id/stations/orbital', 'SystemStationsController.orbital')
  Route.get('systems/:system_id/stations/planetary', 'SystemStationsController.planetary')
  Route.get('systems/:system_id/stations/fleetcarrier', 'SystemStationsController.fleetCarrier')
  Route.resource('systems.stations', 'SystemStationsController').only(['index'])
  Route.resource('systems.factions', 'SystemFactionsController').only(['index'])
  Route.get('systems/:system_id/bodies/stars', 'SystemBodiesController.stars')
  Route.get('systems/:system_id/bodies/planets', 'SystemBodiesController.planets')
  Route.resource('systems.bodies', 'SystemBodiesController').only(['index'])
}).namespace('App/Controllers/Http')

// STATION ROUTES

Route.group(() => {
  Route.get('stations/find', 'StationsController.find')
  Route.get('stations/types', 'StationsController.types')
  Route.resource('stations', 'StationsController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
  Route.resource('stations.ships', 'StationShipsController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
  Route.resource('stations.commodities', 'StationCommoditiesController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
  Route.resource('stations.outfitting', 'StationModulesController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
}).namespace('App/Controllers/Http')

// BODY ROUTES

Route.group(() => {
  Route.post('bodies/stars', 'BodiesController.storeStar')
  Route.post('bodies/planets', 'BodiesController.storePlanet')
}).namespace('App/Controllers/Http')

// FACTION ROUTES

Route.group(() => {
  Route.resource('factions', 'FactionsController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
}).namespace('App/Controllers/Http')

// SERVICE ROUTES

Route.group(() => {
  Route.resource('services', 'ServicesController')
}).namespace('App/Controllers/Http')

// COMMODITY ROUTES

Route.group(() => {
  Route.get('commodities/categories', 'CommoditiesController.categories')
  Route.resource('commodities', 'CommoditiesController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
}).namespace('App/Controllers/Http')

// MODULE ROUTES

Route.group(() => {
  Route.resource('modules', 'ModulesController').only([
    'index',
    'show',
    'store',
    'update',
    'destroy',
  ])
}).namespace('App/Controllers/Http')

// SHIP ROUTE

Route.group(() => {
  Route.resource('ships', 'ShipsController').only(['index', 'show', 'store', 'update', 'destroy'])
}).namespace('App/Controllers/Http')

// DISCOUNT ROUTES

Route.group(() => {
  Route.resource('discounts', 'DiscountsController').only(['index', 'store', 'update', 'destroy'])
}).namespace('App/Controllers/Http')

// USER ROUTE
Route.group(() => {
  Route.get('users/hash', 'UsersController.hash')
  Route.post('users/login', 'UsersController.login')
  Route.resource('users', 'UsersController').only(['index', 'show', 'store', 'update', 'destroy'])
})
