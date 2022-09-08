import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
<<<<<<< HEAD
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
=======
const cors = require("cors");
// import { NestExpressApplication } from '@nestjs/platform-express';


>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8
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
<<<<<<< HEAD
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.enableCors();
  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };

  app.enableCors(options);
//app.use(cors(options))
=======
>>>>>>> 5f7b702d256cfa424ae7b4af7319f731483db0b8
  await app.listen(3000);
}
bootstrap();
