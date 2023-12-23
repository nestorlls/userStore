import { Router } from 'express';

import { CategoryController } from './controller';
import {
  CategoryDatasourceImpl,
  CategoryRepositoryImpl,
} from '../../infrastructure';
import { Category } from '../../data';
import { CategoryService } from '../services';
import { AuthMiddleware } from '../middlewares';

export class CategoryRoutes {
  constructor() {}
  static get routes(): Router {
    const router = Router();

    const datasource = new CategoryDatasourceImpl(Category);
    const repository = new CategoryRepositoryImpl(datasource);
    const service = new CategoryService(repository);
    const controller = new CategoryController(service);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getbyId);
    router.post('/', [AuthMiddleware.authenticate], controller.create);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
