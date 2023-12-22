import { regularExps } from '../../../config';

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(obj: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = obj;

    if (!email) return ['email is required'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['password is required'];
    if (password.length < 6) return ['Password must be at least 6 characters'];

    return [undefined, new LoginUserDto(email, password)];
  }
}
