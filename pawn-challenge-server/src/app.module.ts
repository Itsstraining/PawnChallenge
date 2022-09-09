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
import * as env from 'environment'
import { UserModule } from './modules/user.module';
import { AuthService } from './services/auth/auth.service';
import { ChessGateway } from './socketIO/Chess/chess.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(env.environment.connectionString),
    UserModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    ChessGateway
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
      // { path: '/all', method: RequestMethod.GET },
      // { path: '/login', method: RequestMethod.POST },
      // { path: '/login/google', method: RequestMethod.POST },
      // { path: '/register', method: RequestMethod.POST },
      // { path: '/update', method: RequestMethod.PUT },
      // { path: '/', method: RequestMethod.GET },
      // { path: '', method: RequestMethod.ALL },
    );
  }
}
