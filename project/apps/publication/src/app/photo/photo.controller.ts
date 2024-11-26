import { Controller, Post, Body, Param, Get, Patch, Query, Delete } from '@nestjs/common';

import {PhotoService} from './photo.service';
import { CreatePhotoDto, UpdatePhotoDto } from './index';
import { PhotoRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryPhoto} from '@project/typs';

@Controller('/photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreatePhotoDto,
    @Param('idUser') idUser: string
  ): Promise<PhotoRdo> {
    const dataPhoto = await this.photoService.create({...dto, idUser});
    return fillDTO(PhotoRdo, dataPhoto)
  }

  @Get('/:idPhoto')
  public async show(@Param('idPhoto') idPhoto: string): Promise<DetailInformationRdo> {
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
