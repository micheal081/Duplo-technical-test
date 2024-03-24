import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { ENV } from '@/app.environment';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ENV.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
