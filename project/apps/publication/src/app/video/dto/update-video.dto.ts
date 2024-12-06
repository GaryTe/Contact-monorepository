import {
  IsString,
  Length,
  Validate,
  IsOptional,
  IsEnum
} from 'class-validator';
import {Transform} from 'class-transformer';

import {
  videoName,
  videoLink,
  videoTags,
  videoState
} from '@project/validation-errors';
import {
  ValidationVideoLink,
  ValidationTagsList,
  ValidationSpace,
  ValidationLetter,
  ValidationTagLength
} from '@project/helpers';
import {State} from '@project/enum';

export class UpdateVideoDto {
  @IsOptional()
  @IsString({message: videoName.isString})
  @Length(20, 50, {message: videoName.isLength})
  public name?: string;

  @IsOptional()
  @IsString({message: videoLink.isString})
  @Validate(ValidationVideoLink, {message: videoLink.value})
  public link?: string;

  @Transform(({value}) => {
    const tagsList = value.map((value) => value.toString());
    return tagsList
  })
  @IsOptional()
  @Validate(ValidationTagsList, {message: videoTags.isTagsList})
  @Validate(ValidationSpace, {message: videoTags.isSpace})
  @Validate(ValidationLetter, {message: videoTags.isLetter})
  @Validate(ValidationTagLength, {message: videoTags.isLength})
  public tags?: string[];

  @IsOptional()
  @IsEnum(State, {message: videoState})
  public state?: string;
}
