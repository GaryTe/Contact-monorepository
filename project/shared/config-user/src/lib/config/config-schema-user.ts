import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  MONGO_PORT: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_DB: string;
  MONGO_HOST: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ALGORITHM: string;
  TYP: string;
  JWT_ACCESS_EXPIRED: string
  JWT_REFRESH_EXPIRED: string
}

export const configSchemaUser = convict<ConfigSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 3500
  },
  MONGO_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'MONGO_PORT',
    default: '4500',
  },
  MONGO_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'MONGO_USER',
    default: null,
  },
  MONGO_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'MONGO_PASSWORD',
    default: null,
  },
  MONGO_DB: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'MONGO_DB',
    default: null
  },
  MONGO_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'MONGO_HOST',
    default: null
  },
  JWT_ACCESS_SECRET: {
    doc: 'Secret for sccessToken',
    format: String,
    env: 'JWT_ACCESS_SECRET',
    default: null
  },
  JWT_REFRESH_SECRET: {
    doc: 'Secret for refreshToken',
    format: String,
    env: 'JWT_REFRESH_SECRET',
    default: null
  },
  JWT_ALGORITHM: {
    doc: 'Encryption algorithm for token',
    format: String,
    env: 'JWT_ALGORITHM',
    default: null
  },
  TYP: {
    doc: 'Typ for token',
    format: String,
    env: 'TYP',
    default: null
  },
  JWT_ACCESS_EXPIRED: {
    doc: 'Expiration time for sccessToken',
    format: String,
    env: 'JWT_ACCESS_EXPIRED',
    default: null
  },
  JWT_REFRESH_EXPIRED: {
    doc: 'Expiration time for refreshToken',
    format: String,
    env: 'JWT_REFRESH_EXPIRED',
    default: null
  }
});
