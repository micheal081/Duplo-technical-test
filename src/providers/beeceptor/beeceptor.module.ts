import { Module } from '@nestjs/common';

import { BeeceptorController } from './beeceptor.controller';
import { BeeceptorService } from './beeceptor.service';

@Module({
  providers: [BeeceptorService],
  controllers: [BeeceptorController],
})
export class BeeceptorModule {}
