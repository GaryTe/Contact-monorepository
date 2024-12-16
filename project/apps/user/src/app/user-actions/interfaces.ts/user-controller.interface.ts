import {
  CreateUserDto,
  UserRdo,
  AuthorizationUserDto
} from '../index';
import {DataQueryUser, DataParamUser, AccessAndRefreshToken} from '@project/typs';

export interface UserControllerInterface {
  create(dto: CreateUserDto): Promise<UserRdo>;
  authentication(dto: AuthorizationUserDto): Promise<AccessAndRefreshToken>;
  change(req, query: DataQueryUser, param: DataParamUser): Promise<void>;
  show(param: DataParamUser): Promise<UserRdo>;
}
