import { Injectable } from '@nestjs/common';
import {Model, mongo} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {TokenPayload} from '@project/typs';
import {BlogRefreshTokenModel} from './blog-refresh-token.model';
import {BlogRefreshToken} from './blog-refresh-token.entity';

@Injectable()
export class BlogRefreshTokenRepository {
  constructor(@InjectModel(BlogRefreshTokenModel.name) private readonly blogRefreshTokenModel: Model<BlogRefreshTokenModel>)
  {}

  public async create(data: TokenPayload): Promise<BlogRefreshTokenModel> {
    const dataToken = new BlogRefreshToken(data).getDataRefreshToken
    const tokenModel = new this.blogRefreshTokenModel(dataToken);

    return await tokenModel.save();
  }

  public async delete(idUser: string): Promise<mongo.DeleteResult> {
    return await this.blogRefreshTokenModel.deleteMany({idUser});
  }
}
