import {
  IsEmail,
  IsString,
  Length
} from 'class-validator';

import {
  email,
  password
} from '@project/validation-errors';

export class AuthorizationUserDto {
  @IsString({message: password.isString})
  @Length(6, 12, {message: password.isLength})
  password: string;

  @IsEmail({}, {message: email})
  email: string;
}
