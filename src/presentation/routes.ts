import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRoutes = Router();

    router.use('/api/v1', apiRoutes);

    return router;
  }
}
