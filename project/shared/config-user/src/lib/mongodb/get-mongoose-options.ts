import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/helpers';
import {ConfigUserModule} from '../config/config-user.module';
import {UserConfig} from '../config/config-user';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigUserModule],
    useFactory: async (config: UserConfig) => {
      return {
        uri: getMongoConnectionString({
          username: config.get('MONGO_USER'),
          password: config.get('MONGO_PASSWORD'),
          host: config.get('MONGO_HOST'),
          port: config.get('MONGO_PORT'),
          databaseName: config.get('MONGO_DB'),
          authDatabase: config.get('MONGO_USER')
        })
      }
    },
    inject: [UserConfig]
  }
}
