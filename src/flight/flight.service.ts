import { Injectable, NotFoundException } from '@nestjs/common';
import { Flight, FlightDocument } from './schemas/flight.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { getSorter, normalizeFilters } from 'src/utils';
import { PageMetaDto } from 'src/pagination/dtos/page-meta.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { FlightFilterDto } from './dtos/flight-filter.dto';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<FlightDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(dto: CreateFlightDto) {
    const flight = (await this.flightModel.create(dto)).populate([
      { path: 'driver', populate: { path: 'role' } },
      'track',
      'trailer',
    ]);

    return flight;
  }

  async getAllCompanies() {
    const flights = await this.flightModel.find();

    const companies = flights.map((flight) => flight.companyName);
    const setCompanies = new Set(companies);

    return Array.from(setCompanies);
  }

  async findById(id: string) {
    return this.flightModel
      .findById(id)
      .populate([
        { path: 'driver', populate: { path: 'role' } },
        'track',
        'trailer',
      ]);
  }

  async find(type: string) {
    const tracks = this.flightModel.find({ type: type });
    return tracks;
  }

  async findAll(flightFilterDto: FlightFilterDto, pageOptions: PageOptionsDto) {
    const skip = pageOptions.size * (pageOptions.page - 1);
    const sort = getSorter(flightFilterDto);

    const resPerPage = pageOptions.size;
    const count = (await this.flightModel.find()).length;
    const normalizedFilters = normalizeFilters(flightFilterDto);

    const trailers = await this.flightModel
      .find({ ...normalizedFilters })
      .populate([
        { path: 'driver', populate: { path: 'role' } },
        'track',
        'trailer',
        'driver',
      ])
      .sort(sort)
      .limit(resPerPage)
      .skip(skip);

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(trailers, pageMetaDto);
  }

  async update(id: string, attrs: Partial<Flight>) {
    const user = await this.flightModel.findById(id);
    if (!user) {
      throw new NotFoundException('Рейс не знайдено');
    }
    Object.assign(user, attrs);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.flightModel.findById(id);
    if (!user) {
      throw new NotFoundException('Рейс не знайдено');
    }
    await user.deleteOne();
  }

  async deleteMany(ids: string[]) {
    await this.flightModel.deleteMany({ _id: { $in: ids } });
  }
}
