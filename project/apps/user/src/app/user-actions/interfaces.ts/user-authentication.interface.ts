import {AuthorizationUserDto} from '../index';
import {BlogUserModel} from '../../blog-user/index';
import {AccessAndRefreshToken, TokenPayload} from '@project/typs';

export interface Authentication {
  authenticate(user: BlogUserModel | TokenPayload): Promise<AccessAndRefreshToken>;
  verify(dto: AuthorizationUserDto): Promise<BlogUserModel | null>;
}
