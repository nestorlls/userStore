import { CustomeError } from '../errors/custome.error';

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public emailValidated: boolean;
  public password: string;
  public role: string[];
  public avatar?: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailValidated = user.emailValidated;
    this.password = user.password;
    this.role = user.role;
    this.avatar = user.avatar;
  }

  static fromObject(obj: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, emailValidated, password, role, avatar } =
      obj;
    if (!id && !_id) throw CustomeError.badRequest('Missing id');
    if (!name) throw CustomeError.badRequest('Missing name');
    if (!email) throw CustomeError.badRequest('Missing email');
    if (!emailValidated === undefined)
      throw CustomeError.badRequest('Missing emailValidated');
    if (!password) throw CustomeError.badRequest('Missing password');
    if (!role) throw CustomeError.badRequest('Missing role');

    return new UserEntity({
      id: id || _id,
      name,
      email,
      emailValidated,
      password,
      role,
      avatar,
    });
  }
}
