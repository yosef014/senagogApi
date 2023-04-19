import { Injectable } from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";
import {Expense} from "./entities/expense.entity";

@Injectable()
export class ExpensesService {
  async saveExpense(body) {
    try {
      const {customer_id, price, description, name, senagog_id} = body
      const expense = await Expense.create({
        customer_id,
        price,
        senagog_id,
        description,
        name
      })?.save()
      return expense
    } catch (e) {
      new ErrorHandler(e, 'save-expense-error')
    }
  }

  async getExpenses(data) {
    try {
      if (data?.filter) {
        data.filter = JSON.parse(data?.filter)
      }
      const {filter} = data
      const expenseQuery = Expense.createQueryBuilder('e')
          .where('e.senagog_id = :senagog_id', { senagog_id: filter?.senagog_id})
      if (filter?.customer_id) {
        expenseQuery.andWhere('e.customer_id = :customer_id',{ customer_id: filter.customer_id })
      }
      const expenses = await expenseQuery.getMany()

      return expenses
    } catch (e) {
      new ErrorHandler(e, 'get-expenses-error')
    }
  }

  async getExpense(data) {
    try {
      const { expense_id } = data
      const expense = await Expense.findOne({where: {id: expense_id }})
      return expense
    } catch (e) {
      new ErrorHandler(e, 'get-expense-error')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
