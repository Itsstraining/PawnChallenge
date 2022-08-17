import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
    @Prop()
    age: number;

    @Prop()
    breed: string;

    @Prop([String])
    tags: string[];

    @Prop({ required: true })
    name: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);