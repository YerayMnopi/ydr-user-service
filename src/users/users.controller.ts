import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('users')
  async create(@Body() userToCreate: User) {
    return this.usersService.create(userToCreate);
  }
}
