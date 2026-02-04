import { ApiProperty } from '@nestjs/swagger';

export class TaskExecutionDetailsDto {
  @ApiProperty()
  userTaskId: string;

  @ApiProperty()
  taskId: string;

  @ApiProperty()
  taskTitle: string;

  @ApiProperty()
  taskType: string;

  @ApiProperty({ description: 'Total execution time in milliseconds' })
  executionTime: number;

  @ApiProperty({ required: false })
  searchDetails?: SearchTaskDetailsDto;

  @ApiProperty({ required: false })
  llmDetails?: LlmTaskDetailsDto;
}

export class SearchTaskDetailsDto {
  @ApiProperty({ description: 'Number of unique resources accessed' })
  resourcesAccessedDepth: number;

  @ApiProperty({ description: 'Number of search queries performed' })
  queriesCount: number;

  @ApiProperty({ type: 'array', description: 'Visited resources details' })
  resources: ResourceAccessDto[];
}

export class ResourceAccessDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;

  @ApiProperty({ description: 'Time spent on resource in milliseconds' })
  timeSpent: number;

  @ApiProperty()
  visitTime: Date;
}

export class LlmTaskDetailsDto {
  @ApiProperty({ description: 'Total messages (user + model)' })
  totalMessages: number;

  @ApiProperty({ description: 'Number of user prompts' })
  promptsCount: number;
}
