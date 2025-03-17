import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => ({
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
}));
