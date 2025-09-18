/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;
  constructor(configService: ConfigService) {
    this.client = new Redis({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      username: 'default',
      password: '1rW8rR7QhIf2b45GCG35XbyW9kpNlXnt',
    });
  }

  getClient(): Redis {
    return this.client;
  }

  onModuleDestroy() {
    return this.client.quit();
  }

  async blacklistToken(token: string, ttl: number) {
    const client = this.getClient();

    await client.setex(`token:${token}`, ttl, 'true');
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const client = this.getClient();
    const result = await client.get(`token:${token}`);

    return result === 'true';
  }
}
