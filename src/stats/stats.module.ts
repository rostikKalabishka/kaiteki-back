import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { FlightModule } from 'src/flight/flight.module';

@Module({
  imports: [FlightModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
