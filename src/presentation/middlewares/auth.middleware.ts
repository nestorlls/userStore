import { NextFunction, Request, Response } from 'express';

import { JwtAdapter } from '../../config';
import { User } from '../../data';
import { UserEntity } from '../../domain';

export class AuthMiddleware {
  static authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).json({ error: 'token no provided' });
    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';
    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid Token' });

      const user = await User.findOne({ _id: payload.id });

      if (!user) return res.status(401).json({ error: 'User not found' });

      // todo: check if user is active

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
