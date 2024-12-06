import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataParamUser {
  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  public idUser!: string
}
