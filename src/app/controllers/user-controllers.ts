import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import Users from '../models/User';

import 'dotenv/config';

export default class User {
  async store(req: Request, res: Response) {
    const { name, password, checkroot } = req.body;

    const UserRepository = getRepository(Users);

    // eslint-disable-next-line camelcase
    const password_hash = await bcrypt.hash(password, 8);

    if (checkroot !== process.env.ROOT_PASSWORD) {
      return res.status(401).json('You\'re nota root');
    }

    const user = await UserRepository.create({
      name,
      password_hash,
    });

    const CreatedUser = await UserRepository.save(user);
    const userID = CreatedUser.id;

    const auth: any = process.env.AUTH_SECRET?.toString();
    const token = JWT.sign({ userID }, auth);

    return res.status(200).json(token);
  }

  async session(req: Request, res: Response) {
    const { name, password } = req.body;

    console.log(name);

    const UserRepository = getRepository(Users);
    const user = await UserRepository.findOne({ name });

    if (!user) {
      return res.status(401).json({ error: 'The Users does not exists' });
    }

    const checkPassword = await bcrypt.compare(password, user.password_hash);

    if (!checkPassword) {
      return res.status(401).json({ error: 'The password does not match' });
    }

    const userID = user.id;
    const auth: any = process.env.AUTH_SECRET?.toString();

    const token = JWT.sign({ userID }, auth);
    return res.status(200).json(token);
  }
}
