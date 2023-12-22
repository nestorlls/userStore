import nodemailer, { Transporter } from 'nodemailer';
import { JwtAdapter } from '../../config';
import { CustomeError } from '../../domain';
import { User } from '../../data';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerUser: string,
    mailerPasswordKey: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerUser,
        pass: mailerPasswordKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, html, attachements = [] } = options;

    try {
      if (!this.postToProvider) return true;

      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html,
        attachments: attachements,
      });

      // console.log( sentInformation );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async validateEmail(token: string): Promise<boolean> {
    const payload = await JwtAdapter.verifyToken(token);
    if (!payload) throw CustomeError.unAuthorized('Invalid token');

    console.log(payload);

    const { email } = payload as { email: string };
    if (!email)
      throw CustomeError.internalServerError('Error validating email');

    const user = await User.findOne({ email });
    if (!user) throw CustomeError.internalServerError('User not found');
    user.emailValidated = true;
    await user.save();

    return true;
  }
}
