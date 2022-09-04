import { AuthMiddleware } from './middlewares/auth.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import * as env from 'environment';
import { UserService } from './user/service/user/user.service';
import { UserModule } from './user/user.module';
import { AuthService } from './user/service/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(env.environment.connectionString),
    MessageModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/all', method: RequestMethod.GET },
        { path: '/login', method: RequestMethod.POST },
        { path: '/login/google', method: RequestMethod.POST },
        { path: '/register', method: RequestMethod.POST },
        { path: '/update', method: RequestMethod.PUT },
        { path: '/', method: RequestMethod.GET },
      );
  }
}
