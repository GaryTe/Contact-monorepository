import {BlogUserModel, BlogUserEntity} from '../../blog-user/index';

export interface UserRepositoryInterface {
  create(dataUser: BlogUserEntity): Promise<BlogUserModel>;
  findByEmail(email: string): Promise<BlogUserModel | null>;
  findOrCreate(dto: BlogUserEntity): Promise<BlogUserModel>;
  findByid(id: string): Promise<BlogUserModel | null>;
  findByIdAndUpdate(id: string, newPassword: string): Promise<BlogUserModel | null>
}
