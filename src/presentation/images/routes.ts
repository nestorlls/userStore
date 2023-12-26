import { Router } from 'express';
import { ImagesController } from './constroller';
import { ImagesServices } from '../services/images.service';
import { UploadMiddleware } from '../middlewares';

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ImagesServices();
    const constrolle = new ImagesController(service);

    router.use(UploadMiddleware.containTypes);

    router.get('/:type', constrolle.getAllImages);
    router.get('/:type/:img', constrolle.getImage);

    return router;
  }
}
