import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import Redis, { RedisOptions } from 'ioredis';

import { RedisService } from '@visa/utils/cached/redis.service';

type BullClientType = 'client' | 'subscriber' | 'bclient';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [RedisService],

      useFactory: (redisService: RedisService) => ({
        createClient: (
          type: BullClientType,
          redisOpts: RedisOptions,
        ): Redis => {
          if (type === 'client') {
            return redisService.getClient();
          }

          return redisService.createBullClient(type, {
            ...redisOpts,

            enableReadyCheck: false,
            maxRetriesPerRequest: null,
          });
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
