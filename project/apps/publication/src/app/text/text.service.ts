import { Injectable } from '@nestjs/common';

import {TextRepository} from './text.repository';
import {DataText, Publication , DataQueryText} from '@project/typs';
import {BlogTextEntity} from './blog-text.entity';
import {UpdateTextDto} from './index';

@Injectable()
export class TextService {
  constructor(
    private readonly textRepository: TextRepository
  ) {}

  public async create(dto: DataText): Promise<Publication> {
    const dataText = new BlogTextEntity(dto);

    return await this.textRepository.create(dataText);
  }

  public async show(idText: number): Promise<Publication> {
    return await this.textRepository.show(idText);
  }

  public async editing(query: DataQueryText, dto: UpdateTextDto): Promise<Publication> {
    return await this.textRepository.editing(query, dto);
  }

  public async delet(query: DataQueryText): Promise<Publication> {
    return await this.textRepository.delet(query);
  }
}
