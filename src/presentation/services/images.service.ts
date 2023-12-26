import path from 'path';
import fs from 'fs';
import { CustomeError } from '../../domain';

export class ImagesServices {
  constructor() {}
  async getAllImages(type: string) {
    const pathFile = path.resolve(__dirname, `../../../uploads/${type}`);
    if (!fs.existsSync(pathFile)) {
      return [];
    }

    return fs.readdirSync(pathFile);
  }

  async getImage(type: string, filename: string) {
    const pathFile = path.resolve(
      __dirname,
      `../../../uploads/${type}/${filename}`
    );

    if (!fs.existsSync(pathFile)) {
      throw CustomeError.badRequest('Image not found');
    }

    return pathFile;
  }
}
