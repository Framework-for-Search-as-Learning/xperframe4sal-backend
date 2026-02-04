import { ApiProperty } from '@nestjs/swagger';
import { SurveyStatsDto } from 'src/modules/survey2/dto/survey-stats.dto';

export class ExperimentSurveyStatsDto {
  @ApiProperty({ type: [SurveyStatsDto] })
  surveys: SurveyStatsDto[];
}
