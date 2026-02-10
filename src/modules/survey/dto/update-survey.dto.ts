import {PartialType} from '@nestjs/swagger';
import {CreateSurveyDto} from './create-survey.dto';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
  //Gambiarra para o funcionar o updateDTO
  questions?: any[];
}
