import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Citie from 'App/Models/Citie'
import StoreCityValidator from 'App/Validators/City/StoreCityValidator'
import UpdateCityValidator from 'App/Validators/City/UpdateCityValidator'

export default class CitiesController
{
  public async store({ request }: HttpContextContract)
  {
    await request.validate(StoreCityValidator)

    return await Citie.create(this.data_store_form_request(request))
  }

  public async update({ params, request }: HttpContextContract)
  {
    await request.validate(UpdateCityValidator)

    try
    {
      const city = await this.get_city(params.name)

      return city.merge(this.data_store_form_request(request)).save()
    }
    catch(error)
    {
      return `Not found city for ${params.name}`
    }
  }

  private get_city(name: string)
  {
    return Citie.query().where('name', name).firstOrFail()
  }

  private data_store_form_request(request: any) {
    return {
      countrie_id: request.input('country_id'),
      name       : request.input('name'),
      latitude   : request.input('latitude'),
      longitude  : request.input('longitude'),
      population : request.input('population')
    }
  }
}
