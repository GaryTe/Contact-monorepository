import {
  IsString
} from 'class-validator';

import {
  word
} from '@project/validation-errors';

export class DataParamPublication {
  @IsString({message: word})
  public word: string
}
