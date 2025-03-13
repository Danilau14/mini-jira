import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
  uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`,
}));

