import { Module } from '@nestjs/common';

import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';

@Module({
  providers: [CreditService],
  controllers: [CreditController],
})
export class CreditModule {}
