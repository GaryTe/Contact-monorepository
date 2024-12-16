import {Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { Authentication, AuthorizationUserDto } from './index';
import {UserConfig} from '@project/config-user';
import {BlogUserModel, BlogUserEntity} from '../blog-user/index';
import {BlogUserRepository} from '../blog-user/blog-user.repository';
import {AccessAndRefreshToken, TokenPayload} from '@project/typs';


@Injectable()
export class AuthenticationUser implements Authentication {
  private readonly logger = new Logger(AuthenticationUser.name);

  constructor(
    private readonly userConfig: UserConfig,
    private readonly blogUserRepository: BlogUserRepository,
  ) {}

  public async authenticate(user: BlogUserModel | TokenPayload): Promise<AccessAndRefreshToken> {
    const jwtAccessSecret = this.userConfig.get('JWT_ACCESS_SECRET');
    const secretKey = crypto.createSecretKey(jwtAccessSecret, 'utf-8');
    const accessTokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    const jwtRefreshSecret = this.userConfig.get('JWT_REFRESH_SECRET');
    const _secretKey = crypto.createSecretKey(jwtRefreshSecret, 'utf-8');

    this.logger.log(`Create accessToken for user with email: ${user.email}`);
    const _accessToken = await new SignJWT(accessTokenPayload)
      .setProtectedHeader({
        alg: this.userConfig.get('JWT_ALGORITHM'),
        typ: this.userConfig.get('TYP')
      })
      .setIssuedAt()
      .setExpirationTime(this.userConfig.get('JWT_ACCESS_EXPIRED'))
      .sign(secretKey);

    this.logger.log(`Create refreshToken for user with email: ${user.email}`);
    const _refreshToken = await new SignJWT(accessTokenPayload)
      .setProtectedHeader({
        alg: this.userConfig.get('JWT_ALGORITHM'),
        typ: this.userConfig.get('TYP')
      })
      .setIssuedAt()
      .setExpirationTime(this.userConfig.get('JWT_REFRESH_EXPIRED'))
      .sign(_secretKey);

    return {
      accessToken: _accessToken,
      refreshToken: _refreshToken
    };
  }

  public async verify(dto: AuthorizationUserDto): Promise<BlogUserModel | null> {
    const dataUser = await this.blogUserRepository.findByEmail(dto.email);

    if (!dataUser) {
      this.logger.warn(`User with email: ${dto.email} not found`);
      throw new HttpException(
        `User with email: ${dto.email} not found`,
         HttpStatus.NOT_FOUND,
         {
           cause: {
             where: 'authentication-user.ts',
             line: '65'
           }
         }
       );
    }

    const blogUserEntity = new BlogUserEntity(dataUser)
    if (!(blogUserEntity.comparePassword(dto.password))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
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

    return dataUser;
  }


}
