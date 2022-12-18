import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['nice-moth-11762-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'bmljZS1tb3RoLTExNzYyJBcXzsaMgc8DAHyQkb6T1S8nLFIcyLEOk7pV5PeM8hc',
          password:
            'HECqnsiA1YpI2ypPeVWEdF9LcwD6rdxevYRZiEkUd_0ehhwEoKyxt32VfSCvkJWrmh2yNA==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
