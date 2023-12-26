import path from 'path';
import fs from 'fs';
import { Uuid, UploadFile } from '../../config';

export class UploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  async uploadSingle(file: UploadFile, folder: string = 'uploads') {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';
      const destination = path
        .resolve(__dirname, '../../../', folder)
        .toString();
      this.checkFolder(destination);
      const filename = `${this.uuid()}.${fileExtension}`;

      file.mv(`${destination}/${filename}`);

      return { filename };
    } catch (error) {
      throw error;
    }
  }

  async uploadMultiple(files: UploadFile[], folder: string = 'uploads') {
    return await Promise.all(
      files.map((file) => this.uploadSingle(file, folder))
    );
  }

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
}
