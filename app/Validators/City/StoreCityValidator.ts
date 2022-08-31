import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreCityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    country_id: this.ctx.request.input('country_id')
  })

  /*
  * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
  *
  * For example:
  * 1. The username must be of data type string. But then also, it should
  *    not contain special characters or numbers.
  *    ```
  *     schema.string({}, [ rules.alpha() ])
  *    ```
  *
  * 2. The email must be of data type string, formatted as a valid
  *    email. But also, not used by any other user.
  *    ```
  *     schema.string({}, [
  *       rules.email(),
  *       rules.unique({ table: 'users', column: 'email' }),
  *     ])
  *    ```
  */
  public schema = schema.create({
    country_id: schema.number([
      rules.exists({table: 'countries', column: 'id'})
    ]),

    name: schema.string({trim: true}, [
      rules.minLength(2),
      rules.maxLength(255),
      rules.unique({table: 'cities', column: 'name', where: {countrie_id: this.refs.country_id}})
    ]),

    latitude: schema.number.nullableAndOptional(),

    longitude: schema.number.nullableAndOptional(),

    population: schema.number.nullableAndOptional()
  })

  /**
  * Custom messages for validation failures. You can make use of dot notation `(.)`
  * for targeting nested fields and array expressions `(*)` for targeting all
  * children of an array. For example:
  *
  * {
  *   'profile.username.required': 'Username is required',
  *   'scores.*.number': 'Define scores as valid numbers'
  * }
  *
  */
  public messages: CustomMessages = {}
}
