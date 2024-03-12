import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { StatsFilterDto } from './dto/stats-filter.dto';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @UseGuards(AdminGuard)
  @Get()
  findAll(@Query() statsFilterDto: StatsFilterDto) {
    return this.statsService.getStats(statsFilterDto);
  }
}
