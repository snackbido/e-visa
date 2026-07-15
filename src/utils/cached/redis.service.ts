import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private readonly redisOptions: RedisOptions;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.getOrThrow<string>('REDIS_HOST');
    const port = Number(this.configService.getOrThrow<string>('REDIS_PORT'));

    if (Number.isNaN(port)) {
      throw new Error('REDIS_PORT phải là một số hợp lệ');
    }

    this.redisOptions = {
      host,
      port,
      username: this.configService.get<string>('REDIS_USERNAME') || 'default',
      password: this.configService.getOrThrow<string>('REDIS_PASSWORD'),

      family: 0,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    };

    this.client = new Redis(this.redisOptions);

    this.client.on('connect', () => {
      this.logger.log('RedisService: Đã kết nối tới Redis');
    });

    this.client.on('ready', () => {
      this.logger.log('RedisService: Redis đã sẵn sàng');
    });

    this.client.on('error', (error: Error) => {
      this.logger.error(`Lỗi kết nối Redis: ${error.message}`);
    });

    this.client.on('close', () => {
      this.logger.warn('RedisService: Kết nối Redis đã đóng');
    });

    this.client.on('reconnecting', () => {
      this.logger.warn('RedisService: Đang kết nối lại Redis');
    });
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

      family: 0,
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
    };
  }

  createBullClient(
    type: 'client' | 'subscriber' | 'bclient',
    bullOptions?: Partial<RedisOptions>,
  ): Redis {
    if (type === 'client') {
      return this.client;
    }

    const options: RedisOptions = {
      ...this.getBullRedisOptions(),
      ...bullOptions,
    };

    return new Redis(options);
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Đóng kết nối Redis...');

    if (this.client.status !== 'end') {
      await this.client.quit();
    }
  }

  async blacklistToken(token: string, ttl: number): Promise<void> {
    await this.client.setex(`token:${token}`, ttl, 'true');
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.client.get(`token:${token}`);
    return result === 'true';
  }
}
