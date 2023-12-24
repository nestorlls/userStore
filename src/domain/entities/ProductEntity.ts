import { CustomeError } from '../errors/custome.error';

interface IProduct {
  id: string;
  name: string;
  description: string;
  available: boolean;
  price: number;
  category: string;
  user: string;
}

export class ProductEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly available: boolean;
  private readonly price: number;
  private readonly category: string;
  private readonly user: string;

  private constructor(options: IProduct) {
    const { id, name, description, available, price, category, user } = options;
    this.id = id;
    this.name = name;
    this.description = description;
    this.available = available;
    this.price = price;
    this.category = category;
    this.user = user;
  }

  static fromObject(obj: { [key: string]: any }): ProductEntity {
    const { id, name, description, available, price, category, user } = obj;

    if (!id) throw CustomeError.badRequest('Missing id');
    if (!name) throw CustomeError.badRequest('Missing name');
    if (!description) throw CustomeError.badRequest('Missing description');
    if (!price) throw CustomeError.badRequest('Missing price');
    if (!category) throw CustomeError.badRequest('Missing category');
    if (!user) throw CustomeError.badRequest('Missing user');

    return new ProductEntity({
      id,
      name,
      description,
      available,
      price,
      category,
      user,
    });
  }
}
