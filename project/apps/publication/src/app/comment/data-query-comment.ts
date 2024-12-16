import {
  IsString
} from 'class-validator';

import {
  idComment
} from '@project/validation-errors';


export class DataQueryComment {
  @IsString({message: idComment})
  idComment: string;
}
