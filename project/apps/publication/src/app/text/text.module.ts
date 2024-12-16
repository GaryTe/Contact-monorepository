import { Module } from '@nestjs/common';

import {TextController} from './text.controller';
import {TextService} from './text.service';
import {TextRepository} from './text.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [TextController],
  providers: [
    TextRepository,
    TextService
  ]
})
export class TextModule {}
