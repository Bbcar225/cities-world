import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // List of contries
    Route.get('/', 'Api/CountriesController.index').as('index')

    // Get infos country
    Route.get(':code_iso', 'Api/CountriesController.show').as('show')

    // List cities of country
    Route.get(':code_iso/cities', 'Api/CountriesController.cities_index').as('cities.index')

    // Get infos city of a country
    Route.get(':code_iso/cities/:name_city', 'Api/CountriesController.cities_show').as('cities.show')

    Route.group(() => {
      // Add a new country
      Route.post('store', 'Api/CountriesController.store').as('store')

      // Update a country
      Route.patch('update/:code_iso', 'Api/CountriesController.update').as('update')

      // Destroy a country
      Route.delete('destroy/:code_iso', 'Api/CountriesController.destroy').as('destroy')
    }).middleware('auth:api')
  }).prefix('countries').as('countries')

  Route.group(() => {
    Route.group(() => {
      // Add new city of country
      Route.post('store', 'Api/CitiesController.store').as('store')

      Route.post('upload/', 'Api/CitiesController.upload').as('upload')

      // Update city of country
      Route.patch('update/:country_id/:city_name/', 'Api/CitiesController.update').as('update')

      // Destroy city of country
      Route.delete('destroy/:country_id/:city_name/', 'Api/CitiesController.destroy').as('destroy')
    }).middleware('auth:api')
  }).prefix('cities').as('cities')

  // Authentification
  Route.group(() => {
    // Login
    Route.post('login', 'Api/AuthentificationsController.login').as('login')
  }).as('auth')
}).prefix('api').as('api')
