import {CreateUserDto} from '../index';
import {DataQueryUser} from '@project/typs';
import {BlogUserModel} from '../../blog-user/index';

export interface UserServiceInterface {
  create(dto: CreateUserDto): Promise<BlogUserModel>;
  change(query: DataQueryUser, idUser: string): Promise<void>;
  show(id: string): Promise<BlogUserModel>;
}
