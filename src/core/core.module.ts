import { CacheInterceptor, ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { CacheModule } from '@/config/cache/cache.module';
import { ExceptionsFilter } from '@/core/exceptions/exceptions.filter';
import { LogInterceptor } from '@/core/interceptors/log.interceptor';

@Module({
  imports: [CacheModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class CoreModule {}
