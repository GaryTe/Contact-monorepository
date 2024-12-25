import { Module } from '@nestjs/common';

import {UploadFile} from './upload/upload-file';
import {AvatarValidationPipe} from './file-validation/avatar-validation';

@Module({
  controllers: [],
  providers: [UploadFile, AvatarValidationPipe],
  exports: [UploadFile, AvatarValidationPipe],
})
export class FileModule {}
