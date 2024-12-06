import {
  IsString,
  Length,
  Validate,
  IsOptional,
  IsEnum
} from 'class-validator';
import {Transform} from 'class-transformer';

import {
  quoteName,
  quoteText,
  quoteTags,
  quoteState
} from '@project/validation-errors';
import {
  ValidationTagsList,
  ValidationSpace,
  ValidationLetter,
  ValidationTagLength
} from '@project/helpers';
import {State} from '@project/enum';

export class UpdateQuoteDto {
  @IsOptional()
  @IsString({message: quoteName.isString})
  @Length(3, 50, {message: quoteName.isLength})
  public name?: string;

  @IsOptional()
  @IsString({message: quoteText.isString})
  @Length(20, 300, {message: quoteText.isLength})
  public text?: string;

  @Transform(({value}) => {
    const tagsList = value.map((value) => value.toString());
    return tagsList
  })
  @IsOptional()
  @Validate(ValidationTagsList, {message: quoteTags.isTagsList})
  @Validate(ValidationSpace, {message: quoteTags.isSpace})
  @Validate(ValidationLetter, {message: quoteTags.isLetter})
  @Validate(ValidationTagLength, {message: quoteTags.isLength})
  public tags?: string[];

  @IsOptional()
  @IsEnum(State, {message: quoteState})
  public state?: string;
}
