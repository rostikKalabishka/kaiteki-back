import { Injectable, NotFoundException } from '@nestjs/common';
import { Trailer } from './schemas/trailer.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrailerDto } from './dtos/create-trailer.dto';

@Injectable()
export class TrailersService {
  constructor(
    @InjectModel(Trailer.name)
    private readonly trailerModel: Model<Trailer>,
  ) {}

  async create(dto: CreateTrailerDto) {
    const user = await this.trailerModel.create(dto);

    return user;
  }

  async findById(id: string) {
    return this.trailerModel.findById(id);
  }
  async find(type: string) {
    const tracks = this.trailerModel.find({ type: type });
    return tracks;
  }

  async update(id: string, attrs: Partial<Trailer>) {
    const user = await this.trailerModel.findById(id);
    if (!user) {
      throw new NotFoundException('track not found');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.trailerModel.findById(id);
    if (!user) {
      throw new NotFoundException('track not found');
    }
    await user.deleteOne();
  }
}
