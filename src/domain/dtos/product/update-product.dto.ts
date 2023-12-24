export interface IUpdateProductDto {
  id: string;
  name?: string;
  description?: string;
  available?: boolean;
  price?: number;
  stock?: number;
}

export class UpdateProductDto {
  public id: string;
  public name?: string;
  public description?: string;
  public available?: boolean;
  public price?: number;
  public stock?: number;
  public category?: string;
  public user?: string;

  private constructor(options: IUpdateProductDto) {
    const { id, name, description, available, price, stock } = options;

    this.id = id;
    this.name = name;
    this.description = description;
    this.available = available;
    this.price = price;
    this.stock = stock;
  }

  get values() {
    const currentValues: { [key: string]: any } = {};
    if (this.name) currentValues.name = this.name;
    if (this.description) currentValues.description = this.description;
    if (this.available) currentValues.available = this.available;
    if (this.price) currentValues.price = this.price;
    if (this.stock) currentValues.stock = this.stock;

    return currentValues;
  }

  static create(obj: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { id, name, description, available, price, stock } = obj;

    if (!id) return ['Missing id'];

    return [
      undefined,
      new UpdateProductDto({
        id,
        name,
        description,
        available,
        price,
        stock,
      }),
    ];
  }
}
