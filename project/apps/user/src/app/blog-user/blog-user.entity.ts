import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import {SALT_ROUNDS} from '@project/consts';
import {UserInterface} from './index';
import {DataUser} from '@project/typs';

export class BlogUserEntity implements UserInterface {
  private email: string;
  private name: string;
  private avatar?: string;
  private passwordHash: string;

  constructor(data: DataUser) {
    this.populate(data)
  }

  private populate(data: DataUser): void {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.passwordHash = data.password ? this.setPassword(data.password) : data.passwordHash
  }

  public setPassword(password: string): string {
    const salt = genSaltSync(SALT_ROUNDS);
    const passwordHash = hashSync(password, salt);
    return passwordHash;
  }

  public comparePassword(password: string): boolean {
    return compareSync(password, this.passwordHash);
  }

  public get getDataUser(): string {
    return this.email
  }
}
