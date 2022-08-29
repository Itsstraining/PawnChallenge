import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './message/controller/user/user.controller';
import { MessageModule } from './message/message.module';
import { UserService } from './message/service/user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.ey0prhj.mongodb.net/?retryWrites=true&w=majority"),
    MessageModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
