import { Router } from 'express';

import { ProductController } from './controller';
import {
  ProductDataSourceImpl,
  ProductRepositoryImpl,
} from '../../infrastructure';
import { Product } from '../../data';
import { ProductService } from '../services';
import { AuthMiddleware } from '../middlewares';

export class ProductRoutes {
  constructor() {}
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductDataSourceImpl(Product);
    const repository = new ProductRepositoryImpl(datasource);
    const service = new ProductService(repository);
    const controller = new ProductController(service);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getbyId);
    router.post('/', [AuthMiddleware.authenticate], controller.create);
    router.patch('/id:', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
