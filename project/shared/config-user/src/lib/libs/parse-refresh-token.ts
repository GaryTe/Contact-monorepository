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

export class ParseRefreshToken {
  constructor(private readonly refreshSecret: string) {}

  public async execute(req: Request): Promise<boolean> {
    const refreshToken = req.headers?.authorization?.split(' ');
    if (!refreshToken) {
      throw new HttpException(
        'Provide a header X-RefreshToken with a token',
         HttpStatus.BAD_REQUEST,
         {
           cause: {
             where: 'parse-refresh-token.ts',
             line: '23'
           }
         }
       );
    }

    const [, token] = refreshToken;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.refreshSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.headers['tokenPayload'] = [payload.id, payload.name, payload.email]
        return true;
      } else {
        throw new Error('Bad refreshToken');
      }
    } catch {
      throw new HttpException(
        'Invalid refreshToken',
         HttpStatus.UNAUTHORIZED,
         {
           cause: {
             where: 'parse-refresh-token.ts',
             line: '45'
           }
         }
       );
    }
  }
}
