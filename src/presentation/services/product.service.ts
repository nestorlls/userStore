import {
  CreateProductDto,
  CustomeError,
  PaginationDto,
  ProductRepository,
  UpdateProductDto,
} from '../../domain';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(paginationDto: PaginationDto) {
    try {
      return await this.productRepository.getAll(paginationDto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async getbyId(id: string) {
    try {
      return await this.productRepository.getbyId(id);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async update(updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(updateProductDto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async delete(id: string) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
}
