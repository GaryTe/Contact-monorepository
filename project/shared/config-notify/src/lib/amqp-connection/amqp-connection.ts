import {Injectable} from '@nestjs/common';

import {ConfigSchema, Config} from '@project/config-user';
import {Publication} from '@project/typs';
import {getFullServerPath} from '@project/helpers';
import {GLOBAL_PEFIX} from '@project/consts';


@Injectable()
export class RabbitmqConnection {
  private readonly userConfig;

  constructor(
    userConfig: Config<ConfigSchema>
  ) {
    this.userConfig = userConfig;
  }

  public async execute(
    dataPublication: Publication | Publication[],
    dataAuthor: {
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null
  ): Promise<Publication | Publication[]> {

    if (!dataAuthor) {
      return dataPublication
    }

    if(!Array.isArray(dataPublication)) {
      const _author = dataAuthor.find((item) => item.id === dataPublication.additional.idUser) as {
        id: string,
        name: string,
        email: string,
        avatar: string
      }

      if(_author) {
        dataPublication.additional.author = {
          ..._author,
          avatar: _author.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${_author.avatar}` : _author.avatar
        }
      }

      delete dataPublication.additional.idUser;

    if(dataPublication.additional.originalIdUser) {
      const _originalAuthor = dataAuthor.find((item) => item.id === dataPublication.additional.originalIdUser) as {
        id: string,
        name: string,
        email: string,
        avatar: string
      }

      if(_originalAuthor) {
        dataPublication.additional.originaUser = _originalAuthor;
      }
      delete dataPublication.additional.originalIdUser;
    }
      return dataPublication
    }

  if(Array.isArray(dataPublication) && dataPublication.length > 0) {
      const _dataPublication: Publication[] = []

      dataPublication.forEach((publication) => {
      const _author = dataAuthor.find((item) => item.id === publication.additional.idUser) as {
        id: string,
        name: string,
        email: string,
        avatar: string
      }

      if(_author) {
        publication.additional.author = {
          ..._author,
          avatar: _author.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${_author.avatar}` : _author.avatar
        }
      }

      delete publication.additional.idUser;


    if(publication.additional.originalIdUser) {
      const _originalAuthor = dataAuthor.find((item) => item.id === publication.additional.originalIdUser) as {
        id: string,
        name: string,
        email: string,
        avatar: string
      }

      if(_originalAuthor) {
        publication.additional.originaUser = _originalAuthor;
      }
      delete publication.additional.originalIdUser;
    }
    _dataPublication.push(publication)
    })

    return _dataPublication
  }

    return dataPublication
  }
}
