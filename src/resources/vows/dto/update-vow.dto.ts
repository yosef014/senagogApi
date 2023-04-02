import { PartialType } from '@nestjs/mapped-types';
import { CreateVowDto } from './create-vow.dto';

export class UpdateVowDto extends PartialType(CreateVowDto) {}
