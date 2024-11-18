import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user/blog-user.module';
import { UserActionsModule } from './user-actions/user-actions.module';
import {ConfigUserModule, getMongooseOptions} from '@project/config-user';


@Module({
  imports: [
    BlogUserModule,
    UserActionsModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
