import {
  CreateUserDto,
  AuthorizationUserDto
} from '../index';
import {DataQueryUser, DataParamUser} from '@project/typs';
import {BlogUserModel} from '../../blog-user/index';

export interface UserServiceInterface {
  create(dto: CreateUserDto): Promise<BlogUserModel>;
  authentication(dto: AuthorizationUserDto): Promise<{token: string}>;
  change(query: DataQueryUser, param: DataParamUser): Promise<void>;
  show(id: string): Promise<BlogUserModel>;
}
