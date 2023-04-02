import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SenagogsService } from './senagogs.service';
import { CreateSenagogDto } from './dto/create-senagog.dto';
import { UpdateSenagogDto } from './dto/update-senagog.dto';

@Controller('senagogs')
export class SenagogsController {
  constructor(private readonly senagogsService: SenagogsService) {}

  @Post()
  create(@Body() createSenagogDto: CreateSenagogDto) {
    return this.senagogsService.create(createSenagogDto);
  }

  @Get()
  findAll() {
    return this.senagogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.senagogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSenagogDto: UpdateSenagogDto) {
    return this.senagogsService.update(+id, updateSenagogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.senagogsService.remove(+id);
  }
}
