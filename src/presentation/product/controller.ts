import { Request, Response } from 'express';

import {
  CreateProductDto,
  CustomeError,
  PaginationDto,
  UpdateProductDto,
} from '../../domain';
import { ProductService } from '../services';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.productService
      .getAll(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res))
      .finally(() => console.log('finally'));
  };

  getbyId = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productService
      .getbyId(id)
      .then((product) => res.status(200).json(product))
      .catch((error) => this.handleError(error, res));
  };

  create = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.productService
      .create(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateDto] = UpdateProductDto.create({ ...req.body, id });
    if (error) throw CustomeError.badRequest(error);

    this.productService
      .update(updateDto!)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.productService
      .delete(id)
      .then(() => res.sendStatus(204))
      .catch((error) => this.handleError(error, res));
  };

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
