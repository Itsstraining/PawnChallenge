import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert('key-admin.json')
  });
 
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
  await app.listen(3000);
}
bootstrap();
