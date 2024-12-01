import { Injectable } from '@nestjs/common';

import {ListPublicationRepository} from './list-publication.repository';
import {Publication} from '@project/typs';
import {DataQueryList} from '@project/typs';
import {Counter} from '@project/enum';


@Injectable()
export class ListPublicationService {
  private limit;
  private page;
  constructor(
    private readonly listPublicationRepository: ListPublicationRepository
  ) {
    this.limit = Counter.TwentyFive;
    this.page = Counter.Zero;
  }

  public async index(query: DataQueryList): Promise<Publication[] | []> {
    const dataPublicationsList = await this.listPublicationRepository.index({
      ...query,
      limit: this.limit,
      page: this.page
    });

    if(!dataPublicationsList.length) {
      this.limit = Counter.TwentyFive;
      this.page = Counter.Zero;
    }else{
      this.limit += Counter.TwentyFive;
      this.page += Counter.TwentyFive;
    }

    return dataPublicationsList
  }

  public async list(idUser: string): Promise<Publication[] | []> {
    const dataPublicationsList = await this.listPublicationRepository.list({
      idUser,
      limit: this.limit,
      page: this.page
    });

    if(!dataPublicationsList.length) {
      this.limit = Counter.TwentyFive;
      this.page = Counter.Zero;
    }else{
      this.limit += Counter.TwentyFive;
      this.page += Counter.TwentyFive;
    }

    return dataPublicationsList
  }
}
