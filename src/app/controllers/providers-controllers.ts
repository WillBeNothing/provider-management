/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Providers from '../models/Providers';

export default class Provider {
  async create(req: Request, res: Response) {
    try {
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
    } catch (err) {
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  async index(req:Request, res: Response) {
    try {
      const ProvidersRepository = getRepository(Providers);
    const GotProviders = await ProvidersRepository.find({
      relations: ['products'],
    });

    return res.json(GotProviders).status(200);
    } catch (err) {
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  async update(req: Request, res: Response) {

    const { email, website, telefone } = req.body;
    const { id }:any = req.params;
    const ProviderRepository = getRepository(Providers);

    const thereIs = await ProviderRepository.find({ id });

    if(thereIs.length === 0) {
      return res.status(400).json('The provider does not exist!')
    }

    await ProviderRepository.update(id, req.body)

    const updated = await ProviderRepository.find({ id });

    return res.status(200).json(updated);
  }
}
