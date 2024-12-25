import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express, Request} from 'express';
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
import {fillDTO, getFullServerPath} from '@project/helpers';
import {AccessAndRefreshToken} from '@project/typs';
import {AuthenticationGuard, AuthorizationGuard} from '@project/config-user';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX, AVATAR_NAME} from '@project/consts';
import {UploadFile, AvatarValidationPipe} from '@project/file';

@Controller('/user/')
export class UserActionsController implements UserControllerInterface {
constructor(
  private readonly userActionsService: UserActionsService,
  private readonly authenticationUser: AuthenticationUser,
  private readonly userConfig: UserConfig,
  private readonly uploadFile: UploadFile
) {}

@Post('avatar')
@UseInterceptors(FileInterceptor(AVATAR_NAME))
public async uploadAvatar(@UploadedFile(new AvatarValidationPipe()) file: Express.Multer.File) {
  const avatarPath = await this.uploadFile.execute(file, this.userConfig.get('UPLOAD_DIRECTORY'))
  return avatarPath
}

@Post('registration')
public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
  const dataUser = await this.userActionsService.create(dto)
  dataUser.avatar = `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataUser.avatar}`

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
  dataUser.avatar = `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataUser.avatar}`

  return fillDTO(UserRdo, dataUser)
}

@UseGuards(AuthorizationGuard)
@Post('tokens')
public async createTokens(@Req() req: Request): Promise<AccessAndRefreshToken> {
  const datasList = req.headers?.tokenPayload as unknown as string[]
  return await this.userActionsService.createTokens(datasList)
}
}
