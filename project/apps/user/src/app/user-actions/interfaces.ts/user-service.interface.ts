import {CreateUserDto} from '../index';
import {DataQueryUser, Publication} from '@project/typs';
import {BlogUserModel} from '../../blog-user/index';
import { ConsumeMessage } from 'amqplib';

export interface UserServiceInterface {
  create(dto: CreateUserDto): Promise<BlogUserModel>;
  change(query: DataQueryUser, idUser: string): Promise<void>;
  show(id: string, amqpMsg?: ConsumeMessage): Promise<{
      dataUser: BlogUserModel,
      dataPublicationsList: Publication[] | []
    }>;
}
