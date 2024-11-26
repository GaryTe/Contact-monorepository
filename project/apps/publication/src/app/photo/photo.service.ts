import { Injectable } from '@nestjs/common';

import {PhotoRepository} from './photo.repository';
import {DataPhoto, Publication , DataQueryPhoto} from '@project/typs';
import {BlogPhotoEntity} from './blog-photo.entity';
import {UpdatePhotoDto} from './index';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository
  ) {}

  public async create(dto: DataPhoto): Promise<Publication> {
    const dataPhoto = new BlogPhotoEntity(dto);

    return await this.photoRepository.create(dataPhoto);
  }

  public async show(idPhoto: number): Promise<Publication> {
    return await this.photoRepository.show(idPhoto);
  }

  public async editing(query: DataQueryPhoto, dto: UpdatePhotoDto): Promise<Publication> {
    return await this.photoRepository.editing(query, dto);
  }

  public async delet(query: DataQueryPhoto): Promise<Publication> {
    return await this.photoRepository.delet(query);
  }
}