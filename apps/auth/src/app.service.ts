import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'shared.types/interfaces';
import { CryptProvider } from './providers/crypt.provider';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private crypt: CryptProvider,
  ) {}

  async create(user: UserInterface): Promise<UserDocument> {
    try {
      const data = {
        ...user,
        password: await this.crypt.encrypt(user.password),
      };

      const User = new this.userModel(data);
      return await User.save();
    } catch (err) {
      console.error(err);
    }
  }

  async find(email: string, password: string) {
    try {
      return await this.userModel.findOne({ email, password }).exec();
    } catch (err) {
      console.error(err);
    }
  }
}
