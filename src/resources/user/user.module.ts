import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { DatabaseModule } from '@/database/database.module';
import { HashModule } from '@/providers/hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
