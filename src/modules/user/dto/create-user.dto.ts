import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'Maria' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Last name', example: 'Silva' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'maria.silva@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Account password', example: 'StrongPassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Whether the user is a researcher', example: false })
  @IsNotEmpty()
  @IsBoolean()
  researcher: boolean;

  //birthDate: Date;
}
