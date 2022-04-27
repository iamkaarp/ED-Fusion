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

Route.group(() => {
  Route.get('systems/:page?/:column?/:direction?', 'SystemsController.index')
    .where('page', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('systems/search', 'SystemsController.find')
  Route.get('systems/positions/:distance?', 'SystemsController.positions').where(
    'distance',
    /^[0-9]+$/
  )
  Route.get('systems/:name', 'SystemsController.show')
  Route.get('system/:id/stations/:column?/:direction?', 'SystemsController.indexStations')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('system/:id/factions/:column?/:direction?', 'SystemsController.indexFactions')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('systems/distance/:a/:b', 'SystemsController.distance')
    .where('a', /^[\w\d\s\W]+$/)
    .where('b', /^[\w\d\s\W]+$/)
  Route.post('systems', 'SystemsController.store')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('stations/:page?/:column?/:direction?', 'StationsController.index')
    .where('page', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('stations/search/:page?/:column?/:direction?', 'StationsController.find')
    .where('page', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('stations/:name', 'StationsController.show')
  Route.post('stations', 'StationsController.store')
  Route.post('stations/:slug/commodities', 'StationsController.storeCommodities').where(
    'slug',
    /^[\w\d\s\W]+$/
  )
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('trading/routes', 'TradeRoutesController.find')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('factions/:page?/:column?/:direction?', 'FactionsController.index')
    .where('page', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('factions/:name', 'FactionsController.show')
}).namespace('App/Controllers/Http')
