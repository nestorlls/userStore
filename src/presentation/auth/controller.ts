import { Request, Response } from 'express';

export class AuthController {
  //DI
  constructor() {}

  login = (req: Request, res: Response) => {
    return res.json('login');
  };

  register = (req: Request, res: Response) => {
    return res.json('register');
  };

  validateEmail = (req: Request, res: Response) => {
    return res.json('validateEmail');
  };
}
