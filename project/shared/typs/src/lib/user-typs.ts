export type DataQueryUser = {
  oldPassword: string;
  newPassword: string;
}

export type DataParamUser = {
  idUser: string
}

export type DataConnection = {
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
  authDatabase: string
}

export type DataConnectionRebbitMQ = {
  host: string;
  password: string;
  user: string;
  port: string;
}

export type DataUser = {
  email: string;
  name: string;
  avatar?: string;
  password?: string;
  passwordHash?: string;
}

export type AccessAndRefreshToken = {
  accessToken: string;
  refreshToken: string;
}

export type TokenPayload = {
  email: string;
  name: string;
  id: string;
  refreshToken?: string;
  expiration?: string;
};
