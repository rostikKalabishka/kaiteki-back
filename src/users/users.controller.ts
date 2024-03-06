import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { sanitize } from 'src/utils/sanitize';
import { PageOptionsDto } from 'src/pagination/dtos/page-options.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  findAllUsers(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() userFilterDto: UserFilterDto,
  ) {
    return this.userService.findAll(pageOptionsDto, userFilterDto);
  }

  @UseGuards(AdminGuard)
  @Get('/drivers')
  findAllDrivers(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() userFilterDto: UserFilterDto,
  ) {
    return this.userService.findAllDrivers(pageOptionsDto, userFilterDto);
  }

  @UseGuards(AdminGuard)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return sanitize(user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete()
  removeTrack(@Query('ids') id: string[]) {
    return this.userService.deleteMany(id);
  }
}
