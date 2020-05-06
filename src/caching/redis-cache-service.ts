import { Injectable, OnModuleInit } from "@nestjs/common"
import IORedis = require("ioredis")
import { RedisCacheConfigurationMapper } from "./redis-cache-configuration-mapper"
import { useIoRedisAdapter } from 'type-cacheable';

/*
This is where we setup the typecacheable store. We use Nest's OnModuleInit
interface to have the setup run immediately.
This allows us to stop application start if there is a problem
configuring our redis instance.
*/
@Injectable()
export class RedisCacheService implements OnModuleInit {
  private redisInstance: IORedis.Redis | undefined

  public async onModuleInit(): Promise<void> {
    try {
      if (this.isAlreadyConfigured()) {
        return
      }

      this.redisInstance = new IORedis(RedisCacheConfigurationMapper.map())
      // we set up error events. Note that we don't want to
      // stop the application on connection errors. We don't want the lack
      // of a working cache to break our application. You need to think
      // about if this is the correct approach for your application.
      this.redisInstance.on('error', (e: Error) => {
        this.handleError(e)
      })
      // This is where we configure type cachable to use this redis instance
      useIoRedisAdapter(this.redisInstance)
      // and finally we open the connection
      await this.redisInstance?.connect()
    } catch (e) {
      this.handleError(e as Error)
    }
  }

  private handleError(e: Error): void {
    console.error('Could not connect to Redis cache instance', e)
  }

  private isAlreadyConfigured(): boolean {
    return this.redisInstance !== undefined
  }
}