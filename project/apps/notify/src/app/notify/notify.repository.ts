import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

import {NotifyModel} from './notify.model';

@Injectable()
export class NotifyRepository {
  constructor(@InjectModel(NotifyModel.name) private readonly notifyModel: Model<NotifyModel>)
  {}

  public async searchUsersList(): Promise<NotifyModel[] | [] > {
    const dataUsersList = await this.notifyModel.find({});

    if(!dataUsersList) {
      return []
    }

    return dataUsersList
  }

  public async searchAuthor(idUser: string): Promise<NotifyModel | null> {
    const dataAuthor = await this.notifyModel.findOne({_id: idUser});

    if(!dataAuthor) {
      throw new HttpException(
        `A user with this id: ${idUser} not found`,
        HttpStatus.OK
      );
    }

    return dataAuthor
  }
}
