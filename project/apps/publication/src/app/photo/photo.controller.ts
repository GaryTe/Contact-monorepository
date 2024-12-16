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
  UseGuards
} from '@nestjs/common';
import {Request} from 'express';

import {PhotoService} from './photo.service';
import { CreatePhotoDto, UpdatePhotoDto } from './index';
import { PhotoRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryPhoto} from './data-query-photo';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreatePhotoDto
  ): Promise<PhotoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPhoto = await this.photoService.create({...dto, idUser: id});
    return fillDTO(PhotoRdo, dataPhoto)
  }

  @Get('/:idPhoto')
  public async show(@Param('idPhoto', ParseIntPipe) idPhoto: number): Promise<DetailInformationRdo> {
    const dataPhoto = await this.photoService.show(Number(idPhoto));
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
    return fillDTO(PhotoRdo, dataPhoto)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryPhoto): Promise<PhotoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPhoto = await this.photoService.delet({...query, idUser: id});
    return fillDTO(PhotoRdo, dataPhoto)
  }
}
