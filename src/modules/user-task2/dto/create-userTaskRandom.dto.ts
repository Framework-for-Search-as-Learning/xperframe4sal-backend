import {IsNotEmpty, IsString} from 'class-validator';
import {Task} from 'src/modules/task2/entities/task.entity';

export class CreateUserTaskRandomDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  tasks: Task[];

  /*
  @ApiProperty({type: [String]})
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];
  */
}
