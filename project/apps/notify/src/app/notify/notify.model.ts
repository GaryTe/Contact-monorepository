import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class NotifyModel extends Document {
  @Prop({required: true})
  public email: string;

  @Prop({required: true})
  public name: string;

  @Prop({})
  public avatar: string;

  @Prop({required: true})
  public passwordHash: string;
}

export const NotifySchema = SchemaFactory.createForClass(NotifyModel);