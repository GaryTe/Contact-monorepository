import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {BlogRefreshTokenModel, BlogRefreshTokenSchema} from './blog-refresh-token.model';
import {BlogRefreshTokenRepository} from './blog-refresh-token.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogRefreshTokenModel.name, schema: BlogRefreshTokenSchema }
  ])],
  providers: [BlogRefreshTokenRepository],
  exports: [BlogRefreshTokenRepository]
})
export class BlogRefreshTokenModule {}
