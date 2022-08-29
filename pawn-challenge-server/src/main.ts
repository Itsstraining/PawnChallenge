import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
import * as env from 'environment'

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(env.environment.connectionString)
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
