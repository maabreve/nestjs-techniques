import { Controller, Get, CacheKey, CacheTTL } from '@nestjs/common';
import { AppService } from './app.service';

@CacheKey('app')
@CacheTTL(20) @Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
