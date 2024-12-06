import {
  IsString,
  Length,
  IsInt
} from 'class-validator';

import {
  comment
} from '@project/validation-errors';

export class CreateCommentDto {
  @IsString({message: comment.isString})
  @Length(10, 300, {message: comment.length})
  public text: string;

  @IsInt({message: comment.idPublication})
  public idPublication: number;
}
