import { Module } from '@nestjs/common';

import {PhotoController} from './photo.controller';
import {PhotoService} from './photo.service';
import {PhotoRepository} from './photo.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [PhotoController],
  providers: [
    PhotoRepository,
    PhotoService
  ]
})
export class PhotoModule {}
