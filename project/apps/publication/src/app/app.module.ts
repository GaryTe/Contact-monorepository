import { Module } from '@nestjs/common';

import { VideoModule } from './video/video.module';
import {TextModule} from './text/text.module';
import {PhotoModule} from './photo/photo.module';
import {QuoteModule} from './quote/quote.module';
import {LinkModule} from './link/link.module';
import {RepostModule} from './repost/repost.module';
import {CommentModule} from './comment/comment.module';

@Module({
  imports: [
    VideoModule,
    TextModule,
    PhotoModule,
    QuoteModule,
    LinkModule,
    RepostModule,
    CommentModule
  ]
})
export class AppModule {}
