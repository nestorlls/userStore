import { Request, Response } from 'express';
import { UploadService } from '../services/upload.service';
import { UploadFile } from '../../config';

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  uploadFile = (req: Request, res: Response) => {
    const file = req.body.files.at(0) as UploadFile;
    const folderType = req.params.type;

    this.uploadService
      .uploadSingle(file, `uploads/${folderType}`)
      .then((upload) => res.status(200).json(upload))
      .catch((error) => this.handleError(error, res))
      .finally(() => console.log('Finally'));
  };

  uploadMultipleFiles = (req: Request, res: Response) => {
    const files = req.body.files;
    const folderType = req.params.type;

    this.uploadService
      .uploadMultiple(files, `uploads/${folderType}`)
      .then((files) => res.status(200).json(files))
      .catch((error) => this.handleError(error, res))
      .finally(() => console.log('Finally'));
  };

  private handleError(error: unknown, res: Response) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
