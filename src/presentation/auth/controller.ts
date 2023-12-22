import { Request, Response } from 'express';
import { CustomeError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

export class AuthController {
  //DI
  constructor(private readonly authService: AuthService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .login(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .register(registerUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    this.authService
      .validateEmail(token)
      .then(() => res.json('Email was validated successfully'))
      .catch((error) => this.handleError(error, res));
  };
}
