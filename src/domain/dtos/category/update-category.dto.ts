import { Validators } from '../../../config';

interface IUpdateCategoryDto {
  id: string;
  user: string;
  name?: string;
  available?: boolean;
}

export class UpdateCategoryDto {
  public readonly id: string;
  public readonly user: string;
  public readonly name?: string;
  public readonly available?: boolean;
  private constructor(options: IUpdateCategoryDto) {
    const { id, user, name, available } = options;
    this.id = id;
    this.user = user;
    this.name = name;
    this.available = available;
  }

  get values() {
    const currentValues: { [key: string]: any } = {};
    if (this.name) currentValues.name = this.name;
    if (this.available) currentValues.available = this.available;
    if (this.user) currentValues.user = this.user;
    return currentValues;
  }

  static create(props: { [key: string]: any }): [string?, UpdateCategoryDto?] {
    const { id, name, available, user } = props;

    if (!id) return ['Missing id'];
    if (!user) return ['Missing user'];
    if (!Validators.isMongoId(user)) return ['Invalid user id'];

    return [undefined, new UpdateCategoryDto({ id, name, available, user })];
  }
}
