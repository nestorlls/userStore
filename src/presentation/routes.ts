import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRoutes = Router();

    apiRoutes.use('/auth', AuthRoutes.routes);
    apiRoutes.use('/categories', CategoryRoutes.routes);

    router.use('/api/v1', apiRoutes);

    return router;
  }
}
