import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Request} from 'express';

import {UserConfig} from './config-user';
import {ParseAccessToken} from '../../index';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private authenticate;

  constructor(
    private readonly userConfig: UserConfig
  ){
    this.authenticate = new ParseAccessToken(this.userConfig.get('JWT_ACCESS_SECRET'))
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    return this.authenticate.execute(context.switchToHttp().getRequest<Request>());
  }
}
