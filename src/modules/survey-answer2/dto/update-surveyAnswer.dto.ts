/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {PartialType} from '@nestjs/swagger';
import {CreateSurveyAnswerDto} from './create-surveyAnswer.dto';

export class UpdateSurveyAnswerDto extends PartialType(CreateSurveyAnswerDto) {}
