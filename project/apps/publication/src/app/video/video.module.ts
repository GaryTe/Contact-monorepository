import { Module } from '@nestjs/common';

import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {VideoRepository} from './video.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [VideoController],
  providers: [
    VideoRepository,
    VideoService
  ]
})
export class VideoModule {}
