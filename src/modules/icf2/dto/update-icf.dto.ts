import {PartialType} from '@nestjs/swagger';
import {CreateIcfDto} from './create-icf.dto';

export class UpdateIcfDto extends PartialType(CreateIcfDto) {}
