import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  publicationId
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryGetLike {
  @IsString({message: publicationId})
  idPublication: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
