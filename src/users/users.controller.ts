import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './dtos/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // =============> CRUD <==============

  @Get()
  getAllUsers() {
    return this.usersService.findAll1();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(+id, updateUserDto);
  }
}
