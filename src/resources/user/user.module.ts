import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { DatabaseModule } from '@/database/database.module';
import { HashModule } from '@/providers/hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
