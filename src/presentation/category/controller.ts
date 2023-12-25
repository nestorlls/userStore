import { Request, Response } from 'express';
import {
  CreateCategoryDto,
  CustomeError,
  PaginationDto,
  UpdateCategoryDto,
} from '../../domain';
import { CategoryService } from '../services';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .getAll(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };

  getbyId = (req: Request, res: Response) => {
    const { id } = req.params;

    this.categoryService
      .getbyId(id)
      .then((category) => res.status(200).json(category))
      .catch((error) => this.handleError(error, res));
  };

  create = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.categoryService
      .create(createCategoryDto!)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateDto] = UpdateCategoryDto.create({ ...req.body, id });
    if (error) throw CustomeError.badRequest(error);

    this.categoryService
      .update(updateDto!)
      .then((category) => res.json(category))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.categoryService
      .delete(id)
      .then(() => res.sendStatus(204))
      .catch((error) => this.handleError(error, res));
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };
}
