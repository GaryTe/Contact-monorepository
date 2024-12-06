import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idQuote
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryQuote {
  @IsString({message: idQuote})
  idQuote: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
