import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VowsService } from './vows.service';
import { CreateVowDto } from './dto/create-vow.dto';
import { UpdateVowDto } from './dto/update-vow.dto';

@Controller('vows')
export class VowsController {
  constructor(private readonly vowsService: VowsService) {}

  @Post('save-vow')
  saveVow(@Body() body) {
    return this.vowsService.saveVow(body);
  }

  @Get()
  findAll() {
    return this.vowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vowsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVowDto: UpdateVowDto) {
    return this.vowsService.update(+id, updateVowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vowsService.remove(+id);
  }
}
