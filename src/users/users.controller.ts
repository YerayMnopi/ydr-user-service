import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'ydr-nest-common';
import { UserCreatePayload } from './user-create.payload';
import { UserResponse } from './user-response';
import { Request } from 'express';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() request: Request): Promise<UserResponse> {
    const user: Partial<UserResponse> = request.user;
    return this.usersService.findOne(user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userToCreate: UserCreatePayload): Promise<UserResponse> {
    return this.usersService.create(userToCreate);
  }

  /*
  @Post('validate/:userId')
  async validate(@Param() userId, @Body() userValidationToken): Promise<UserResponse> {
    return this.usersService.validate(userId, userValidationToken);
  }*/


}
