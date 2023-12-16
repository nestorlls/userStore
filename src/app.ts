import { envs } from './config';
import { MongoConnection } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  const mongoConneted = await MongoConnection.connection({
    mongoUrl: envs.MONGO_DB_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  if (mongoConneted) {
    console.log('MongoDB connected');
    server.start();
  }
}
