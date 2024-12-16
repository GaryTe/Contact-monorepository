import {
  IsString
} from 'class-validator';

import {
  publicationId,
  idLike
} from '@project/validation-errors';


export class DataQueryLike {
  @IsString({message: publicationId})
  idPublication: string;

  @IsString({message: idLike})
  idLike: string
}
