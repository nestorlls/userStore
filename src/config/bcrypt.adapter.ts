import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export class BcryptAdapter {
  private static genSalt(): string {
    return genSaltSync(10);
  }

  static hash(value: string): string {
    const salt = this.genSalt();
    return hashSync(value, salt);
  }

  static compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
