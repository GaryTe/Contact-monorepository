import {
  PipeTransform,
  Injectable,
  BadRequestException
 } from '@nestjs/common';

import {SIZE_PHOTO} from '@project/consts';
import {uploadPhoto} from '@project/validation-errors';
import {ExtensionPhoto} from '@project/enum';

@Injectable()
export class PhotoValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const fileExtension = value.originalname.split('.');

    if(value.size > SIZE_PHOTO) {
      throw new BadRequestException(uploadPhoto.size)
    }

    if(fileExtension[fileExtension.length - 1] !== ExtensionPhoto.Jpg && fileExtension[fileExtension.length - 1] !== ExtensionPhoto.Png) {
      throw new BadRequestException(uploadPhoto.extension)
    }

    return value
  }
}
