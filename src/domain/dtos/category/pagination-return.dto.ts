import { CategoryEntity } from '../../entities/categoryEntity';

export class PaginationReturnDto {
  private constructor(
    public page: number,
    public limit: number,
    public total: number,
    public next: string | null,
    public prev: string | null,
    public categories: CategoryEntity[]
  ) {}

  static create(dto: PaginationReturnDto): [string?, PaginationReturnDto?] {
    const { page = 1, limit = 10, total, next, prev, categories } = dto;

    if (page < 1 || limit < 1) {
      return ['Page and limit must be greater than 0'];
    }

    return [
      undefined,
      new PaginationReturnDto(page, limit, total, next, prev, categories),
    ];
  }
}
