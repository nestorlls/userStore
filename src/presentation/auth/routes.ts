import { Router } from 'express';

import { AuthController } from './controller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.EMAIL_SERVICE,
      envs.EMAIL_USER,
      envs.EMAIL_PASSWORD_KEY,
      envs.SEND_EMAIL
    );
    const authService = new AuthService(emailService, envs.WEB_SERVICE_URL);
    const controller = new AuthController(authService);

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }
}
