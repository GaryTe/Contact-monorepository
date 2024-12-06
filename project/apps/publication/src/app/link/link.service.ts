import { Injectable } from '@nestjs/common';

import {LinkRepository} from './link.repository';
import {DataLink, Publication , DataQueryLink} from '@project/typs';
import {BlogLinkEntity} from './blog-link.entity';
import {UpdateLinkDto} from './index';
import {filterTags} from '@project/helpers';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository
  ) {}

  public async create(dto: DataLink): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    const dataLink = new BlogLinkEntity({
      ...dto,
      tags: tagsList
    });

    return await this.linkRepository.create(dataLink);
  }

  public async show(idLink: number): Promise<Publication> {
    return await this.linkRepository.show(idLink);
  }

  public async editing(link: DataQueryLink, dto: UpdateLinkDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.linkRepository.editing(
      link,
      {...dto, tags: tagsList}
    );
  }

  public async delet(link: DataQueryLink): Promise<Publication> {
    return await this.linkRepository.delet(link);
  }
}
