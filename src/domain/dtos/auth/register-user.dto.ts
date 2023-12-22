import { regularExps } from '../../../config';

export class RegisterUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = obj;

    if (!name) return ['name is required'];
    if (!email) return ['email is required'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['password is required'];
    if (password.length < 6) return ['Password must be at least 6 characters'];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
