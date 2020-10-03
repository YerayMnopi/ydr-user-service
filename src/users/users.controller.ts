import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'ydr-nest-common';
import { UserCreatePayload } from './user-create.payload';
import { UserResponse } from './user-response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userToCreate: UserCreatePayload): Promise<UserResponse> {
    return this.usersService.create(userToCreate);
  }
}
