import { Validators } from '../../../config';

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly user: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false, user } = props;
    let availableBoolean = available;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') availableBoolean = available === 'true';
    if (!user) return ['Missing user'];
    if (!Validators.isMongoId(user)) return ['Invalid user id'];

    return [undefined, new CreateCategoryDto(name, availableBoolean, user)];
  }
}
