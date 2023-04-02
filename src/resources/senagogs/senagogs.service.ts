import { Injectable } from '@nestjs/common';
import { CreateSenagogDto } from './dto/create-senagog.dto';
import { UpdateSenagogDto } from './dto/update-senagog.dto';

@Injectable()
export class SenagogsService {
  create(createSenagogDto: CreateSenagogDto) {
    return 'This action adds a new senagog';
  }

  findAll() {
    return `This action returns all senagogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} senagog`;
  }

  update(id: number, updateSenagogDto: UpdateSenagogDto) {
    return `This action updates a #${id} senagog`;
  }

  remove(id: number) {
    return `This action removes a #${id} senagog`;
  }
}
