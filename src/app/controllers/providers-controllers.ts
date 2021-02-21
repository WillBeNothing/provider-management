/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Providers from '../models/Providers';

export default class CreateProviders {
  async create(req: Request, res: Response) {
    const {
      name, email, website, telefone,
    } = req.body;

    const data = {
      name,
      email,
      website,
      telefone,
    };

    const ProvidersRepository = getRepository(Providers);
    const thereIs = await ProvidersRepository.find({
      name,
    });
    if (thereIs.length !== 0) {
      return res.status(400).json({ error: `The user ${name} was already created!` });
    }
    const providers = ProvidersRepository.create(data);

    await ProvidersRepository.save(providers);

    return res.status(200).json(providers);
  }

  async index(req:Request, res: Response) {
    const ProvidersRepository = getRepository(Providers);
    const GotProviders = await ProvidersRepository.find({
      relations: ['products'],
    });

    return res.json(GotProviders).status(200);
  }
}
