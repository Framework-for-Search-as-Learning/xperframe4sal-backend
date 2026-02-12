/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ForgotPasswordDto,
  GetRecoveryPasswordDto,
  GetUserDto,
  ResetPasswordDto,
} from 'src/modules/user/dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password recovery' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Recovery email sent if user exists.' })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    try {
      await this._userService.forgotPassword(forgotPasswordDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset a user’s password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid token or expired.' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    try {
      await this._userService.resetPassword(resetPasswordDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    try {
      createUserDto.name = createUserDto.name.trim();
      createUserDto.lastName = createUserDto.lastName.trim();
      createUserDto.email = createUserDto.email.trim();
      const userDto = await this._userService.create(createUserDto);
      return {
        id: userDto._id,
        name: userDto.name,
        lastName: userDto.lastName,
        email: userDto.email,
        researcher: userDto.researcher,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth('jwt')
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter users by email',
  })
  @ApiResponse({ status: 200, description: 'List of users or a single user when filtered by email.' })
  async findAll(
    @Query('email') email: string,
  ): Promise<
    | GetUserDto[]
    | GetUserDto
    | { data?: any; error?: string; statusCode?: number }
  > {
    if (email) {
      try {
        const user = await this._userService.findOneByEmail(email);
        return {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          researcher: user.researcher,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return { error: 'User not found', statusCode: 404 };
        } else {
          throw error;
        }
      }
    }
    try {
      const users = await this._userService.findAll();
      return users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          researcher: user.researcher,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiBearerAuth('jwt')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User details.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this._userService.findOne(id);
    return {
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      researcher: user.researcher,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "Update a user's data" })
  @ApiBearerAuth('jwt')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const userDto = await this._userService.update(id, updateUserDto);
    return {
      id: userDto._id,
      name: userDto.name,
      lastName: userDto.lastName,
      email: userDto.email,
      researcher: userDto.researcher,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a user' })
  @ApiBearerAuth('jwt')
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  async remove(@Param('id') id: string) {
    return await this._userService.remove(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Add password recovery token' })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'User email to send the token',
  })
  @ApiResponse({ status: 200, description: 'Recovery token created and stored.' })
  async addChangesPasswordToken(
    @Query('email') email: string,
  ): Promise<GetRecoveryPasswordDto> {
    const user = await this._userService.addChangesPasswordToken(email);
    return {
      id: user._id,
      recoveryPasswordToken: user.recoveryPasswordToken,
      recoveryPasswordTokenExpirationDate:
        user.recoveryPasswordTokenExpirationDate,
    };
  }
}
