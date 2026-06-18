/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RedisService } from '@visa/utils/cached/redis.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [RedisService],
      useFactory: (redisService: RedisService) => ({
        // For `subscriber` and `bclient` we must not reuse a Redis instance
        // that has `enableReadyCheck` or `maxRetriesPerRequest` set.
        // Create dedicated clients with those options disabled.
        createClient: (type: 'client' | 'subscriber' | 'bclient') => {
          switch (type) {
            case 'client':
              return redisService.getClient();
            case 'subscriber':
            case 'bclient':
            default:
              return redisService.createBullClient(type, {
                enableReadyCheck: false,
                maxRetriesPerRequest: null,
              });
          }
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
