import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('save-customer')
  saveCustomer(@Body() body, @Req() req) {
    return this.customersService.saveCustomer(body, req);
  }

  @Get('get-customers')
  getCustomers(@Query() data, @Req() req) {
    return this.customersService.getCustomers(data, req);
  }
  @Get('get-customer')
  getCustomer(@Query() data, @Req() req) {
    return this.customersService.getCustomer(data, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
