import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Citie from 'App/Models/Citie'
import StoreCityValidator from 'App/Validators/City/StoreCityValidator'
import UpdateCityValidator from 'App/Validators/City/UpdateCityValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'
import Countrie from 'App/Models/Countrie'


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
      const city = await this.get_city(params)

      return city.merge(this.data_store_form_request(request)).save()
    }
    catch(error)
    {
      return `Not found city for ${params.city_name}`
    }
  }

  public async destroy({ params }: HttpContextContract)
  {
    try
    {
      const city = await this.get_city(params)

      await city.delete()

      return true
    }
    catch (error)
    {
      return `Not found city for ${params.city_name}`
    }
  }

  public async upload({ request }: HttpContextContract)
  {
    const validator = schema.create({
      code_iso: schema.string([
        rules.exists({table: 'countries', column: 'code_iso'})
      ]),

      file: schema.file({
        extnames: ['json']
      })
    })

    const data = await request.validate({ schema: validator })

    try
    {
      const country = await this.get_country(data.code_iso)

      const file = request.file('file')

      await file?.moveToDisk('./', {
        name: `${country.code_iso}.${file.extname}`
      })

      const file_name: any = file?.fileName;

      const contents = await Drive.get(file_name)

      contents.toJSON()

      const content : any = eval(contents.toString('utf-8'))

      let cities: any = []

      content.forEach(async (city: { city: any; lat: any; lng: any; population: any }) => {
        cities.push({
          countrie_id: country.id,
          name       : city.city,
          latitude   : city.lat,
          longitude  : city.lng,
          population : city.population || null
        })
      })

      await country.related('cities').query().delete()

      await Citie.createMany(cities.sort((a: { name: any }, b: { name: any }) => {
        let fa = a.name, fb = b.name;

        return fa < fb ? -1 : (fa > fb ? 1 : 0)
      }))

      await Drive.delete(file_name)

      return country.related('cities').query()
    }
    catch(error)
    {
      return `Not found country for ${request.input('code_iso')}`
    }
  }

  private get_city(params: any)
  {
    return Citie.query().where('name', params.city_name).where('countrie_id', params.country_id).firstOrFail()
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

  protected get_country(code_iso: string)
  {
    return Countrie.query().where('code_iso', code_iso).firstOrFail()
  }
}
