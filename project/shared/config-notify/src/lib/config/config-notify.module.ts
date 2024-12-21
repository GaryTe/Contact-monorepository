import { Module } from '@nestjs/common';

import {NotifyConfig} from './config-notify';

@Module({
  controllers: [],
  providers: [NotifyConfig],
  exports: [NotifyConfig],
})
export class ConfigNotifyModule {}
