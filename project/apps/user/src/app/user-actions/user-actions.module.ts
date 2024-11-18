import { Module } from '@nestjs/common';

import {UserActionsService} from './user-actions.service';
import {UserActionsController} from './user-actions.controller';
import {BlogUserModule} from '../blog-user/blog-user.module';

@Module({
  providers: [UserActionsService],
  controllers: [UserActionsController],
  imports: [BlogUserModule]
})
export class UserActionsModule {}
