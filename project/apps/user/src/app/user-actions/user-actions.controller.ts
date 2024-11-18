import { Controller, Body, Post, Get, Param, Query, Patch } from '@nestjs/common';

import {UserActionsService} from './user-actions.service';
import {CreateUserDto, UserRdo, AuthorizationUserDto, UserControllerInterface} from './index';
import {DataQueryUser, DataParamUser} from '@project/typs';
import {fillDTO} from '@project/helpers';

@Controller('/user/')
export class UserActionsController implements UserControllerInterface {
constructor(
  private readonly userActionsService: UserActionsService
) {}

@Post('registration')
public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
  const dataUser = await this.userActionsService.create(dto)
  return fillDTO(UserRdo, dataUser)
}

@Get('authentication')
public async authentication(@Body() dto: AuthorizationUserDto): Promise<{token: string}> {
  const token = await this.userActionsService.authentication(dto);
  return token
}

@Patch('change/:idUser')
public async change(
  @Query() query: DataQueryUser,
  @Param() param: DataParamUser
): Promise<void> {
  await this.userActionsService.change(query, param)
}

@Get(':idUser')
public async show(@Param('idUser') idUser: string): Promise<UserRdo> {
  const dataUser = await this.userActionsService.show(idUser);
  return fillDTO(UserRdo, dataUser)
}
}
