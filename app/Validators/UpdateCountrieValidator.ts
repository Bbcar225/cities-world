import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCountrieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    code_iso: this.ctx.params.code_iso
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
    phone_code: schema.string({}, [
      rules.trim(),
      rules.minLength(1),
      rules.maxLength(10),
      rules.unique({table: 'countries', column: 'phone_code', whereNot: {code_iso: this.refs.code_iso}})
    ]),

    code_iso: schema.string({}, [
      rules.trim(),
      rules.minLength(2),
      rules.maxLength(5),
      rules.unique({table: 'countries', column: 'code_iso', whereNot: {code_iso: this.refs.code_iso}})
    ]),

    name: schema.string({}, [
      rules.trim(),
      rules.minLength(1),
      rules.maxLength(20),
      rules.unique({table: 'countries', column: 'name', whereNot: {code_iso: this.refs.code_iso}})
    ])
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
