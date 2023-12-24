import { isValidObjectId } from 'mongoose';

export class Validators {
  static isMongoId(id: string): boolean {
    return isValidObjectId(id);
  }
}
