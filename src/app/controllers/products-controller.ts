import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Products from '../models/Products';
import Providers from '../models/Providers';
import Group from '../models/Group';

export default class Product {
  async create(req: Request, res: Response) {
   try {
    const {
      name, price, productCode, provider, group,
    } = req.body;

    const ProductsRepository = getRepository(Products);
    const ProviderRepository = getRepository(Providers);
    const GroupRepository = getRepository(Group);

    const providerID = await ProviderRepository.findOne({ name: provider });
    const groupID = await GroupRepository.findOne({ name: group });

    if (!providerID || !groupID) {
      return res.status(400).json('Check if providers or group exist');
    }

    const thereIs = await ProductsRepository.find({ name });

    if (thereIs.length !== 0) {
      return res.status(400).json({ error: `The product ${name} was already created!` });
    }

    const data = {
      name,
      price,
      productCode,
      provider: providerID,
      group: groupID,
    };

    const products = ProductsRepository.create(data);

    await ProductsRepository.save(products);

    return res.status(200).json(products);
   } catch(err) {
    console.error(err);
    return res.status(500).json('Internal Error');
   }
  }

  // eslint-disable-next-line no-unused-vars
  async index(req: Request, res: Response) {
    try {
      const ProductsRepository = getRepository(Products);
    const products = await ProductsRepository.find({
      relations: ['group', 'provider'],
    });

    return res.status(200).json(products);
    } catch(err) {
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  async show(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ProductsRepository = getRepository(Products);
    const product = await ProductsRepository.findOne(id, {
      relations: ['group', 'provider'],
    });

    if (!product) {
      return res.status(404).json('product wasn\'t found');
    }

    return res.status(200).json(200);
  } catch (err) {
    console.error(err);
      return res.status(500).json('Internal Error');
  }
  }
}
