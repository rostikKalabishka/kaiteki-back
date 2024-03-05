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
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TrailersService } from './trailers.service';
import { CreateTrailerDto } from './dtos/create-trailer.dto';
import { UpdateTrailerDto } from './dtos/update-trailer.dto';

import { TrailerFilterDto } from './dtos/trailer-filter.dto';

@Controller('trailer')
@UseGuards(JwtAuthGuard)
export class TrailersController {
  constructor(private trailerService: TrailersService) {}
  @Post()
  createTrack(@Body() body: CreateTrailerDto) {
    return this.trailerService.create(body);
  }

  @UseGuards(AdminGuard)
  @Get('/:id')
  findTrack(@Param('id') id: string) {
    return this.trailerService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAllTracks(@Query() trailerFilterDto: TrailerFilterDto) {
    return this.trailerService.findAll(trailerFilterDto);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrailerDto) {
    return this.trailerService.update(id, body);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  removeTrack(@Param('id') id: string) {
    return this.trailerService.remove(id);
  }
}
