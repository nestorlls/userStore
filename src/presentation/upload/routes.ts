import { Router } from 'express';
import { UploadController } from './controller';
import { UploadService } from '../services/upload.service';
import { UploadMiddleware } from '../middlewares';
import { filesUpload } from '../../config';

export class UploadRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new UploadService();
    const controller = new UploadController(service);

    router
      .use(filesUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))
      .use(UploadMiddleware.constainFiles)
      .use(UploadMiddleware.containTypes)
      .use(UploadMiddleware.ValidateFileExtension);

    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);

    return router;
  }
}
