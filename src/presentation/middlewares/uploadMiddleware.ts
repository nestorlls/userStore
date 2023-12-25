import { NextFunction, Request, Response } from 'express';
import { UploadFile } from '../../config';

export class UploadMiddleware {
  static constainFiles(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were selected' });
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    next();
  }

  static containTypes(req: Request, res: Response, next: NextFunction) {
    const { type } = req.params;
    console.log(req.params);

    const validTypes = ['users', 'products', 'categories'];

    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ error: `Invalid type ${type}, valid types: ${validTypes}` });
    }

    next();
  }

  static ValidateFileExtension(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const files = req.files!.file as UploadFile;
    const extension = files.mimetype.split('/').at(1) ?? '';
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(extension)) {
      return res.status(400).json({
        error: `Invalid extension ${extension}, valid extensions: ${validExtensions}`,
      });
    }

    next();
  }
}
