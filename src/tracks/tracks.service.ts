import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dtos/create-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<Track>,
  ) {}

  async create(dto: CreateTrackDto) {
    const user = await this.trackModel.create(dto);

    return user;
  }

  async findById(id: string) {
    return this.trackModel.findById(id);
  }

  async findAll() {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async find(brand: string) {
    const tracks = this.trackModel.find({ brand: brand });
    return tracks;
  }

  async update(id: string, attrs: Partial<Track>) {
    const user = await this.trackModel.findById(id);
    if (!user) {
      throw new NotFoundException('Автомобіль не знайдено');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.trackModel.findById(id);
    if (!user) {
      throw new NotFoundException('Автомобіль не знайдено');
    }
    await user.deleteOne();
  }
}
