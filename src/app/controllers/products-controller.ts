/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Products from '../models/Products';
import Providers from '../models/Providers';
import Group from '../models/Group';
import ProductsView from '../../views/ProcuctsView';

export default class Product {
  async create(req: Request, res: Response) {
    try {
      const {
        name, price, productCode, provider, group, isDollar, actived,
      } = req.body;

      const ProductsRepository = getRepository(Products);
      const ProviderRepository = getRepository(Providers);
      const GroupRepository = getRepository(Group);

      const providerID = await ProviderRepository.findOne({ name: provider });
      const groupID = await GroupRepository.findOne({ name: group });

      if (!providerID || !groupID || !req.file) {
        return res.status(400).json('Check if providers or group exist');
      }

      // eslint-disable-next-line no-undef
      const imageProps = req.file as Express.Multer.File;

      console.log(req.file.path);
      // eslint-disable-next-line no-return-assign
      const images = {
        name: `${name}:${provider}`,
        url: imageProps.path,
      };

      const thereIs = await ProductsRepository.find({ where: { name }, relations: ['provider', 'group'] });

      let canContinue = true;
      const check = () => {
        thereIs.forEach((product) => {
          if (thereIs.length > 0 && product.provider.id === providerID.id && canContinue) {
            canContinue = false;
            return res.json({ error: 'Duplicating products' }).status(400);
          }
          return false;
        });
      };

      check();

      const data = {
        name,
        price,
        productCode,
        isDollar,
        actived,
        provider: providerID,
        group: groupID,
        images,
      };

      if (canContinue) {
        const products = ProductsRepository.create(data);

        await ProductsRepository.save(products);

        return res.status(200).json(ProductsView.render(products));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  // eslint-disable-next-line no-unused-vars
  async index(req: Request, res: Response) {
    try {
      const ProductsRepository = getRepository(Products);
      const products = await ProductsRepository.find({
        relations: ['group', 'provider', 'images'],
      });

      return res.status(200).json(ProductsView.renderMany(products));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ProductsRepository = getRepository(Products);
      const product = await ProductsRepository.findOne(id, {
        relations: ['group', 'provider', 'images'],
      });

      if (!product) {
        return res.status(404).json('product wasn\'t found');
      }

      return res.status(200).json(ProductsView.render(product));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  async update(req: Request, res: Response) {
    const {
      groupName,
    } = req.body;
    const { id }: any = req.params;

    const GroupRepository = getRepository(Group);

    const group = await GroupRepository.findOne({ name: groupName });

    if (!group && groupName) {
      return res.status(400).json('Check if providers or group exist');
    }

    const ProductsRepository = getRepository(Products);
    const thereIs = await ProductsRepository.find({ id });

    if (thereIs.length === 0) {
      return res.status(400).json('The product does not exist');
    }

    await ProductsRepository.update(id, req.body);

    const product = await ProductsRepository.findOne(id, {
      relations: ['group', 'provider', 'images'],
    });

    if (!product) {
      return res.status(404).json('product wasn\'t found');
    }

    return res.status(200).json(ProductsView.render(product));
  }
}
