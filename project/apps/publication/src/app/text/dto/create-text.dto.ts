import {
  IsString,
  Length,
  Validate,
  IsOptional,
  IsEnum
} from 'class-validator';
import {Transform} from 'class-transformer';

import {
  textName,
  textPreviw,
  text,
  textTags,
  textState
} from '@project/validation-errors';
import {
  ValidationTagsList,
  ValidationSpace,
  ValidationLetter,
  ValidationTagLength
} from '@project/helpers';
import {State} from '@project/enum';

export class CreateTextDto {
  @IsString({message: textName.isString})
  @Length(20, 50, {message: textName.isLength})
  public name: string;

  @IsString({message: textPreviw.isString})
  @Length(50, 255, {message: textPreviw.isLength})
  public preview: string;

  @IsString({message: text.isString})
  @Length(100, 1024, {message: text.isLength})
  public text: string;

  @Transform(({value}) => {
    const tagsList = value.map((value) => value.toString());
    return tagsList
  })
  @IsOptional()
  @Validate(ValidationTagsList, {message: textTags.isTagsList})
  @Validate(ValidationSpace, {message: textTags.isSpace})
  @Validate(ValidationLetter, {message: textTags.isLetter})
  @Validate(ValidationTagLength, {message: textTags.isLength})
  public tags?: string[];

  @IsOptional()
  @IsEnum(State, {message: textState})
  public state?: string;
}
