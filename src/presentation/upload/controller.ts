import { Request, Response } from 'express';
import { UploadService } from '../services/upload.service';
import { UploadFile } from '../../config';

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  uploadFile = (req: Request, res: Response) => {
    const files = req.body.files.at(0) as UploadFile;
    const type = req.params.type;

    this.uploadService
      .uploadSingle(files, `uploads/${type}`)
      .then((upload) => res.status(200).json(upload))
      .catch((error) => this.handleError(error, res))
      .finally(() => console.log('Finally'));
  };

  uploadMultipleFiles = (req: Request, res: Response) => {
    res.status(200).json('Files uploaded successfully');
  };

  private handleError(error: unknown, res: Response) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
