import {
  IsString,
  Length
} from 'class-validator';

import {
  query
} from '@project/validation-errors';

export class DataQueryUser {
  @IsString({ message: query.oldPassword.isString })
  @Length(6, 12, { message: query.oldPassword.isLength })
  public oldPassword!: string;

  @IsString({ message: query.newPassword.isString })
  @Length(6, 12, { message: query.newPassword.isLength })
  public newPassword!: string;
}
