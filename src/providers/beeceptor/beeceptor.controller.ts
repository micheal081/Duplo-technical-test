import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BeeceptorService } from './beeceptor.service';
import { NewTaxDto } from './dto/tax-dto';
import { TaxData } from './types';

import { AuthUser, UserContext } from '@/core/decorators/user.decorator';

@ApiTags('Beeceptor')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('beeceptor')
export class BeeceptorController {
  constructor(private readonly beeceptorService: BeeceptorService) {}

  @Post('addNewTax')
  addNewTax(@AuthUser() user: UserContext, @Body() payload: NewTaxDto): Promise<TaxData> {
    return this.beeceptorService.logTax(payload);
  }
}
