import { Validators } from '../../../config';

export class CreateProductDto {
  public name: string;
  public description: string;
  public available: boolean;
  public price: number;
  public user: string;
  public category: string;

  constructor(options: CreateProductDto) {
    const {
      name,
      description,
      available = false,
      price,
      user,
      category,
    } = options;
    this.name = name;
    this.description = description;
    this.available = available;
    this.price = price;
    this.user = user;
    this.category = category;
  }

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, description, available, price, user, category } = props;

    if (!name) return ['Missing name.'];
    if (!description) return ['Missing description.'];
    if (!price) return ['Missing price.'];
    if (!user) return ['Missing user.'];
    if (!Validators.isMongoId(user)) return ['Invalid user id.'];
    if (!category) return ['Missing category.'];
    if (!Validators.isMongoId(category)) return ['Invalid category id.'];

    return [
      undefined,
      new CreateProductDto({
        name,
        description,
        available: !!available,
        price,
        user,
        category,
      }),
    ];
  }
}
