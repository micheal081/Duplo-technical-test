import { Module } from '@nestjs/common';

import { MongoPrismaService } from './mongo-prisma.service';
import { PostgresPrismaService } from './postgres-prisma.service';

@Module({
  providers: [PostgresPrismaService, MongoPrismaService],
  exports: [PostgresPrismaService, MongoPrismaService],
})
export class DatabaseModule {}
