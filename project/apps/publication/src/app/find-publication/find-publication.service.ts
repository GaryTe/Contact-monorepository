import { Injectable } from '@nestjs/common';

import {FindPublicationRepository} from './find-publication.repository';
import {Publication} from '@project/typs';


@Injectable()
export class FindPublicationService {
  constructor(
    private readonly findPublicationRepository: FindPublicationRepository
  ) {}

  public async findPublication(word: string): Promise<Publication[] | []> {
    return await this.findPublicationRepository.findPublication(word);
  }
}
