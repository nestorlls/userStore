import { Validators } from '../../config';

export class CategoryEntity {
  public id: string;
  public name: string;
  public available: boolean;
  public user: string;

  private constructor(category: CategoryEntity) {
    const { id, name, available, user } = category;
    this.id = id;
    this.name = name;
    this.available = available;
    this.user = user;
  }

  static fromObject(obj: { [key: string]: any }): CategoryEntity {
    const { id, name, available, user } = obj;

    if (!id) throw new Error('Missing id');
    if (!name) throw new Error('Missing name');
    if (available && typeof available !== 'boolean')
      throw new Error('Missing available');
    if (!user) throw new Error('Missing user');
    if (!Validators.isMongoId(user)) throw new Error('Invalid user id');

    return new CategoryEntity({ id, name, available, user });
  }
}
