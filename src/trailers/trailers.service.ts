import { Injectable, NotFoundException } from '@nestjs/common';
import { Trailer } from './schemas/trailer.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTrailerDto } from './dtos/create-trailer.dto';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { PageMetaDto } from 'src/pagination/dtos/page-meta.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { TrailerFilterDto } from './dtos/trailer-filter.dto';
import { getSorter, normalizeFilters } from 'src/utils';

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
  async findAll(
    trailerFilterDto: TrailerFilterDto,
    pageOptions: PageOptionsDto,
  ) {
    const skip = pageOptions.size * (pageOptions.page - 1);
    const sort = getSorter(trailerFilterDto);

    const resPerPage = pageOptions.size;
    const count = (await this.trailerModel.find()).length;
    const normalizedFilters = normalizeFilters(trailerFilterDto);

    const trailers = await this.trailerModel
      .find({ ...normalizedFilters })
      .sort(sort)
      .limit(resPerPage)
      .skip(skip);

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(trailers, pageMetaDto);
  }

  async update(id: string, attrs: Partial<Trailer>) {
    const user = await this.trailerModel.findById(id);
    if (!user) {
      throw new NotFoundException('Прицеп не знайдено');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.trailerModel.findById(id);
    if (!user) {
      throw new NotFoundException('Прицеп не знайдено');
    }
    await user.deleteOne();
  }
}
