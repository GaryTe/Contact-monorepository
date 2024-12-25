import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {CreateUserDto, UserServiceInterface} from './index';
import {DataQueryUser, AccessAndRefreshToken} from '@project/typs';
import {BlogUserModel, BlogUserEntity} from '../blog-user/index';
import {BlogRefreshTokenRepository} from '../blog-refresh-token/blog-refresh-token.repository';
import {AuthenticationUser} from './authentication-user';
import {UserConfig} from '@project/config-user';
import {STATIC_FILES_ROUTE, STATIC_IMAGES} from '@project/consts';

@Injectable()
export class UserActionsService implements UserServiceInterface {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly  blogRefreshTokenRepository: BlogRefreshTokenRepository,
    private readonly authenticationUser: AuthenticationUser,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: CreateUserDto): Promise<BlogUserModel> {
    dto.avatar = dto.avatar ?? `${STATIC_FILES_ROUTE}${STATIC_IMAGES}`;
    const dataUser = new BlogUserEntity(dto)

    return await this.blogUserRepository.findOrCreate(dataUser);
  }

  public async authentication(dataUser: BlogUserModel, dataTokens: AccessAndRefreshToken): Promise<void> {
    await this.blogRefreshTokenRepository.delete(dataUser.id);
    await this.blogRefreshTokenRepository.create(
      {
        id: dataUser.id,
        refreshToken: dataTokens.refreshToken,
        expiration: this.userConfig.get('JWT_REFRESH_EXPIRED'),
        email: '',
        name: ''
      }
    )
  }

  public async change(
    query: DataQueryUser,
    idUser: string
  ): Promise<void> {
    const dataUser = await this.blogUserRepository.findByid(idUser);

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

    await this.blogUserRepository.findByIdAndUpdate(idUser, passwordHash)
    throw new HttpException(
      'Password changed',
       HttpStatus.OK,
     );
  }

  public async show(id: string): Promise<BlogUserModel> {
    return await this.blogUserRepository.findByid(id);
  }

  public async createTokens(datasList: string[]): Promise<AccessAndRefreshToken> {
    const [id,  email, name] = datasList;

    await this.blogRefreshTokenRepository.delete(id);
    const parAccessTokenAndRefreshToken = await this.authenticationUser.authenticate({id, email, name});
    await this.blogRefreshTokenRepository.create(
      {
        id,
        refreshToken: parAccessTokenAndRefreshToken.refreshToken,
        expiration: this.userConfig.get('JWT_REFRESH_EXPIRED'),
        email: '',
        name: ''
      }
    )

    return parAccessTokenAndRefreshToken
  }
}
