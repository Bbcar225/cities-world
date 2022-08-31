import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Citie from 'App/Models/Citie'
import Countrie from 'App/Models/Countrie'
import cities_ci from '../cities/ci.json'

export default class extends BaseSeeder {
  public async run() {
    await Citie.truncate()

    const ci = await Countrie.query().where('code_iso', 'ci').first()

    if (ci) {
      let cities_ci_clean: any = []

      cities_ci.forEach(async (city: { city: any; lat: any; lng: any; population: any }) => {
        cities_ci_clean.push({
          countrie_id: ci.id,
          name       : city.city,
          latitude   : city.lat,
          longitude  : city.lng,
          population : city.population || null
        })
      })

      await Citie.createMany(cities_ci_clean.sort((a: { name: any }, b: { name: any }) => {
        let fa = a.name, fb = b.name;

        return fa < fb ? -1 : (fa > fb ? 1 : 0)
      }))
    }
  }
}
