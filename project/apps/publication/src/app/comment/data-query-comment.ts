import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idComment
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryComment {
  @IsString({message: idComment})
  idComment: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
