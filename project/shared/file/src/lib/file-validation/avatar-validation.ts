import {
  PipeTransform,
  Injectable,
  BadRequestException
 } from '@nestjs/common';

import {SIZE_FILE} from '@project/consts';
import {avatar} from '@project/validation-errors';
import {Extension} from '@project/enum';

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const fileExtension = value.originalname.split('.');

    if(value.size > SIZE_FILE) {
      throw new BadRequestException(avatar.size)
    }

    if(fileExtension[fileExtension.length - 1] !== Extension.Jpeg && fileExtension[fileExtension.length - 1] !== Extension.Png) {
      throw new BadRequestException(avatar.extension)
    }

    return value
  }
}
