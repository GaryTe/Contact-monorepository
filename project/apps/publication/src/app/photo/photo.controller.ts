import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
  Delete,
  ParseIntPipe
} from '@nestjs/common';

import {PhotoService} from './photo.service';
import { CreatePhotoDto, UpdatePhotoDto } from './index';
import { PhotoRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryPhoto} from './data-query-photo';
import {DataParamUser} from '../video/data-param-user';

@Controller('/photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreatePhotoDto,
    @Param() param: DataParamUser
  ): Promise<PhotoRdo> {
    const dataPhoto = await this.photoService.create({...dto, idUser: param.idUser});
    return fillDTO(PhotoRdo, dataPhoto)
  }

  @Get('/:idPhoto')
  public async show(@Param('idPhoto', ParseIntPipe) idPhoto: number): Promise<DetailInformationRdo> {
    const dataPhoto = await this.photoService.show(Number(idPhoto));
    return fillDTO(DetailInformationRdo, dataPhoto)
  }

  @Patch('/')
  public async editing(@Body() dto: UpdatePhotoDto, @Query() query: DataQueryPhoto): Promise<PhotoRdo> {
    const dataPhoto = await this.photoService.editing(query, dto);
    return fillDTO(PhotoRdo, dataPhoto)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryPhoto): Promise<PhotoRdo> {
    const dataPhoto = await this.photoService.delet(query);
    return fillDTO(PhotoRdo, dataPhoto)
  }
}
