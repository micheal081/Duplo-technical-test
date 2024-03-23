import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/postgres/client';

import { CreateUserDto } from './dto/create-user-dto';

import { PostgresPrismaService } from '@/database/postgres-prisma.service';
import { HashService } from '@/providers/hash/hash.service';

@Injectable()
export class UserService {
  constructor(private readonly postgresPrisma: PostgresPrismaService, private readonly hash: HashService) {}

  async register(userData: CreateUserDto): Promise<Partial<User>> {
    const hashedPassword = await this.hash.hashPassword(userData.password);

    const data = {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: hashedPassword,
    };

    return this.postgresPrisma.user
      .create({
        data,
        select: {
          name: true,
          email: true,
          phoneNumber: true,
        },
      })
      .catch((_error) => {
        throw new BadRequestException('User registration failed. Duplicate name or other constraint violation.');
      });
  }
}
