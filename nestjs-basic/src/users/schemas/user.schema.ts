import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  createAt: Date;

  @Prop()
  updateAtt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);