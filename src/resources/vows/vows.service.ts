import { Injectable } from '@nestjs/common';
import { CreateVowDto } from './dto/create-vow.dto';
import { UpdateVowDto } from './dto/update-vow.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";

@Injectable()
export class VowsService {
  saveVow(body) {
    try {
      const { customer_id, price, description, name} = body


    } catch (e) {
      new ErrorHandler(e, 'save-vow-error')
    }
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
