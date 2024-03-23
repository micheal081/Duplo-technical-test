import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BeeceptorService } from './beeceptor.service';
import { NewTaxDto } from './dto/tax-dto';

@ApiTags('beeceptor')
@Controller('beeceptor')
export class BeeceptorController {
  constructor(private readonly beeceptorService: BeeceptorService) {}

  @Post('addNewTax')
  addNewTax(@Body() payload: NewTaxDto) {
    return this.beeceptorService.logTax(payload);
  }
}
