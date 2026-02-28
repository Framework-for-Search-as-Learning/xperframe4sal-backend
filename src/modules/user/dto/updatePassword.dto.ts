import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({description: 'Current password', example: 'OldPassword123'})
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({description: 'New password', example: 'NewStrongPassword123'})
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
