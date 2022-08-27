import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('', 'Api/CountriesController.index').as('index')

    Route.get(':code_iso', 'Api/CountriesController.show').as('show')

    Route.get(':code_iso/cities', 'Api/CountriesController.cities_index').as('cities.index')

    Route.get(':code_iso/cities/:name_city', 'Api/CountriesController.cities_show').as('cities.show')

    Route.post('store', 'Api/CountriesController.store').as('store').middleware('auth:api')

    Route.delete('update/:code_iso', 'Api/CountriesController.update').as('update').middleware('auth:api')
  }).prefix('countries').as('countries')

  Route.group(() => {
    Route.post('login', 'Api/AuthentificationsController.login').as('login')
  }).as('auth')
}).prefix('api').as('api')
