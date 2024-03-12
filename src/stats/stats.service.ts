import { Injectable } from '@nestjs/common';
import { FlightService } from 'src/flight/flight.service';
import { StatsFilterDto } from './dto/stats-filter.dto';
import { getRideStats } from 'src/utils';

@Injectable()
export class StatsService {
  constructor(private readonly flightService: FlightService) {}
  async getStats(dto: StatsFilterDto) {
    const flights = await this.flightService.findByMonth(dto.month);

    if (!flights.length) {
      return null;
    }

    const prices = flights.map(getRideStats);

    const totalSpend = prices.reduce((acc, { total }) => acc + total, 0);
    const totalEarn = flights.reduce((acc, { price }) => acc + price, 0);

    return { totalEarn, totalSpend, profit: totalEarn - totalSpend };
  }
}
