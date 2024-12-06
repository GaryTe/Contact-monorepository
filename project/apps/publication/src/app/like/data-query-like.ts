import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  publicationId,
  idLike
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryLike {
  @IsString({message: publicationId})
  idPublication: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;

  @IsString({message: idLike})
  idLike: string
}
