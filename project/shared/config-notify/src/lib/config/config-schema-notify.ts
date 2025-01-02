import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  RABBITMQ_PORT: string,
  RABBITMQ_USER: string,
  RABBITMQ_PASSWORD: string,
  RABBITMQ_HOST: string,
  EXCHANG_NAME: string,
  EXCHANG_TYPE: string,
  SMTP_PORT: string,
  SMTP_FROM: string,
  EXCHANG_PUBLICATION: string,
  EXCHANG_USER: string
}

export const configSchemaNotify = convict<ConfigSchema>({
  RABBITMQ_PORT: {
    doc: 'Port to connect to the RabbitMQ',
    format: 'port',
    env: 'RABBITMQ_PORT',
    default: null
  },
  RABBITMQ_USER: {
    doc: 'Username to connect to the RabbitMQ',
    format: String,
    env: 'RABBITMQ_USER',
    default: null,
  },
  RABBITMQ_PASSWORD: {
    doc: 'Password to connect to the RabbitMQ',
    format: String,
    env: 'RABBITMQ_PASSWORD',
    default: null,
  },
  RABBITMQ_HOST: {
    doc: 'IP address of the server RebbitMq',
    format: 'ipaddress',
    env: 'RABBITMQ_HOST',
    default: null
  },
  EXCHANG_NAME: {
    doc: 'Exchanger name (RabbitMQ)',
    format: String,
    env: 'EXCHANG_NAME',
    default: null
  },
  EXCHANG_TYPE: {
    doc: 'Exchanger type (RabbitMQ)',
    format: String,
    env: 'EXCHANG_TYPE',
    default: null
  },
  SMTP_PORT: {
    doc: 'Port to connect to the SMTP',
    format: 'port',
    env: 'SMTP_PORT',
    default: null
  },
  SMTP_FROM: {
    doc: 'Email address name for SMTP',
    format: String,
    env: 'SMTP_FROM',
    default: null
  },
  EXCHANG_PUBLICATION: {
    doc: 'Exchanger name (RabbitMQ)',
    format: String,
    env: 'EXCHANG_PUBLICATION',
    default: null
  },
  EXCHANG_USER: {
    doc: 'Exchanger name (RabbitMQ)',
    format: String,
    env: 'EXCHANG_USER',
    default: null
  }
});
