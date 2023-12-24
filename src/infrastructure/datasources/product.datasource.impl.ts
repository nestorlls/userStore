import { Product } from '../../data';
import {
  CreateProductDto,
  CustomeError,
  PaginationDto,
  PaginationReturnDto,
  ProductDatasource,
  ProductEntity,
  UpdateProductDto,
} from '../../domain';

export class ProductDataSourceImpl implements ProductDatasource {
  constructor(private readonly model: typeof Product) {}

  /* prettier-ignore */
  async getAll(paginationDto: PaginationDto): Promise<PaginationReturnDto<ProductEntity>> {
    const { page, limit } = paginationDto;
    const [total, products] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit).populate('user')
        .populate('category'),
    ]);
    
    if (!products) {
      throw CustomeError.notFound('Products not found');
    }

    const [error, productWithPagination] = PaginationReturnDto.create({
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
      data: products.map(ProductEntity.fromObject),
    });

    if (error) {
      throw CustomeError.internalServerError(error);
    }

    return productWithPagination!;
  }

  async getbyId(id: string): Promise<ProductEntity> {
    const product = await this.model.findOne({ _id: id });
    if (!product) {
      throw CustomeError.notFound('Product not found');
    }

    return ProductEntity.fromObject(product!);
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const productExists = await this.model.findOne({ name: dto.name });
    if (productExists) {
      throw CustomeError.badRequest('Product already exists');
    }

    const newProduct = await this.model.create({ ...dto });

    if (!newProduct) {
      throw CustomeError.badRequest('Product not created');
    }

    console.log('newProduct-->', newProduct);
    return ProductEntity.fromObject(newProduct);
  }

  async update(dto: UpdateProductDto): Promise<ProductEntity> {
    const { id, ...rest } = dto;
    const updatedProduct = await this.model.findOneAndUpdate(
      { _id: id },
      { ...rest }
    );

    if (!updatedProduct) {
      throw CustomeError.notFound('Product not found');
    }

    return ProductEntity.fromObject(updatedProduct!);
  }

  async delete(id: string): Promise<ProductEntity> {
    const deletedProduct = this.model.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      throw CustomeError.notFound('Product not found');
    }

    return ProductEntity.fromObject(deletedProduct!);
  }
}
