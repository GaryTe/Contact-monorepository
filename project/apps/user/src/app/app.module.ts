import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user/blog-user.module';
import { UserActionsModule } from './user-actions/user-actions.module';
import {ConfigUserModule, getMongooseOptions} from '@project/config-user';
import {BlogRefreshTokenModule} from './blog-refresh-token/blog-refresh-token.module';
import {FileModule} from '@project/file';

@Module({
  imports: [
    BlogUserModule,
    UserActionsModule,
    ConfigUserModule,
    BlogRefreshTokenModule,
    FileModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
