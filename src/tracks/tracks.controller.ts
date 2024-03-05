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
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { CreateTrackDto } from './dtos/create-track.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { CarFilterDto } from './dtos/car-filter.dto';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private trackService: TracksService) {}
  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }
  @Get('/make-all')
  getAllMake() {
    return this.trackService.getAllMakeCar();
  }
  @UseGuards(AdminGuard)
  @Get('/:id')
  findTrack(@Param('id') id: string) {
    return this.trackService.findById(id);
  }
  @UseGuards(AdminGuard)
  @Get()
  findAllTracks(@Query() carFilterDto: CarFilterDto) {
    return this.trackService.findAll(carFilterDto);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    return this.trackService.update(id, body);
  }
  @UseGuards(AdminGuard)
  @Delete()
  removeTrack(@Query('ids') id: string[]) {
    return this.trackService.deleteMany(id);
  }
}
