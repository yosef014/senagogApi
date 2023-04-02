import { PartialType } from '@nestjs/mapped-types';
import { CreateSenagogDto } from './create-senagog.dto';

export class UpdateSenagogDto extends PartialType(CreateSenagogDto) {}
