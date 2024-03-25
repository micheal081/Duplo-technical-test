import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const match = await argon2.verify(hashedPassword, plainPassword);
    return match;
  }
}
