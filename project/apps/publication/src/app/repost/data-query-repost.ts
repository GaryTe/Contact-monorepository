import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idPublication
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryRepost {
  @IsString({message: idPublication})
  idPublication: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
