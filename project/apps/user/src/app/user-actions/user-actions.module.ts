import { Module } from '@nestjs/common';

import {UserActionsService} from './user-actions.service';
import {UserActionsController} from './user-actions.controller';
import {BlogUserModule} from '../blog-user/blog-user.module';
import {AuthenticationUser} from './authentication-user';
import { ConfigUserModule } from '@project/config-user';
import {BlogRefreshTokenModule} from '../blog-refresh-token/blog-refresh-token.module';

@Module({
  providers: [UserActionsService, AuthenticationUser],
  controllers: [UserActionsController],
  imports: [BlogUserModule, ConfigUserModule, BlogRefreshTokenModule]
})
export class UserActionsModule {}
