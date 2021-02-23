import * as JWT from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

import 'dotenv/config';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Does not exist a Token' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const auth: any = process.env.AUTH_SECRET?.toString();
    const decoded: any = await JWT.verify(token, auth);
    if (!decoded) {
      return res.status(401).json({ error: 'Unatourizated' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid Token' });
  }
};
