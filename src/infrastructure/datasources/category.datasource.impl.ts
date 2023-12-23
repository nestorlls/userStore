import { Category } from '../../data';
import {
  CategoryDataSource,
  CustomeError,
  PaginationDto,
  UserEntity,
  PaginationReturnDto,
  UpdateCategoryDto,
  CategoryEntity,
} from '../../domain';

export class CategoryDatasourceImpl implements CategoryDataSource {
  constructor(private readonly model: typeof Category) {}

  async getAll(dto: PaginationDto): Promise<PaginationReturnDto> {
    const { page, limit } = dto;

    const [total, categories] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit),
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
      categories: categories.map(CategoryEntity.fromObject),
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

  async create(
    category: CategoryEntity,
    user: UserEntity
  ): Promise<CategoryEntity> {
    const categoryExists = await this.model.findOne({ name: category.name });
    if (categoryExists) {
      throw CustomeError.badRequest('Category already exists');
    }
    const newCategory = await this.model.create({ ...category, user: user.id });
    return CategoryEntity.fromObject(newCategory);
  }

  async update(category: UpdateCategoryDto): Promise<CategoryEntity> {
    const { id, ...rest } = category;
    const updatedCategory = await this.model.findOneAndUpdate(
      { _id: id },
      { ...rest }
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
