import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './strategies/jwt-payload.interface';
import { JwtToken } from './strategies/jwt-token.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(payload: JwtPayload): JwtToken {
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  public async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = await Promise.resolve(this.jwtService.verify(token));
      return decoded as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
