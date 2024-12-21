import { NotifyConfig } from '../config/config-notify';
import {ConfigNotifyModule} from '../config/config-notify.module';
import { getRabbitMQConnectionString } from '@project/helpers';

export function getRabbitMQOptions() {
  return {
    imports: [ConfigNotifyModule],
    useFactory: async (config: NotifyConfig) => ({
      exchanges: [
        {
          name: config.get('EXCHANG_NAME'),
          type: config.get('EXCHANG_TYPE')
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.get('RABBITMQ_HOST'),
        password: config.get('RABBITMQ_PASSWORD'),
        user: config.get('RABBITMQ_USER'),
        port: config.get('RABBITMQ_PORT'),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [NotifyConfig]
  }
}
