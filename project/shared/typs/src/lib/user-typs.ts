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

export type DataUser = {
  email: string;
  name: string;
  avatar?: string;
  password?: string;
  passwordHash?: string;
}

