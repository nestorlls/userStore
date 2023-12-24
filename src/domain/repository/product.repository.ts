import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { PaginationReturnDto } from '../dtos/shared/pagination-return.dto';
import { PaginationDto } from '../dtos/shared/pagination.dto';
import { ProductEntity } from '../entities/ProductEntity';

export abstract class ProductRepository {
  /* prettier-ignore */
  abstract getAll(dto: PaginationDto): Promise<PaginationReturnDto<ProductEntity>>;
  abstract getbyId(id: string): Promise<ProductEntity>;
  abstract create(dto: CreateProductDto): Promise<ProductEntity>;
  abstract update(dto: UpdateProductDto): Promise<ProductEntity>;
  abstract delete(id: string): Promise<ProductEntity>;
}
