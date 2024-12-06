import {
  Validate,
  IsOptional,
  IsEnum,
  IsString
} from 'class-validator';

import {
  idUser,
  sort,
  type,
  tag
} from '@project/validation-errors';
import { ValidationIdUser } from '@project/helpers';
import {Sort, TypePublication} from '@project/enum';

export class DataQueryList {
  @IsOptional()
  @Validate(ValidationIdUser, {message: idUser.validate})
  idUser?: string | undefined;

  @IsOptional()
  @IsEnum(Sort, {message: sort})
  sort?: string | undefined;

  @IsOptional()
  @IsEnum(TypePublication, {message: type})
  type?: string | undefined;

  @IsOptional()
  @IsString({message: tag})
  tag?: string | undefined;
}
