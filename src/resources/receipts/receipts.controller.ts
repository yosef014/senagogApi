import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post('save-receipt')
  saveReceipt(@Body() body, @Req() req) {
    return this.receiptsService.saveReceipt(body, req);
  }

  @Get('get-receipts')
  getReceipts(@Query() data, @Req() req) {
    return this.receiptsService.getReceipts(data, req);
  }

  @Get('get-receipt')
  getReceipt(@Query() data) {
    return this.receiptsService.getReceipt(data);
  }


  @Delete('remove-receipt')
  removeReceipt(@Query() data) {
    return this.receiptsService.removeReceipt(data);
  }
}
