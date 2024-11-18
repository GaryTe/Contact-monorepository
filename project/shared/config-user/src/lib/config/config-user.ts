import {Injectable, Logger} from '@nestjs/common';
import { config } from 'dotenv';

import { Config } from './config-user.interface';
import { ConfigSchema, configSchemaUser } from './config-schema-user';
import {PATH_ENV} from '@project/consts';

@Injectable()
export class UserConfig implements Config<ConfigSchema> {
  private readonly logger = new Logger(UserConfig.name);
  private readonly config: ConfigSchema;

  constructor() {
    const parsedOutput = config({path: PATH_ENV});

    if (parsedOutput.error) {
         throw new Error(
          `where: project/shared/config-user/src/lib/config/config-user.ts
           mistake: Cant not read .env file. Perhaps the file does not exists.
           line: 17`
         )
    }

    configSchemaUser.load({});
    configSchemaUser.validate({ allowed: 'strict' });

    this.config = configSchemaUser.getProperties();
    this.logger.log('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
