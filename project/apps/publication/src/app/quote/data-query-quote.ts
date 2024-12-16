import {
  IsString
} from 'class-validator';

import {
  idQuote
} from '@project/validation-errors';

export class DataQueryQuote {
  @IsString({message: idQuote})
  idQuote: string;
}
