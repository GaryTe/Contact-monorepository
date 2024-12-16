import {
  IsString
} from 'class-validator';

import {
  idLink
} from '@project/validation-errors';

export class DataQueryLink {
  @IsString({message: idLink})
  idLink: string;
}
