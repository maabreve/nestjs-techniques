import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { ItemModule } from './modules/item/item.module';
import { GlobalConfig } from './config/global.config';
import { AuthModule } from './modules/auth/auth.module';
import { swStats } from 'swagger-stats';

@Module({
  imports: [
    // ConfigModule.forRoot({ load: [CONFIG], isGlobal: true }),
    TypeOrmModule.forRoot(GlobalConfig.getTypeOrmConfig()),
    ItemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
