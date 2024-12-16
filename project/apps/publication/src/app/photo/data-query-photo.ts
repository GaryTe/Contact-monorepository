import {
  IsString
} from 'class-validator';

import {
  idPhoto
} from '@project/validation-errors';


export class DataQueryPhoto {
  @IsString({message: idPhoto})
  idPhoto: string;
}
