import {
  CategoryRepository,
  CreateCategoryDto,
  CustomeError,
  PaginationDto,
  UpdateCategoryDto,
  UserEntity,
} from '../../domain';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(paginationDto: PaginationDto) {
    try {
      return await this.categoryRepository.getAll(paginationDto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async getbyId(id: string) {
    try {
      return await this.categoryRepository.getbyId(id);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async create(dto: CreateCategoryDto, user: UserEntity) {
    try {
      return await this.categoryRepository.create(dto, user);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async update(dto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(dto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  async delete(id: string) {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }
}
