import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dtos/create-track.dto';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { PageMetaDto } from 'src/pagination/dtos/page-meta.dto';

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

  async findAll(pageOptions: PageOptionsDto) {
    const skip = pageOptions.size * (pageOptions.page - 1);

    const resPerPage = pageOptions.size;

    const count = (await this.trackModel.find()).length;
    console.log(count);

    const tracks = await this.trackModel.find().limit(resPerPage).skip(skip);
    console.log(tracks);
    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(tracks, pageMetaDto);
  }

  async find(carModel: string) {
    const tracks = this.trackModel.find({ carModel: carModel });
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
