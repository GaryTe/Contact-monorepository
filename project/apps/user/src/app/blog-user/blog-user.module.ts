import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {
  BlogUserRepository,
  BlogUserModel,
  BlogUserSchema
} from './index';


@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema }
  ])],
  providers: [BlogUserRepository],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
