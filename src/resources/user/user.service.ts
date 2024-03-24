import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/postgres/client';

import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/strategies/jwt-payload.interface';

import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { AccessToken } from './types';

import { PostgresPrismaService } from '@/database/postgres-prisma.service';
import { HashService } from '@/providers/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly postgresPrisma: PostgresPrismaService,
    private readonly hash: HashService,
    private readonly authService: AuthService,
  ) {}

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

  async login(loginData: LoginUserDto): Promise<AccessToken> {
    const user = await this.postgresPrisma.user.findUnique({ where: { email: loginData.email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }

    const passwordMatch = await this.hash.comparePasswords(loginData.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload: JwtPayload = { id: user.id };

    const token = this.authService.generateToken(payload);
    return token;
  }
}
