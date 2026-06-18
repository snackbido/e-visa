import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private readonly redisOptions: RedisOptions;

  constructor(configService: ConfigService) {
    this.redisOptions = {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      username: configService.get<string>('REDIS_USERNAME') || 'default',
      password: configService.get<string>('REDIS_PASSWORD'),
      tls: {
        rejectUnauthorized: false,
      },
      family: 0,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    };

    this.client = new Redis(this.redisOptions);

    this.client.on('connect', () =>
      this.logger.log('RedisService: Đã kết nối Upstash'),
    );
    this.client.on('error', (err) =>
      this.logger.error('Lỗi kết nối Redis:', err.message),
    );
  }

  getClient(): Redis {
    return this.client;
  }

  private getBullRedisOptions(): RedisOptions {
    return {
      host: this.redisOptions.host,
      port: this.redisOptions.port,
      username: this.redisOptions.username,
      password: this.redisOptions.password,
      tls: this.redisOptions.tls,
      family: 0,
    };
  }

  createBullClient(
    type: 'client' | 'subscriber' | 'bclient',
    bullOptions?: Partial<RedisOptions>,
  ): Redis {
    if (type === 'client') {
      return this.client;
    }

    const options = { ...this.getBullRedisOptions(), ...bullOptions };
    return new Redis(options);
  }

  onModuleDestroy() {
    this.logger.log('Đóng tất cả kết nối Redis...');
    return this.client.quit();
  }

  async blacklistToken(token: string, ttl: number) {
    await this.client.setex(`token:${token}`, ttl, 'true');
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.client.get(`token:${token}`);
    return result === 'true';
  }
}
