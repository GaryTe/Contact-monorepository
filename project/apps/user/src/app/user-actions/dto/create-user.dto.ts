import {
  IsEmail,
  IsString,
  Length,
  Validate
} from 'class-validator';

import {
  email,
  name,
  password
} from '@project/validation-errors';
import {ValidationName} from '@project/helpers';

export class CreateUserDto {
  @IsEmail({}, {message: email})
  public email: string;

  @IsString({message: name.isString})
  @Length(3, 50, {message: name.isLength})
  @Validate(ValidationName, {message: name.value})
  public name: string;

  public avatar?: string;

  @IsString({message: password.isString})
  @Length(6, 12, {message: password.isLength})
  public password: string;
}
