import { Controller, Post, Body, Param, Get, Patch, Query, Delete } from '@nestjs/common';

import {VideoService} from './video.service';
import {CreateVideoDto, UpdateVideoDto} from './index';
import {VideoRdo, DetailInformationRdo} from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryVideo} from '@project/typs';

@Controller('/video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateVideoDto,
    @Param('idUser') idUser: string
  ): Promise<VideoRdo> {
    const dataVideo = await this.videoService.create({...dto, idUser});
    return fillDTO(VideoRdo, dataVideo)
  }

  @Get('/:idVideo')
  public async show(@Param('idVideo') idVideo: string): Promise<DetailInformationRdo> {
    const dataVideo = await this.videoService.show(Number(idVideo));
    return fillDTO(DetailInformationRdo, dataVideo)
  }

  @Patch('/')
  public async editing(@Body() dto: UpdateVideoDto, @Query() query: DataQueryVideo): Promise<VideoRdo> {
    const dataVideo = await this.videoService.editing(query, dto);
    return fillDTO(VideoRdo, dataVideo)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryVideo): Promise<VideoRdo> {
    const dataVideo = await this.videoService.delet(query);
    return fillDTO(VideoRdo, dataVideo)
  }
}
