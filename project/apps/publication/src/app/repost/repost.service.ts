import { Injectable } from '@nestjs/common';

import {RepostRepository} from './repost.repository';
import {DataQueryRepost, Publication} from '@project/typs';

@Injectable()
export class RepostService {
  constructor(
    private readonly repostRepository: RepostRepository
  ) {}

  public async create(query: DataQueryRepost): Promise<Publication> {
    return await this.repostRepository.create(query);
  }
}
