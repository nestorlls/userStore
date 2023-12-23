import {
  AuthDatasource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDatasource) {}

  async login(user: LoginUserDto): Promise<UserEntity> {
    return await this.authDataSource.login(user);
  }
  async register(user: RegisterUserDto): Promise<UserEntity> {
    return await this.authDataSource.register(user);
  }
}
