import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('save-expense')
  saveExpense(@Body() body) {
    return this.expensesService.saveExpense(body);
  }

  @Get('get-expenses')
  getExpenses(@Query() data) {
    return this.expensesService.getExpenses(data);
  }

  @Get('get-expense')
  getExpense(@Query() data) {
    return this.expensesService.getExpense(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
