import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().default(3000).asPortNumber(),
  MONGO_DB_URL: get('MONGO_DB_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  EMAIL_SERVICE: get('EMAIL_SERVICE').required().asString(),
  EMAIL_USER: get('EMAIL_USER').required().asString(),
  EMAIL_PASSWORD_KEY: get('EMAIL_PASSWORD_KEY').required().asString(),
  WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
};
