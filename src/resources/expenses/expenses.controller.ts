import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('save-expense')
  saveExpense(@Body() body, @Req() req) {
    return this.expensesService.saveExpense(body, req);
  }

  @Get('get-expenses')
  getExpenses(@Query() data, @Req() req) {
    return this.expensesService.getExpenses(data, req);
  }

  @Get('get-expense')
  getExpense(@Query() data) {
    return this.expensesService.getExpense(data);
  }

  @Delete('remove-expense')
  removeExpense(@Query() data) {
    return this.expensesService.removeExpense(data);
  }
}
