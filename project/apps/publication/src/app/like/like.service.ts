import { Injectable } from '@nestjs/common';

import {LikeRepository} from './like.repository';
import {DataQueryLike} from '@project/typs';
import {LikeRdo} from './rdo/like.rdo';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository
  ) {}

  public async likeDislike(query: DataQueryLike): Promise<LikeRdo> {
    return await this.likeRepository.likeDislike(query);
  }

  public async getLike(query: DataQueryLike): Promise<LikeRdo> {
    return await this.likeRepository.getLike(query);
  }
}
