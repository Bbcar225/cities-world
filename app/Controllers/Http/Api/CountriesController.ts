import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Countrie from 'App/Models/Countrie'

export default class CountriesController
{
    protected exposed_data = ['name', 'phone_code', 'code_iso']

    public async index({}: HttpContextContract)
    {
        return await Countrie.query().select(this.exposed_data)
    }

    public async show({ params }: HttpContextContract)
    {
        try
        {
            return await Countrie.query().where('code_iso', params.code_iso).select(this.exposed_data).firstOrFail()
        }
        catch (e)
        {
            return 'Not found country'
        }
    }
}
