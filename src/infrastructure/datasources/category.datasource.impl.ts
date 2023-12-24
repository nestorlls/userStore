import { Category } from '../../data';
import {
  CategoryDataSource,
  CustomeError,
  PaginationDto,
  PaginationReturnDto,
  UpdateCategoryDto,
  CategoryEntity,
  CreateCategoryDto,
} from '../../domain';

export class CategoryDatasourceImpl implements CategoryDataSource {
  constructor(private readonly model: typeof Category) {}

  /* prettier-ignore */
  async getAll(dto: PaginationDto): Promise<PaginationReturnDto<CategoryEntity>> {
    const { page, limit } = dto;

    const [total, categories] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit).populate('user', 'id name email'),
    ]);

    const [error, pagination] = PaginationReturnDto.create({
      page,
      limit,
      total,
      next:
        page * limit < total
          ? `/api/v1/categories?page=${page + 1}&limit=${limit}`
          : null,
      prev:
        page - 1 > 0
          ? `/api/v1/categories?page=${page - 1}&limit=${limit}`
          : null,
      data: categories.map(CategoryEntity.fromObject),
    });

    if (error) {
      throw CustomeError.internalServerError(error);
    }

    return pagination!;
  }

  async getbyId(id: string): Promise<CategoryEntity> {
    const category = await this.model.findOne({ _id: id });
    if (!category) {
      throw CustomeError.notFound('Category not found');
    }

    return CategoryEntity.fromObject(category!);
  }

  async create(categoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { name } = categoryDto;
    const categoryExists = await this.model.findOne({ name });
    if (categoryExists) {
      throw CustomeError.badRequest('Category already exists');
    }
    const newCategory = await this.model.create(categoryDto);
    return CategoryEntity.fromObject(newCategory);
  }

  async update(categoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const { id, ...category } = categoryDto;
    const updatedCategory = await this.model.findOneAndUpdate(
      { _id: id },
      { ...category }
    );

    if (!updatedCategory) {
      throw CustomeError.notFound('Category not found');
    }
    return CategoryEntity.fromObject(updatedCategory!);
  }

  async delete(id: string): Promise<void> {
    const category = await this.model.findOne({ _id: id });
    if (!category) {
      throw CustomeError.notFound('Category not found');
    }
    await this.model.deleteOne({ _id: id });
  }
}
