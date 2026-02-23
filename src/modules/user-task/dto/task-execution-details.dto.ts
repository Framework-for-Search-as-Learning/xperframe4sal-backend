/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class TaskExecutionDetailsDto {
  @ApiProperty()
  userTaskId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  userEmail: string;

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
  @ApiProperty({ description: 'Total number of resources accessed across all queries' })
  resourcesAccessedTotal: number;

  @ApiProperty({ description: 'Number of search queries performed' })
  queriesCount: number;

  @ApiProperty({ type: 'array', description: 'Queries with their resources' })
  queries: SearchQueryWithResourcesDto[];
}

export class SearchQueryWithResourcesDto {
  @ApiProperty()
  query: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  serpNumber: number;

  @ApiProperty({ description: 'Number of resources accessed for this query' })
  resourcesAccessedCount: number;

  @ApiProperty({ type: 'array', description: 'Visited resources for this query' })
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

  @ApiProperty({ type: 'array', description: 'Messages exchanged with the model' })
  messages: {
    content: string;
    role: 'user' | 'model';
    createdAt: Date;
  }[];

  @ApiProperty({ description: 'Total messages (user + model)' })
  totalMessages: number;

  @ApiProperty({ description: 'Number of user prompts' })
  promptsCount: number;
}
