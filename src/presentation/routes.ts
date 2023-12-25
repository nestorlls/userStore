import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { UploadRoutes } from './upload/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRoutes = Router();

    apiRoutes.use('/auth', AuthRoutes.routes);
    apiRoutes.use('/categories', CategoryRoutes.routes);
    apiRoutes.use('/products', ProductRoutes.routes);
    apiRoutes.use('/upload', UploadRoutes.routes);

    router.use('/api/v1', apiRoutes);

    return router;
  }
}
