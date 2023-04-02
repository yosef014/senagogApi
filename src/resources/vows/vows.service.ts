import { Injectable } from '@nestjs/common';
import { CreateVowDto } from './dto/create-vow.dto';
import { UpdateVowDto } from './dto/update-vow.dto';

@Injectable()
export class VowsService {
  create(createVowDto: CreateVowDto) {
    return 'This action adds a new vow';
  }

  findAll() {
    return `This action returns all vows`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vow`;
  }

  update(id: number, updateVowDto: UpdateVowDto) {
    return `This action updates a #${id} vow`;
  }

  remove(id: number) {
    return `This action removes a #${id} vow`;
  }
}
