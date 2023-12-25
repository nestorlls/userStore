import path from 'path';
import fs from 'fs';
import { Uuid, UploadFile } from '../../config';

export class UploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  async uploadSingle(files: UploadFile, folder: string = 'uploads') {
    try {
      const fileExtension = files.mimetype.split('/').at(1) ?? '';

      const destination = path
        .resolve(__dirname, '../../../', folder)
        .toString();
      this.checkFolder(destination);

      const filename = `${this.uuid()}.${fileExtension}`;

      files.mv(`${destination}/${filename}`);

      return { filename };
    } catch (error) {
      throw error;
    }
  }

  uploadMultiple(file: any, folder: string = 'uploads') {
    throw new Error('Method not implemented.');
  }

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
}
