import {
  IsString,
  Validate,
  IsOptional,
  IsEnum
} from 'class-validator';
import {Transform} from 'class-transformer';

import {
  photo,
  photoTags,
  photoState
} from '@project/validation-errors';
import {
  ValidationTagsList,
  ValidationSpace,
  ValidationLetter,
  ValidationTagLength
} from '@project/helpers';
import {State} from '@project/enum';

export class CreatePhotoDto {
  @IsString({message: photo})
  public photo: string;

  @Transform(({value}) => {
    const tagsList = value.map((value) => value.toString());
    return tagsList
  })
  @IsOptional()
  @Validate(ValidationTagsList, {message: photoTags.isTagsList})
  @Validate(ValidationSpace, {message: photoTags.isSpace})
  @Validate(ValidationLetter, {message: photoTags.isLetter})
  @Validate(ValidationTagLength, {message: photoTags.isLength})
  public tags?: string[];

  @IsOptional()
  @IsEnum(State, {message: photoState})
  public state?: string;
}
