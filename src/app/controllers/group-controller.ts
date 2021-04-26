import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import GroupModel from '../models/Group';

export default class Group {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const GroupRepository = getRepository(GroupModel);

      const thereIs = await GroupRepository.find({ name });

      if (thereIs.length !== 0) {
        return res.status(400).json({ error: `The group ${name} was already created!` });
      }

      const group = GroupRepository.create({ name });

      await GroupRepository.save(group);

      return res.status(200).json({ group });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const GroupRepository = getRepository(GroupModel);
      const group = await GroupRepository.findOne(id, {
        relations: ['products'],
        order: {
          name: 'ASC',
        },
      });

      return res.status(200).json(group);
    } catch (err) {
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }

  // eslint-disable-next-line no-unused-vars
  async index(req: Request, res: Response) {
    try {
      const GroupRepository = getRepository(GroupModel);
      const group = await GroupRepository.find({
        order: {
          name: 'ASC',
        },
      });

      return res.status(200).json(group);
    } catch (err) {
      console.error(err);
      return res.status(500).json('Internal Error');
    }
  }
}
