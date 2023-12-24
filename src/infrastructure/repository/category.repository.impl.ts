import {
  CategoryDataSource,
  CategoryEntity,
  CategoryRepository,
  CreateCategoryDto,
  PaginationDto,
  PaginationReturnDto,
  UpdateCategoryDto,
} from '../../domain';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDataSource: CategoryDataSource) {}

  /* prettier-ignore */
  async getAll(paginationDto: PaginationDto): Promise<PaginationReturnDto<CategoryEntity>> {
    return await this.categoryDataSource.getAll(paginationDto);
  }

  async getbyId(id: string): Promise<CategoryEntity> {
    return await this.categoryDataSource.getbyId(id);
  }

  async create(categoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryDataSource.create(categoryDto);
  }

  async update(categoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryDataSource.update(categoryDto);
  }

  async delete(id: string): Promise<void> {
    return await this.categoryDataSource.delete(id);
  }
}
