import {
  IsString,
  Validate,
  IsOptional,
  IsEnum,
  IsUrl,
  Length
} from 'class-validator';
import {Transform} from 'class-transformer';

import {
  link,
  linkDescription,
  linkTags,
  linkState
} from '@project/validation-errors';
import {
  ValidationTagsList,
  ValidationSpace,
  ValidationLetter,
  ValidationTagLength
} from '@project/helpers';
import {State} from '@project/enum';

export class UpdateLinkDto {
  @IsOptional()
  @IsUrl({},{message: link})
  public link?: string;

  @IsOptional()
  @IsString({message: linkDescription.isString})
  @Length(0, 50, {message: linkDescription.isLength})
  public description?: string;

  @Transform(({value}) => {
    const tagsList = value.map((value) => value.toString());
    return tagsList
  })
  @IsOptional()
  @Validate(ValidationTagsList, {message: linkTags.isTagsList})
  @Validate(ValidationSpace, {message: linkTags.isSpace})
  @Validate(ValidationLetter, {message: linkTags.isLetter})
  @Validate(ValidationTagLength, {message: linkTags.isLength})
  public tags?: string[];

  @IsOptional()
  @IsEnum(State, {message: linkState})
  public state?: string;
}
