import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { Query } from 'express-serve-static-core';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = (await this.userModel.create(dto)).populate('role');

    return user;
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
  async find(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async findAll(query: Query) {
    const resPerPage = Number(query.size) || 5;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return this.userModel.find().limit(resPerPage).skip(skip);
  }
  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    await user.deleteOne();
  }
}
