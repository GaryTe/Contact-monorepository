import {HttpException, HttpStatus} from '@nestjs/common'
import { Request } from 'express';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';

import { TokenPayload } from '@project/typs';

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

export class ParseAccessToken {
  constructor(private readonly accessSecret: string) {}

  public async execute(req: Request): Promise<boolean> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      throw new HttpException(
        'Provide a header Authorization with a token',
         HttpStatus.BAD_REQUEST,
         {
           cause: {
             where: 'parse-access-token.ts',
             line: '23'
           }
         }
       );
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.accessSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.headers['tokenPayload'] = [payload.id, payload.name, payload.email]
        return true;
      } else {
        throw new Error('Bad accessToken');
      }
    } catch {
      throw new HttpException(
        'Invalid accessToken',
         HttpStatus.UNAUTHORIZED,
         {
           cause: {
             where: 'parse-access-token.ts',
             line: '47'
           }
         }
       );
    }
  }
}
