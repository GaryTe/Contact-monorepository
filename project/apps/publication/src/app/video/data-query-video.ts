import {
  IsString,
} from 'class-validator';

import {
  idVideo
} from '@project/validation-errors';

export class DataQueryVideo {
  @IsString({message: idVideo})
  idVideo: string;
}
