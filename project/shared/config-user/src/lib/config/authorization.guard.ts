import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Request} from 'express';

import {UserConfig} from './config-user';
import {ParseRefreshToken} from '../../index';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private authorization;

  constructor(
    private readonly userConfig: UserConfig
  ){
    this.authorization = new ParseRefreshToken(this.userConfig.get('JWT_REFRESH_SECRET'))
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    return this.authorization.execute(context.switchToHttp().getRequest<Request>());
  }
}
