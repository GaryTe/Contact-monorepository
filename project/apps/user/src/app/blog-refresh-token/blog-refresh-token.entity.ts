import {TokenPayload} from '@project/typs';

export class BlogRefreshToken {
  private idUser: string;
  private refreshToken: string;
  private expiration: string;

  constructor(data: TokenPayload) {
    this.populate(data)
  }

  private populate(data: TokenPayload): void {
    this.idUser = data.id;
    this.refreshToken = data.refreshToken;
    this.expiration = data.expiration;
  }

  public get getDataRefreshToken(): {
    idUser: string;
    refreshToken: string;
    expiration: string;
  } {
    return {
      idUser: this.idUser,
      refreshToken: this.refreshToken,
      expiration: this.expiration
    }
  }
}
