import { User } from '../../data';
import {
  AuthDatasource,
  CustomeError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private readonly model: typeof User) {}

  async login(user: LoginUserDto): Promise<UserEntity> {
    const userExists = await this.model.findOne({ email: user.email });
    if (!userExists) throw new Error('User not found');

    const userEntity = UserEntity.fromObject(userExists);

    return {
      ...userEntity,
    };
  }

  async register(user: RegisterUserDto): Promise<UserEntity> {
    const userExists = await this.model.findOne({ email: user.email });
    if (userExists) throw CustomeError.badRequest('User already exists');

    const newUser = new this.model(user);
    const savedUser = await newUser.save();
    return UserEntity.fromObject(savedUser);
  }
}
