import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  Patch,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req
} from '@nestjs/common';
import {Express, Request} from 'express';
import {FileInterceptor} from '@nestjs/platform-express';
import 'multer';

import {UserActionsService} from './user-actions.service';
import {AuthenticationUser} from './authentication-user';
import {
  CreateUserDto,
  UserRdo,
  AuthorizationUserDto,
  UserControllerInterface,
  DataParamUser,
  DataQueryUser
} from './index';
import {fillDTO} from '@project/helpers';
import {AccessAndRefreshToken} from '@project/typs';
import {AuthenticationGuard, AuthorizationGuard} from '@project/config-user';

@Controller('/user/')
export class UserActionsController implements UserControllerInterface {
constructor(
  private readonly userActionsService: UserActionsService,
  private readonly authenticationUser: AuthenticationUser
) {}

@Post('avatar')
@UseInterceptors(FileInterceptor('avatar'))
public async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
  console.log(file)
}

@Post('registration')
public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
  const dataUser = await this.userActionsService.create(dto)
  return fillDTO(UserRdo, dataUser)
}

@Get('authentication')
public async authentication(@Body() dto: AuthorizationUserDto): Promise<AccessAndRefreshToken> {
  const dataUser = await this.authenticationUser.verify(dto);
  const parAccessTokenAndRefreshToken = await this.authenticationUser.authenticate(dataUser);
  await this.userActionsService.authentication(dataUser, parAccessTokenAndRefreshToken)
  return parAccessTokenAndRefreshToken
}

@UseGuards(AuthenticationGuard)
@Patch('change')
public async change(
  @Req() req: Request,
  @Query() query: DataQueryUser,
): Promise<void> {
  const [id] = req.headers?.tokenPayload as unknown as string
  await this.userActionsService.change(query, id)
}

@Get(':idUser')
public async show(@Param() param: DataParamUser): Promise<UserRdo> {
  const dataUser = await this.userActionsService.show(param.idUser);
  return fillDTO(UserRdo, dataUser)
}

@UseGuards(AuthorizationGuard)
@Post('tokens')
public async createTokens(@Req() req: Request): Promise<AccessAndRefreshToken> {
  const datasList = req.headers?.tokenPayload as unknown as string[]
  return await this.userActionsService.createTokens(datasList)
}
}
