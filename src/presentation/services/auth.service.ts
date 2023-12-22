import { BcryptAdapter, JwtAdapter } from '../../config';
import { User } from '../../data';
import {
  CustomeError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
  //DI
  constructor(
    private readonly emailService: EmailService,
    private readonly webServiceUrl: string
  ) {}

  public async login(loginDto: LoginUserDto) {
    const { email } = loginDto;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      throw CustomeError.badRequest('User not found');
    }

    const isMatch = BcryptAdapter.compare(
      loginDto.password,
      userExists.password!
    );

    if (!isMatch) throw CustomeError.badRequest('Password is incorrect');

    const { password, ...user } = UserEntity.fromObject(userExists);
    const token = await JwtAdapter.generateToken({ id: userExists.id, email });

    if (!token)
      throw CustomeError.internalServerError('Error generating token');

    return {
      user,
      token,
    };
  }

  public async register(registerDto: RegisterUserDto) {
    const { email } = registerDto;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw CustomeError.badRequest('User already exists');
    }

    try {
      await this.sendEmailValidationLink(email);

      const user = new User(registerDto);
      user.password = BcryptAdapter.hash(registerDto.password);
      await user.save();

      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id, email });

      if (!token) {
        throw CustomeError.internalServerError('Error generating token');
      }

      return {
        user: rest,
        token: token,
      };
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
  }

  public async validateEmail(token: string): Promise<boolean> {
    return await this.emailService.validateEmail(token);
  }

  private async sendEmailValidationLink(email: string): Promise<boolean> {
    const token = await JwtAdapter.generateToken({ email });
    if (!token)
      throw CustomeError.internalServerError('Error generating token');

    const link = `${this.webServiceUrl}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the link below to validate your email</p>
      <a href="${link}">Validate Email</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomeError.internalServerError('Error sending email');

    return true;
  }
}
