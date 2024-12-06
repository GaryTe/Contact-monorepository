import {
  CreateUserDto,
  UserRdo,
  AuthorizationUserDto
} from '../index';
import {DataQueryUser, DataParamUser} from '@project/typs';

export interface UserControllerInterface {
  create(dto: CreateUserDto): Promise<UserRdo>;
  authentication(dto: AuthorizationUserDto): Promise<{token: string}>;
  change(query: DataQueryUser, param: DataParamUser): Promise<void>;
  show(param: DataParamUser): Promise<UserRdo>;
}
