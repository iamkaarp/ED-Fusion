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
  Route.post('/eddn/journal', 'EDDNController.journal')
}).namespace('App/Controllers/Http')

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
  Route.get(
    'system/:id/stations/orbital/:column?/:direction?',
    'SystemsController.indexOribtalStations'
  )
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get(
    'system/:id/stations/planetary/:column?/:direction?',
    'SystemsController.indexPlanetaryStations'
  )
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get(
    'system/:id/stations/fleetCarriers/:column?/:direction?',
    'SystemsController.indexFleetCarriers'
  )
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('system/:id/stations/:column?/:direction?', 'SystemsController.indexStations')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)

  Route.get('system/:id/factions/:column?/:direction?', 'SystemsController.indexFactions')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('system/:id/fleetcarriers/:column?/:direction?', 'SystemsController.indexFleetCarriers')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('systems/distance/:a/:b', 'SystemsController.distance')
    .where('a', /^[\w\d\s\W]+$/)
    .where('b', /^[\w\d\s\W]+$/)
  Route.get('system/:id/bodies/:column?/:direction?', 'SystemsController.indexBodies')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('system/:id/stars/:column?/:direction?', 'SystemsController.indexStars')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.post('systems', 'SystemsController.store')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('stations/:page?/:column?/:direction?', 'StationsController.index')
    .where('page', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('stations/search', 'StationsController.find')
  Route.get('stations/types', 'StationsController.indexTypes')
  Route.get('station/:name', 'StationsController.show')
  Route.get('station/:id/ships', 'StationsController.indexShips')
  Route.get('station/:id/modules/:column/:direction?', 'StationsController.indexModules')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.get('station/:id/commodities/:column?/:direction?', 'StationsController.indexCommodities')
    .where('id', /^[0-9]+$/)
    .where('column', /^[\w\d\s\W]+$/)
    .where('direction', /^[asc|desc]+$/)
  Route.post('stations', 'StationsController.store')
  Route.post('stations/:name/commodities', 'StationsController.storeCommodities').where(
    'name',
    /^[\w\d\s\W]+$/
  )

  Route.post('stations/:name/ships', 'StationsController.storeShips').where('name', /^[\w\d\s\W]+$/)
  Route.post('stations/:name/modules', 'StationsController.storeModules').where(
    'name',
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

Route.group(() => {
  Route.post('bodies/stars', 'BodiesController.storeStar')
  Route.post('bodies/planets', 'BodiesController.storePlanet')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('services', 'ServicesController.index')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('commodities', 'CommoditiesController.index')
  Route.get('commodity/categories', 'CommoditiesController.indexCategories')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('modules', 'ModulesController.index')
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('ships', 'ShipsController.index')
  Route.get('ships/:name', 'ShipsController.show').where('name', /^[\w\d\s\W]+$/)
}).namespace('App/Controllers/Http')

Route.group(() => {
  Route.get('discounts', 'DiscountsController.index')
  Route.get('discounts/:system', 'DiscountsController.indexBySystem').where('name', /^[\w\d\s\W]+$/)
})
