import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Request} from 'express';

import {PhotoService} from './photo.service';
import { CreatePhotoDto, UpdatePhotoDto } from './index';
import { PhotoRdo, DetailInformationRdo } from './index';
import {fillDTO, getFullServerPath} from '@project/helpers';
import {DataQueryPhoto} from './data-query-photo';
import {AuthenticationGuard} from '@project/config-user';
import {UploadFile, PhotoValidationPipe} from '@project/file';
import {PHOTO_NAME, GLOBAL_PEFIX} from '@project/consts';

@Controller('/photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly uploadFile: UploadFile
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor(PHOTO_NAME))
  public async uploadPhoto(@UploadedFile(new PhotoValidationPipe()) file: Express.Multer.File) {
  const photoPath = await this.uploadFile.execute(file, process.env.UPLOAD_PHOTO_DIRECTORY)
  return photoPath
}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreatePhotoDto,
    @Query('newsletter') newsletter: boolean
  ): Promise<PhotoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPhoto = await this.photoService.create({...dto, idUser: id}, newsletter);
    dataPhoto.photo = `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${dataPhoto.photo}`

    return dataPhoto
  }

  @Get('/:idPhoto')
  public async show(@Param('idPhoto', ParseIntPipe) idPhoto: number): Promise<DetailInformationRdo> {
    const dataPhoto = await this.photoService.show(Number(idPhoto));
    dataPhoto.photo = `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${dataPhoto.photo}`

    return fillDTO(DetailInformationRdo, dataPhoto)
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/')
  public async editing(
    @Req() req: Request,
    @Body() dto: UpdatePhotoDto,
    @Query() query: DataQueryPhoto): Promise<PhotoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPhoto = await this.photoService.editing({...query, idUser: id}, dto);
    dataPhoto.photo = `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${dataPhoto.photo}`

    return fillDTO(PhotoRdo, dataPhoto)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryPhoto): Promise<PhotoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPhoto = await this.photoService.delet({...query, idUser: id});
    dataPhoto.photo = `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${dataPhoto.photo}`

    return fillDTO(PhotoRdo, dataPhoto)
  }
}
