import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {UserRepositoryInterface} from '../user-actions/index';
import {BlogUserEntity, BlogUserModel} from './index';

@Injectable()
export class BlogUserRepository implements UserRepositoryInterface {
  constructor(@InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>)
  {}

  public async create(dataUser: BlogUserEntity): Promise<BlogUserModel> {
    const userModel = new this.blogUserModel(dataUser);

    return await userModel.save();
  }

  public async findByEmail(email: string): Promise<BlogUserModel | null> {
    return await this.blogUserModel.findOne({email});
  }

  public async findOrCreate(dataUser: BlogUserEntity): Promise<BlogUserModel> {
    const existedUser = await this.findByEmail(dataUser.getDataUser);

    if (existedUser) {
      throw new HttpException(
        `A user with this email: ${existedUser.email} is exists`,
        HttpStatus.BAD_REQUEST,
        {
          cause: {
            where: 'blog-user.respository.ts',
            line: '23'
          }
        }
      );
    }

    return await this.create(dataUser);
  }

  public async findByid(id: string): Promise<BlogUserModel | null> {
    const dataUser = await this.blogUserModel.findOne({_id: id});

    if(!dataUser) {
      throw new HttpException(
        `A user with this id: ${id} not found`,
        HttpStatus.OK
      );
    }

    return dataUser
  }

  public async findByIdAndUpdate(id: string, newPassword: string): Promise<BlogUserModel | null> {
    const dataUser = await this.blogUserModel.findByIdAndUpdate(id, {passwordHash: newPassword});

    if(!dataUser) {
      throw new HttpException(
        `A user with this id: ${id} not found`,
        HttpStatus.BAD_REQUEST,
        {
          cause: {
            where: 'blog-user.respository.ts',
            line: '42'
          }
        }
      );
    }

    return dataUser
  }
}
