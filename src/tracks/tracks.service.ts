import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dtos/create-track.dto';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { PageMetaDto } from 'src/pagination/dtos/page-meta.dto';
import { CarFilterDto } from './dtos/car-filter.dto';
import { getSorter, normalizeFilters } from 'src/utils';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<TrackDocument>,
  ) {}

  async create(dto: CreateTrackDto) {
    const user = await this.trackModel.create(dto);

    return user;
  }

  async findById(id: string) {
    return this.trackModel.findById(id);
  }

  async findAll(carFilterDto: CarFilterDto, pageOptions: PageOptionsDto) {
    const skip = pageOptions.size * (pageOptions.page - 1);

    const sort = getSorter(carFilterDto);

    const resPerPage = pageOptions.size;

    const count = (await this.trackModel.find()).length;
    const normalizedFilters = normalizeFilters(carFilterDto);

    const tracks = await this.trackModel
      .find({ ...normalizedFilters })
      .sort(sort)
      .limit(resPerPage)
      .skip(skip);

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(tracks, pageMetaDto);
  }

  async getAllMakeCar() {
    const track = await this.trackModel.find();

    const make = track.map((car) => car.make);
    const setMake = new Set(make);

    return Array.from(setMake);
  }

  async find(carModel: string) {
    const tracks = await this.trackModel.find({ carModel: carModel });
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

  async deleteMany(ids: string[]) {
    await this.trackModel.deleteMany({ _id: { $in: ids } });
  }
}
