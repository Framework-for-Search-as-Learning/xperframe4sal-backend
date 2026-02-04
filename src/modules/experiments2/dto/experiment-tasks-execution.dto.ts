import { ApiProperty } from '@nestjs/swagger';
import { TaskExecutionDetailsDto } from 'src/modules/user-task2/dto/task-execution-details.dto';

export class ExperimentTaskExecutionDto {
  @ApiProperty()
  taskId: string;

  @ApiProperty()
  taskTitle: string;

  @ApiProperty({ type: [TaskExecutionDetailsDto] })
  executions: TaskExecutionDetailsDto[];
}
