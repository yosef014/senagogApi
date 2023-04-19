import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
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

  @Get('get-vows')
  getVows(@Query() data) {
    return this.vowsService.getVows(data);
  }

  @Get('get-vow')
  getVow(@Query() data) {
    return this.vowsService.getVow(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vowsService.remove(+id);
  }
}
