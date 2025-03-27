import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserTaskRandomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({type: [String]})
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];
}
