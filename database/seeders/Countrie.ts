import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Countrie from 'App/Models/Countrie'

export default class extends BaseSeeder {
    public async run () {
        let countries = [
            {
                phone_code: '+225',
                code_iso  : 'CI',
                name      : "Côte d'Ivoire",
            },
            {
                phone_code: '+224',
                code_iso  : 'GN',
                name      : "Guinée",
            }
        ]

        await Countrie.createMany(countries)
    }
}
