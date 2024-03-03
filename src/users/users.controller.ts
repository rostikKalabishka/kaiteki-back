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
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(AdminGuard)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return sanitize(user);
  }
  @UseGuards(AdminGuard)
  @Get('')
  findAllUsers(@Query() pageOptionsDto: PageOptionsDto) {
    return this.userService.findAll(pageOptionsDto);
  }
  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
