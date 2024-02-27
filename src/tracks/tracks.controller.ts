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

@Controller('track')
@UseGuards(JwtAuthGuard)
@UseGuards(AdminGuard)
export class TracksController {
  constructor(private trackService: TracksService) {}
  @Post()
  createTrack(@Body() body: CreateTrackDto) {
    return this.trackService.create(body);
  }

  @Get('/:id')
  findTrack(@Param('id') id: string) {
    return this.trackService.findById(id);
  }

  @Get()
  findAllTracks(@Query('brand') brand: string) {
    return this.trackService.find(brand);
  }

  @Patch('/:id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    return this.trackService.update(id, body);
  }
  @Delete('/:id')
  removeTrack(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
