import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idText
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryText {
  @IsString({message: idText})
  idText: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
