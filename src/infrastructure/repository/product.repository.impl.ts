import {
  CreateProductDto,
  PaginationDto,
  PaginationReturnDto,
  ProductDatasource,
  ProductEntity,
  ProductRepository,
  UpdateProductDto,
} from '../../domain';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDatasource) {}

  /* prettier-ignore */
  async getAll(paginationDto: PaginationDto): Promise<PaginationReturnDto<ProductEntity>> {
    return await this.productDatasource.getAll(paginationDto);
  }

  async getbyId(id: string): Promise<ProductEntity> {
    return await this.productDatasource.getbyId(id);
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return await this.productDatasource.create(dto);
  }

  async update(dto: UpdateProductDto): Promise<ProductEntity> {
    return await this.productDatasource.update(dto);
  }

  async delete(id: string): Promise<ProductEntity> {
    return await this.productDatasource.delete(id);
  }
}
