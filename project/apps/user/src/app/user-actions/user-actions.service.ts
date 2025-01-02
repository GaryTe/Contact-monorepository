import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RabbitRPC, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage } from 'amqplib';

import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {CreateUserDto, UserServiceInterface} from './index';
import {DataQueryUser, AccessAndRefreshToken, Publication} from '@project/typs';
import {BlogUserModel, BlogUserEntity} from '../blog-user/index';
import {BlogRefreshTokenRepository} from '../blog-refresh-token/blog-refresh-token.repository';
import {AuthenticationUser} from './authentication-user';
import {UserConfig} from '@project/config-user';
import {STATIC_FILES_ROUTE, STATIC_IMAGES} from '@project/consts';
import {RabbitRouting, Exchange, Queue} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class UserActionsService implements UserServiceInterface {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly  blogRefreshTokenRepository: BlogRefreshTokenRepository,
    private readonly authenticationUser: AuthenticationUser,
    private readonly userConfig: UserConfig,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
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

  public async show(
    id: string,
    amqpMsg?: ConsumeMessage
  ): Promise<{
    dataUser: BlogUserModel,
    dataPublicationsList: Publication[] | []
  }> {
    const dataUser = await this.blogUserRepository.findByid(id, amqpMsg)

    const dataPublicationsList = await this.amqpConnection
    .request<Publication[] | []>({
      exchange: this.config.get('EXCHANG_USER'),
      routingKey: RabbitRouting.AddUser,
      payload: dataUser.id
    })

    return {
      dataUser,
      dataPublicationsList
    }
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

  @RabbitRPC({
    exchange: Exchange.ReadmePublication,
    routingKey: RabbitRouting.AddUser,
    queue: Queue.ReadmePublication
  })
  public async authorsList(idList: string[], amqpMsg?: ConsumeMessage): Promise<{
    id: string,
    name: string,
    email: string,
    avatar: string
  }[] | null> {
    const dataAuthorsList = []

    if(idList.length > 0) {
      for await (const id of idList) {
      const dataUser = await this.blogUserRepository.findByid(id, amqpMsg);

      if (dataUser) {
        dataAuthorsList.push({
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
        avatar: dataUser.avatar
      })
      }
    }}

    if(dataAuthorsList.length === 0) {
      return null
    }

    return dataAuthorsList
    }
}
