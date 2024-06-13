import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
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
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);