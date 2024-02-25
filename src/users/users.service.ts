import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findById(id: string) {
    return this.userModel.findById(id);
  }
  find(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await user.deleteOne();
  }
}
