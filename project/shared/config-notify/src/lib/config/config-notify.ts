import {Injectable, Logger} from '@nestjs/common';
import { config } from 'dotenv';

import { Config } from '@project/config-user';
import { ConfigSchema, configSchemaNotify } from './config-schema-notify';
import {PATH_ENV_NOTIFY} from '@project/consts';

@Injectable()
export class NotifyConfig implements Config<ConfigSchema> {
  private readonly logger = new Logger(NotifyConfig.name);
  private readonly config: ConfigSchema;

  constructor() {
    const parsedOutput = config({path: PATH_ENV_NOTIFY});

    if (parsedOutput.error) {
         throw new Error(
          `where: project/shared/config-notify/src/lib/config/config-notify.ts
           mistake: Cant not read .env file. Perhaps the file does not exists.
           line: 17`
         )
    }

    configSchemaNotify.load({});
    configSchemaNotify.validate({ allowed: 'strict' });

    this.config = configSchemaNotify.getProperties();
    this.logger.log('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}
