import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idPhoto
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryPhoto {
  @IsString({message: idPhoto})
  idPhoto: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
