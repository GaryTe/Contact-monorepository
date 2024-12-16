import {
  IsString
} from 'class-validator';

import {
  idText
} from '@project/validation-errors';


export class DataQueryText {
  @IsString({message: idText})
  idText: string;
}
