import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import * as env from 'environment'
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.environment.connectionString),
    MessageModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
