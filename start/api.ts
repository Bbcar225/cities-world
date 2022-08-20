import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.get('', 'Api/CountriesController.index').as('index')

        Route.get(':code_iso', 'Api/CountriesController.show').as('show')

        Route.get(':code_iso/cities', 'Api/CountriesController.cities_index').as('cities.index')

        Route
    }).prefix('countries').as('countries')
}).prefix('api').as('api')
