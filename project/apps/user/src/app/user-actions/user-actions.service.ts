import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {CreateUserDto, AuthorizationUserDto, UserServiceInterface} from './index';
import {DataQueryUser, DataParamUser} from '@project/typs';
import {BlogUserModel, BlogUserEntity} from '../blog-user/index';

@Injectable()
export class UserActionsService implements UserServiceInterface {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async create(dto: CreateUserDto): Promise<BlogUserModel> {
    const dataUser = new BlogUserEntity(dto)

    return await this.blogUserRepository.findOrCreate(dataUser);
  }

  public async authentication(dto: AuthorizationUserDto): Promise<{token: string}> {
    const dataUser = await this.blogUserRepository.findByEmail(dto.email);

    if(!dataUser) {
      throw new HttpException(
       `A user with this email: ${dto.email} not found`,
        HttpStatus.UNAUTHORIZED,
        {
          cause: {
            where: 'blog-actions.service.ts',
            line: '21'
          }
        }
      );
    }

    const blogUserEntity = new BlogUserEntity(dataUser)
    if(!(blogUserEntity.comparePassword(dto.password))) {
      throw new HttpException(
       'Incorrect user password',
        HttpStatus.UNAUTHORIZED,
        {
          cause: {
            where: 'blog-actions.service.ts',
            line: '34'
          }
        }
      );
    }

    return {token: '1234'}
  }

  public async change(
    query: DataQueryUser,
    param: DataParamUser
  ): Promise<void> {
    const dataUser = await this.blogUserRepository.findByid(param.idUser);

    const blogUserEntity = new BlogUserEntity(dataUser)
    if(!(blogUserEntity.comparePassword(query.oldPassword))) {
      throw new HttpException(
       'Incorrect user password',
        HttpStatus.UNAUTHORIZED,
        {
          cause: {
            where: 'blog-actions.service.ts',
            line: '23'
          }
        }
      );
    }

    const passwordHash = blogUserEntity.setPassword(query.newPassword);

    await this.blogUserRepository.findByIdAndUpdate(param.idUser, passwordHash)
    throw new HttpException(
      'Password changed',
       HttpStatus.OK,
     );
  }

  public async show(id: string): Promise<BlogUserModel> {
    return await this.blogUserRepository.findByid(id);
  }
}
