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
  UseGuards,
  Req
 } from '@nestjs/common';
 import {Request} from 'express';

import {VideoService} from './video.service';
import {CreateVideoDto, UpdateVideoDto} from './index';
import {VideoRdo, DetailInformationRdo} from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryVideo} from './data-query-video';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreateVideoDto,
  ): Promise<VideoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataVideo = await this.videoService.create({...dto, idUser: id});
    return fillDTO(VideoRdo, dataVideo)
  }

  @Get('/:idVideo')
  public async show(@Param('idVideo', ParseIntPipe) idVideo: number): Promise<DetailInformationRdo> {
    const dataVideo = await this.videoService.show(idVideo);
    return fillDTO(DetailInformationRdo, dataVideo)
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/')
  public async editing(
    @Req() req: Request,
    @Body() dto: UpdateVideoDto,
    @Query() query: DataQueryVideo): Promise<VideoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataVideo = await this.videoService.editing({...query, idUser: id}, dto);
    return fillDTO(VideoRdo, dataVideo)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryVideo): Promise<VideoRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataVideo = await this.videoService.delet({...query, idUser: id});
    return fillDTO(VideoRdo, dataVideo)
  }
}
