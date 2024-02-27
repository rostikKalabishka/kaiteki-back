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

@Controller('trailer')
@UseGuards(JwtAuthGuard)
@UseGuards(AdminGuard)
export class TrailersController {
  constructor(private trailerService: TrailersService) {}
  @Post()
  createTrack(@Body() body: CreateTrailerDto) {
    return this.trailerService.create(body);
  }

  @Get('/:id')
  findTrack(@Param('id') id: string) {
    return this.trailerService.findById(id);
  }

  @Get()
  findAllTracks(@Query('type') type: string) {
    return this.trailerService.find(type);
  }

  @Patch('/:id')
  updateTrack(@Param('id') id: string, @Body() body: UpdateTrailerDto) {
    return this.trailerService.update(id, body);
  }
  @Delete('/:id')
  removeTrack(@Param('id') id: string) {
    return this.trailerService.remove(id);
  }
}
