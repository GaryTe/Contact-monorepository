import {ClassConstructor, plainToInstance} from 'class-transformer';

import {DataConnection} from '@project/typs';

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port
}: DataConnection): string {
  return `mongodb://${username}:${password}@${host}:${port}/`;
}
