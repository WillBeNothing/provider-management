import { Request, Response } from 'express'
import { getRepository, Like} from 'typeorm'

import Providers from '../models/Providers'

export default class CreateProviders {
    async create(req: Request, res: Response) {

        const { name, email, website, telefone } = req.body

        const data = {
            name, 
            email,
            website,
            telefone
        }

        const ProvidersRepository = getRepository(Providers);
       const thereIs = await ProvidersRepository.find({
           name
       });
        if (thereIs.length != 0) {
            return res.status(400).json({error: `The user ${name} is already created!`});
        }
        const providers = ProvidersRepository.create(data)

        await ProvidersRepository.save(providers);


        return res.status(200).json(providers);
    }
}