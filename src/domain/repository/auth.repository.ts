import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/useEntity';

export abstract class AuthRepository {
  abstract login(user: LoginUserDto): Promise<UserEntity>;
  abstract register(user: RegisterUserDto): Promise<UserEntity>;
}
