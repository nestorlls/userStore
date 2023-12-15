import express, { Router } from 'express';

export interface IServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: IServerOptions) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  public async start() {
    this.app.use(express.json()).use(express.urlencoded({ extended: true }));

    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  public stop() {
    if (this.serverListener) {
      this.serverListener.close();
    }
  }
}
