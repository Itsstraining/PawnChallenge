import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
const cors = require("cors");
// import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  // admin.initializeApp({
  //   credential: admin.credential.cert('key-admin.json')
  // });
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors());
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
  });
  await app.listen(3000);
}
bootstrap();
