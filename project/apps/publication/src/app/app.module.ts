import { Module } from '@nestjs/common';

import { VideoModule } from './video/video.module';
import {TextModule} from './text/text.module';
import {PhotoModule} from './photo/photo.module';
import {QuoteModule} from './quote/quote.module';
import {LinkModule} from './link/link.module';
import {RepostModule} from './repost/repost.module';
import {CommentModule} from './comment/comment.module';
import {LikeModule} from './like/like.module';
import {FindPublicationModule} from './find-publication/find-publication.module';
import {ListPublicationModule} from './list-publication/list-publication.module';
import {ConfigUserModule} from '@project/config-user';
import {ConfigNotifyModule} from '@project/config-notify';

@Module({
  imports: [
    VideoModule,
    TextModule,
    PhotoModule,
    QuoteModule,
    LinkModule,
    RepostModule,
    CommentModule,
    LikeModule,
    FindPublicationModule,
    ListPublicationModule,
    ConfigUserModule,
    ConfigNotifyModule
  ]
})
export class AppModule {}
