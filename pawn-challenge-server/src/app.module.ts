import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:admin@atlascluster.2qhstta.mongodb.net/test"),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
