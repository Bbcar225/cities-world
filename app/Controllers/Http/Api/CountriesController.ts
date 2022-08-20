import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Countrie from 'App/Models/Countrie'

export default class CountriesController
{
    public async index({}: HttpContextContract)
    {
        return await Countrie.query().select('name', 'phone_code', 'code_iso')
    }

    public async show({ params }: HttpContextContract)
    {
        try
        {
            return await Countrie.query().where('code_iso', params.code_iso).firstOrFail()
        }
        catch (e)
        {
            return 'Not found'
        }
    }
}
