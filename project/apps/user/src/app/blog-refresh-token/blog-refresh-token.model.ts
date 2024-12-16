import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'refresh-tokens',
  timestamps: true,
})
export class BlogRefreshTokenModel extends Document {
  @Prop({required: true})
  public idUser: string;

  @Prop({required: true})
  public refreshToken: string;

  @Prop({required: true})
  public expiration: string;
}

export const BlogRefreshTokenSchema = SchemaFactory.createForClass(BlogRefreshTokenModel);
