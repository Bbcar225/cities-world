import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Countrie from 'App/Models/Countrie'
import StoreCountrieValidator from 'App/Validators/StoreCountrieValidator'
import UpdateCountrieValidator from 'App/Validators/UpdateCountrieValidator'

export default class CountriesController {
  protected exposed_data_country = ['name', 'phone_code', 'code_iso']
  protected exposed_data_city = ['name', 'latitude', 'longitude', 'population']

  public async index({ }: HttpContextContract) {
    return await Countrie.query().select(this.exposed_data_country)
  }

  public async show({ params }: HttpContextContract) {
    try {
      return await Countrie.query().where('code_iso', params.code_iso).select(this.exposed_data_country).firstOrFail()
    }
    catch (e) {
      return `Not found country for ${params.code_iso}`
    }
  }

  public async cities_index({ params }: HttpContextContract) {
    try {
      const country = await this.get_country(params.code_iso)

      return country.related('cities').query().select(this.exposed_data_city)
    }
    catch (e) {
      return `Not found cities for the country ${params.code_iso}`
    }
  }

  public async cities_show({ params }: HttpContextContract) {
    params.name_city = decodeURIComponent(params.name_city)

    try {
      const country = await this.get_country(params.code_iso)

      const city = await country.related('cities').query().where('name', 'LIKE', '%'+params.name_city+'%').select(this.exposed_data_city).firstOrFail()

      if (city) return city
    }
    catch (e) {
      return `Not found city with ${params.name_city} for the country ${params.code_iso}`
    }
  }

  public async store({ request }: HttpContextContract)
  {
    await request.validate(StoreCountrieValidator)

    return await Countrie.create({
      phone_code: request.input('phone_code'),
      code_iso  : request.input('code_iso').toUpperCase(),
      name      : request.input('name')
    })
  }

  public async update({ params, request }: HttpContextContract)
  {
    await request.validate(UpdateCountrieValidator)

    try {
      const country = await this.get_country(params.code_iso)

      return await country.merge({
        phone_code: request.input('phone_code'),
        code_iso  : request.input('code_iso').toUpperCase(),
        name      : request.input('name')
      }).save()
    }
    catch (e)
    {
      return `Not found country for ${params.code_iso}`
    }
  }

  public async destroy({ params, request }: HttpContextContract)
  {
    try {
      const country = await this.get_country(params.code_iso)

      if (request.input('cities') == 1)
      {
        await country.related('cities').query().where('countrie_id', country.id).delete()
      }

      await country.delete()

      return true
    }
    catch (e)
    {
      return `Not found country for ${params.code_iso}`
    }
  }

  protected get_country(code_iso: string)
  {
    return Countrie.query().where('code_iso', code_iso).firstOrFail()
  }
}
