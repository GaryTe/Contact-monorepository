import { Module } from '@nestjs/common';

import {PhotoController} from './photo.controller';
import {PhotoService} from './photo.service';
import {PhotoRepository} from './photo.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [PhotoController],
  providers: [
    PhotoRepository,
    PhotoService
  ]
})
export class PhotoModule {}
