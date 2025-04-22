import {PartialType} from '@nestjs/swagger';
import {CreateIcfDto} from './create-survey.dto';

export class UpdateIcfDto extends PartialType(CreateIcfDto) {}
