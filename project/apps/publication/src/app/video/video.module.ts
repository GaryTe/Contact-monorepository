import { Module } from '@nestjs/common';

import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {VideoRepository} from './video.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [VideoController],
  providers: [
    VideoRepository,
    VideoService
  ]
})
export class VideoModule {}
