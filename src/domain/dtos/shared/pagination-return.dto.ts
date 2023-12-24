type Pages = string | null;

export interface IPaginationReturnOptions<T> {
  page: number;
  limit: number;
  total: number;
  next: Pages;
  prev: Pages;
  data: T[];
}

export class PaginationReturnDto<T> {
  public readonly page: number;
  public readonly limit: number;
  public readonly total: number;
  public readonly next: Pages;
  public readonly prev: Pages;
  public readonly data: T[];

  private constructor(options: IPaginationReturnOptions<T>) {
    const { page, limit, total, next, prev, data = [] } = options;
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.next = next;
    this.prev = prev;
    this.data = data;
  }

  /* prettier-ignore */
  static create<T>(dto: PaginationReturnDto<T>): [string?, PaginationReturnDto<T>?] {
    const { page = 1, limit = 10, total, next, prev, data } = dto;

    if (page < 1 || limit < 1) {
      return ['Page and limit must be greater than 0'];
    }

    return [
      undefined,
      new PaginationReturnDto<T>({ page, limit, total, next, prev, data }),
    ];
  }
}
