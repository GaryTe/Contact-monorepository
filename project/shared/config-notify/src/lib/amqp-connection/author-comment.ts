import {Injectable} from '@nestjs/common';

import {ConfigSchema, Config} from '@project/config-user';
import {DetailInformationComment} from '@project/typs';
import {getFullServerPath} from '@project/helpers';
import {GLOBAL_PEFIX} from '@project/consts';


@Injectable()
export class AuthorComment {
  private readonly userConfig;

  constructor(
    userConfig: Config<ConfigSchema>
  ) {
    this.userConfig = userConfig;
  }

  public async execute(
    dataComment: DetailInformationComment | DetailInformationComment[],
    dataAuthor: {
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null
  ): Promise<DetailInformationComment | DetailInformationComment[]> {

    if (!dataAuthor) {
      return dataComment
    }

    if(!Array.isArray(dataComment)) {
      const [author] = dataAuthor;

      delete dataComment.idUser

      return {
        ...dataComment,
        author: {
          ...author,
          avatar: author.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${author.avatar}` : author.avatar
        }
      } as DetailInformationComment
    }

  if(Array.isArray(dataComment) && dataComment.length > 0) {
      const _dataComment: DetailInformationComment[] = []

      dataComment.forEach((comment) => {
      const author = dataAuthor.find((item) => item.id === comment.idUser) as {
        id: string,
        name: string,
        email: string,
        avatar: string
      }

      if(author) {
        comment.author = {
          ...author,
          avatar: author.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${author.avatar}` : author.avatar
        }
      }

      delete comment.idUser;

      _dataComment.push(comment)
    })
    return _dataComment
  }

    return dataComment
  }
}
