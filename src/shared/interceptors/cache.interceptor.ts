import { Injectable, CacheInterceptor, ExecutionContext } from "@nestjs/common";

@Injectable()
class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    return 'key';
  }
}
