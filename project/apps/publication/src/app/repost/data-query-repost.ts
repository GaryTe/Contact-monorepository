import {
  IsString
} from 'class-validator';

import {
  idPublication
} from '@project/validation-errors';


export class DataQueryRepost {
  @IsString({message: idPublication})
  idPublication: string;
}
