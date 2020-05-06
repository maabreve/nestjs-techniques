import { Injectable } from "@nestjs/common";
import IORedis = require("ioredis");

/*
This class maps env variables to a redis io config object
*/
@Injectable()
export class RedisCacheConfigurationMapper {
  public static map(): IORedis.RedisOptions {
    return {
      lazyConnect: true,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      connectTimeout: Number(process.env.REDIS_TIMEOUT),
      tls: process.env.REDIS_USETLS === 'true' ? {} : undefined,
    }
  }
}