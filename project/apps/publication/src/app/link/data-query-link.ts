import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idLink
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryLink {
  @IsString({message: idLink})
  idLink: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
