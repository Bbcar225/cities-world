import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Countrie from 'App/Models/Countrie'

export default class CountriesController {
  protected exposed_data_country = ['name', 'phone_code', 'code_iso']
  protected exposed_data_city    = ['name', 'latitude', 'longitude', 'population']

  public async index({ }: HttpContextContract) {
    return await Countrie.query().select(this.exposed_data_country)
  }

  public async show({ params }: HttpContextContract) {
    try {
      return await Countrie.query().where('code_iso', params.code_iso).select(this.exposed_data_country).firstOrFail()
    }
    catch (e) {
      return 'Not found country'
    }
  }

  public async cities_index({ params }: HttpContextContract) {
    try {
      const country = await Countrie.query().where('code_iso', params.code_iso).firstOrFail()

      return country.related('cities').query().select(this.exposed_data_city)
    }
    catch (e) {
      return 'Not found country'
    }
  }
}
