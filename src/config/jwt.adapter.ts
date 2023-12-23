import { sign, verify } from 'jsonwebtoken';
import { envs } from './envs';

const jwt_secret = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = '2h') {
    return new Promise((resolve) => {
      sign(payload, jwt_secret, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      verify(token, jwt_secret, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
