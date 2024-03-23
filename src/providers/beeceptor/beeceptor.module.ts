import { Module } from '@nestjs/common';

import { BeeceptorController } from './beeceptor.controller';
import { BeeceptorService } from './beeceptor.service';

import { HttpModule } from '@/resources/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [BeeceptorService],
  controllers: [BeeceptorController],
})
export class BeeceptorModule {}
