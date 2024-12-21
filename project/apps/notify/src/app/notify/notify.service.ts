import { Injectable } from '@nestjs/common';

import {NotifyRepository} from './notify.repository';
import {NotifyModel} from './notify.model'

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyRepository: NotifyRepository
  ) {}

  public async searchUsersList(idUser: string): Promise<{author: NotifyModel, subscribers: NotifyModel[]}> {
    const dataAuthor = await this.notifyRepository.searchAuthor(idUser)
    const dataUsersList = await this.notifyRepository.searchUsersList();

    return ({
      author: dataAuthor,
      subscribers: dataUsersList
    })
  }
}
