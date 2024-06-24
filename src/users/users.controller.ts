// src/users/users.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body(ValidationPipe) userData: any) {
    return this.usersService.createUser(userData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) userData: any) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
