import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post('save-receipt')
  saveReceipt(@Body() body) {
    return this.receiptsService.saveReceipt(body);
  }

  @Get('get-receipts')
  getReceipts(@Query() data) {
    return this.receiptsService.getReceipts(data);
  }

  @Get('get-receipt')
  getReceipt(@Query() data) {
    return this.receiptsService.getReceipt(data);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(+id);
  }
}
