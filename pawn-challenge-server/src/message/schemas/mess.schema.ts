import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Message{
    @Prop()
    content: string;

    @Prop()
    user: string;

    @Prop()
    toUser: string;

    @Prop()
    createAt: number;
}

export type MessageDocument = Message & Document

export const MessageSchema = SchemaFactory.createForClass(Message);