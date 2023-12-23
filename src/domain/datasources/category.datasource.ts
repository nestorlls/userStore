import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { PaginationReturnDto } from '../dtos/category/pagination-return.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { CategoryEntity } from '../entities/categoryEntity';
import { UserEntity } from '../entities/useEntity';

export abstract class CategoryDataSource {
  abstract getAll(dto: PaginationDto): Promise<PaginationReturnDto>;
  abstract getbyId(id: string): Promise<CategoryEntity>;
  abstract create(
    category: CreateCategoryDto,
    user: UserEntity
  ): Promise<CategoryEntity>;
  abstract update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract delete(id: string): Promise<void>;
}
