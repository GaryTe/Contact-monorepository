import { Module } from '@nestjs/common';

import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {CommentRepository} from './comment.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [CommentController],
  providers: [
    CommentRepository,
    CommentService
  ]
})
export class CommentModule {}
