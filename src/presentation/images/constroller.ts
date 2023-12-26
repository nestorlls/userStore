import { Request, Response } from 'express';
import { ImagesServices } from '../services/images.service';
import { CustomeError } from '../../domain';

export class ImagesController {
  constructor(private readonly service: ImagesServices) {}

  getAllImages = (req: Request, res: Response) => {
    const { type } = req.params;

    return this.service
      .getAllImages(type)
      .then((images) => res.status(200).json(images))
      .catch((error) => this.handleError(error, res));
  };

  getImage = (req: Request, res: Response) => {
    const { type, img } = req.params;

    return this.service
      .getImage(type, img)
      .then((image) => res.status(200).sendFile(image))
      .catch((error) => this.handleError(error, res));
  };

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };
}
