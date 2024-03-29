import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

import { sanitize } from 'src/utils/sanitize';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { PageMetaDto } from 'src/pagination/dtos/page-meta.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { getSorter, normalizeFilters } from 'src/utils';
import { UserFilterDto } from './dtos/user-filter.dto';
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
    return (await this.userModel.findById(id)).populate('role');
  }
  async find(email: string) {
    return (await this.userModel.findOne({ email: email }))?.populate('role');
  }

  async findAllDrivers(
    pageOptions: PageOptionsDto,
    userFilterDto: UserFilterDto,
  ) {
    const skip = pageOptions.size * (pageOptions.page - 1);

    const sort = getSorter(userFilterDto);

    const resPerPage = pageOptions.size;
    const count = (
      await this.userModel.find({ role: '65dcbcfe52b7e537befdca30' })
    ).length;

    const normalizedFilters = normalizeFilters(userFilterDto);

    const users = (
      await this.userModel
        .find({ role: '65dcbcfe52b7e537befdca30', ...normalizedFilters })
        .populate('role')
        .sort(sort)
        .limit(resPerPage)
        .skip(skip)
    ).map((user) => sanitize(user));

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(users, pageMetaDto);
  }

  async findAll(pageOptions: PageOptionsDto, userFilterDto: UserFilterDto) {
    const skip = pageOptions.size * (pageOptions.page - 1);

    const sort = getSorter(userFilterDto);

    const resPerPage = pageOptions.size;
    const count = (await this.userModel.find()).length;

    const users = (
      await this.userModel.find().sort(sort).limit(resPerPage).skip(skip)
    ).map((user) => sanitize(user));

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(users, pageMetaDto);
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    Object.assign(user, attrs);
    return sanitize(await user.save());
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    await user.deleteOne();
  }

  async deleteMany(ids: string[]) {
    await this.userModel.deleteMany({ _id: { $in: ids } });
  }
}
