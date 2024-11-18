import { Module } from '@nestjs/common';

import {UserConfig} from './config-user';

@Module({
  controllers: [],
  providers: [UserConfig],
  exports: [UserConfig],
})
export class ConfigUserModule {}
