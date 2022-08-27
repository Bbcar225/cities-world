import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthentificationsController
{
  public async login({ request, auth, response }: HttpContextContract)
  {
    const email = request.input('email')

    const password = request.input('password')

    try
    {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 year'
      })

      return token
    }
    catch
    {
      return response.unauthorized('Invalid credentials')
    }
  }
}
