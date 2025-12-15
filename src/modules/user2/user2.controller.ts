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
import {User2Service} from './user2.service';
import {
  ForgotPasswordDto,
  GetRecoveryPasswordDto,
  GetUserDto,
  ResetPasswordDto,
} from 'src/model/user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiQuery, ApiParam, ApiBody} from '@nestjs/swagger';

@Controller('users2')
export class User2Controller {
  constructor(private readonly _userService: User2Service) {}

  @Post('forgot-password')
  @ApiOperation({summary: 'Request password recovery'})
  @ApiBody({type: ForgotPasswordDto})
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
  @ApiOperation({summary: 'Reset a user’s password'})
  @ApiBody({type: ResetPasswordDto})
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
  @ApiOperation({summary: 'Create a new user'})
  @ApiBody({type: CreateUserDto})
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
  @ApiOperation({summary: 'Get all users'})
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter users by email',
  })
  async findAll(
    @Query('email') email: string,
  ): Promise<
    | GetUserDto[]
    | GetUserDto
    | {data?: any; error?: string; statusCode?: number}
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
          return {error: 'User not found', statusCode: 404};
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
  @ApiOperation({summary: 'Get a user by ID'})
  @ApiParam({name: 'id', type: String, description: 'User ID'})
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
  @ApiOperation({summary: "Update a user's data"})
  @ApiParam({name: 'id', type: String, description: 'User ID'})
  @ApiBody({type: UpdateUserDto})
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
  @ApiOperation({summary: 'Delete a user'})
  @ApiParam({name: 'id', type: String, description: 'User ID'})
  async remove(@Param('id') id: string) {
    return await this._userService.remove(id);
  }

  @Patch()
  @ApiOperation({summary: 'Add password recovery token'})
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'User email to send the token',
  })
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
