import {
  CategoryDataSource,
  CategoryEntity,
  CategoryRepository,
  CreateCategoryDto,
  PaginationDto,
  PaginationReturnDto,
  UpdateCategoryDto,
  UserEntity,
} from '../../domain';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDataSource: CategoryDataSource) {}

  async getAll(paginationDto: PaginationDto): Promise<PaginationReturnDto> {
    return await this.categoryDataSource.getAll(paginationDto);
  }

  async getbyId(id: string): Promise<CategoryEntity> {
    return await this.categoryDataSource.getbyId(id);
  }

  async create(
    category: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity> {
    return await this.categoryDataSource.create(category, user);
  }

  async update(category: UpdateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryDataSource.update(category);
  }

  async delete(id: string): Promise<void> {
    return await this.categoryDataSource.delete(id);
  }
}
