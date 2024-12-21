import {ClassConstructor, plainToInstance} from 'class-transformer';
import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Types} from 'mongoose';

import {DataConnection, DataConnectionRebbitMQ} from '@project/typs';
import {
  VALUE_YOU_TUBE,
  REGULAR_FOR_ENG
} from '@project/consts';
import {Tag} from '@project/enum';


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

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port}: DataConnectionRebbitMQ): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export const filterTags = (value: string[]) => {
  if(!value || value.length === 0) {
    return value
  }
  const tagsList = value.map((value) => value.toLowerCase());
  const _tagsList = tagsList.filter((value, index, array) => array.indexOf(value) === index)
  return _tagsList
}

@ValidatorConstraint({ name: 'idUser', async: false })
export class ValidationIdUser implements ValidatorConstraintInterface {
  validate(idUser: string) {
    if (!Types.ObjectId.isValid(idUser)) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'name', async: false })
export class ValidationName implements ValidatorConstraintInterface {
  validate(name: string) {
    if (!(name.split(' ').length === 2)) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'videoLink', async: false })
export class ValidationVideoLink implements ValidatorConstraintInterface {
  validate(link: string) {
    const value = link.split('/')
    if (!(value[2] === VALUE_YOU_TUBE)) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'tagsList', async: false })
export class ValidationTagsList implements ValidatorConstraintInterface {
  validate(tags: string[]) {
    if (!(tags.length <= Tag.TagsList)) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'space', async: false })
export class ValidationSpace implements ValidatorConstraintInterface {
  validate(tags: string[]) {
    let isValue = true
    tags.forEach((value) => {
      if(!(value.split('').indexOf(Tag.Space) === -1)) {
        isValue = false
        return
      }
    })

    return isValue
  }
}

@ValidatorConstraint({ name: 'letter', async: false })
export class ValidationLetter implements ValidatorConstraintInterface {
  validate(tags: string[]) {
    let isValue = true;
    tags.forEach((value) => {
      if(!(REGULAR_FOR_ENG.test(value))) {
        isValue = false
        return
      }
    })
    return isValue
  }
}

@ValidatorConstraint({ name: 'tagLength', async: false })
export class ValidationTagLength implements ValidatorConstraintInterface {
  validate(tags: string[]) {
    let isValue = true;
    tags.forEach((value) => {
      const tag = value.split('').length;
      if(!(tag >= Tag.MinTagLength || tag <= Tag.MaxTagLength)) {
        isValue = false
        return
      }
    })
    return isValue
  }
}
