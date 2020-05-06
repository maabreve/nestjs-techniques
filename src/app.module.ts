import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { ItemModule } from './modules/item/item.module';
import { GlobalConfig } from './config/global.config';
import { AuthModule } from './modules/auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    // ConfigModule.forRoot({ load: [CONFIG], isGlobal: true }),
    TypeOrmModule.forRoot(GlobalConfig.getTypeOrmConfig()),
    ItemModule,
    AuthModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
