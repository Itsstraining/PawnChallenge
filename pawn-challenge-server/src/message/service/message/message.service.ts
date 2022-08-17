import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Message, MessageDocument, MessageSchema } from './../../schemas/mess.schema'
import { Message as MessageModel } from './../../models/message.model'

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messModel: Model<MessageDocument>){
    }

    async create(newMessage: MessageModel){
        newMessage.createAt = Date.now()
        let createMessage = new this.messModel(newMessage)
        await createMessage.save()
    }

    async findAll(){
        return await this.messModel.find()
    }

    async findById(fromUserId: string, toUserId:string){
        return await this.messModel.find({ $or: [{user: fromUserId, toUser: toUserId}, {user: toUserId, toUser: fromUserId}] }).exec();
    }
}
