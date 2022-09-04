import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class User{
    @Prop()
    id: string;

    @Prop()
    createAt: string;

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

}

export type UserDocument = User & Document

export const MessageSchema = SchemaFactory.createForClass(User);