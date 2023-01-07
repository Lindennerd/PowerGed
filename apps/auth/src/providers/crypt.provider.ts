import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptProvider {
  private readonly salt = parseInt(process.env.saltOrRounds);

  encrypt(data: string): Promise<string> {
    return bcrypt.hash(data, this.salt);
  }

  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
