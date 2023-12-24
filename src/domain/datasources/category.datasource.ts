import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { PaginationReturnDto } from '../dtos/shared/pagination-return.dto';
import { UpdateCategoryDto } from '../dtos/category/update-category.dto';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { CategoryEntity } from '../entities/categoryEntity';
import { UserEntity } from '../entities/useEntity';

export abstract class CategoryDataSource {
  /* prettier-ignore */
  abstract getAll(dto: PaginationDto): Promise<PaginationReturnDto<CategoryEntity>>;
  abstract getbyId(id: string): Promise<CategoryEntity>;
  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract delete(id: string): Promise<void>;
}
