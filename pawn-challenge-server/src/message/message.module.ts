import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageDocument, MessageSchema } from './schemas/mess.schema'
import { MessageController } from './controller/message/message.controller'
import { MessageService } from './service/message/message.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Message', schema: MessageSchema },
        ])
    ],
    providers: [MessageService],
    controllers: [MessageController]

})
export class MessageModule { }
