import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { FlightService } from './flight.service';
import { FlightFilterDto } from './dtos/flight-filter.dto';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('drives')
@UseGuards(JwtAuthGuard)
export class FlightController {
  constructor(private flightService: FlightService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateFlightDto) {
    return this.flightService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAllFlight(
    @Query() trailerFilterDto: FlightFilterDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.flightService.findAll(trailerFilterDto, pageOptionsDto);
  }
  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateFlight(@Param('id') id: string, @Body() body: UpdateFlightDto) {
    return this.flightService.update(id, body);
  }
  @UseGuards(AdminGuard)
  @Get('/:id')
  findTrack(@Param('id') id: string) {
    return this.flightService.findById(id);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  removeFlight(@Query('ids') id: string[]) {
    return this.flightService.deleteMany(id);
  }
}
