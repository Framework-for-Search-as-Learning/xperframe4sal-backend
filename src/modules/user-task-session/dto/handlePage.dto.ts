import { ApiProperty } from '@nestjs/swagger';

export class HandlePageDto {
  @ApiProperty({ description: 'Visited URL', example: 'https://example.com/article' })
  url: string;

  @ApiProperty({ description: 'Page title', example: 'Example Article' })
  title: string;
}
