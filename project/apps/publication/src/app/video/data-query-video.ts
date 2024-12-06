import {
  IsString,
  Validate
} from 'class-validator';

import {
  idUser,
  idVideo
} from '@project/validation-errors';

import { ValidationIdUser } from '@project/helpers';

export class DataQueryVideo {
  @IsString({message: idVideo})
  idVideo: string;

  @IsString({message: idUser.isString})
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser: string;
}
