import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/postgres/client';

import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { AccessToken } from './types';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() payload: CreateUserDto): Promise<Partial<User>> {
    return this.userService.register(payload);
  }

  @Post('login')
  login(@Body() payload: LoginUserDto): Promise<AccessToken> {
    return this.userService.login(payload);
  }
}
