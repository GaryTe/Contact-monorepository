import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {UserActionsService} from './user-actions.service';
import {UserActionsController} from './user-actions.controller';
import {BlogUserModule} from '../blog-user/blog-user.module';
import {AuthenticationUser} from './authentication-user';
import { ConfigUserModule } from '@project/config-user';
import {BlogRefreshTokenModule} from '../blog-refresh-token/blog-refresh-token.module';
import {FileModule} from '@project/file';
import {getRabbitMQOptions} from '@project/config-notify';
import {ConfigNotifyModule} from '@project/config-notify';


@Module({
  providers: [UserActionsService, AuthenticationUser],
  controllers: [UserActionsController],
  imports: [
    BlogUserModule,
    ConfigUserModule,
    BlogRefreshTokenModule,
    FileModule,
    ConfigNotifyModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions()
    )
  ]
})
export class UserActionsModule {}
