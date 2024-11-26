import { Injectable } from '@nestjs/common';

import {LinkRepository} from './link.repository';
import {DataLink, Publication , DataQueryLink} from '@project/typs';
import {BlogLinkEntity} from './blog-link.entity';
import {UpdateLinkDto} from './index';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository
  ) {}

  public async create(dto: DataLink): Promise<Publication> {
    const dataLink = new BlogLinkEntity(dto);

    return await this.linkRepository.create(dataLink);
  }

  public async show(idLink: number): Promise<Publication> {
    return await this.linkRepository.show(idLink);
  }

  public async editing(link: DataQueryLink, dto: UpdateLinkDto): Promise<Publication> {
    return await this.linkRepository.editing(link, dto);
  }

  public async delet(link: DataQueryLink): Promise<Publication> {
    return await this.linkRepository.delet(link);
  }
}
