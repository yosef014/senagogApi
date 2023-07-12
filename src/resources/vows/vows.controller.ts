import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { VowsService } from './vows.service';


@Controller('vows')
export class VowsController {
  constructor(private readonly vowsService: VowsService) {}

  @Post('save-vow')
  saveVow(@Body() body, @Req() req) {
    return this.vowsService.saveVow(body, req);
  }

  @Get('get-vows')
  getVows(@Query() data, @Req() req) {
    return this.vowsService.getVows(data, req);
  }

  @Get('get-vow')
  getVow(@Query() data) {
    return this.vowsService.getVow(data);
  }

  @Delete('remove-vow')
  removeVow(@Query() data) {
    return this.vowsService.removeVow(data);
  }
}
