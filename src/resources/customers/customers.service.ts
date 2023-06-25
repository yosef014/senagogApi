import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateCustomerDto } from './dto/update-customer.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";
import { Senagog } from "../senagogs/entities/senagog.entity";
import { Customer } from "./entities/customer.entity";
import { CustomerSenagogPivot } from "./entities/customer-senagog-pivot.entity";

@Injectable()
export class CustomersService {
  async saveCustomer(body, req) {
    try {
      const { first_name, last_name, email, mobile, password, id } = body
      const senagog_id = req.user.senagog_id
      // find senagog
      const senagog = await Senagog.findOne({where: {id: senagog_id}})
      if (!senagog) {
        throw new HttpException('senagog-not-found', HttpStatus.NOT_FOUND)
      }

      // create or update customer
      const customer = await Customer.create({
        id,
        first_name,
        last_name,
        email,
        mobile,
        password
      })?.save()

      // delete and insert new customer_senagog_pivot
      await CustomerSenagogPivot.delete({customer_id: customer.id, senagog_id})
      await CustomerSenagogPivot.create({
        senagog_id: senagog_id,
        customer_id: customer.id
      })?.save()

      delete customer.password
      return customer
    } catch (e) {
      new ErrorHandler(e, 'save-customer-error')
    }
    return true
  }

  async getCustomers(data, req) {
   try {
     const user = req.user
     // const { senagog_id } = data
     const senagog_id = user.senagog_id
     // find senagog
     const senagog = await Senagog.findOne({where: {id: senagog_id}})
     if (!senagog) {
       throw new HttpException('senagog-not-found', HttpStatus.NOT_FOUND)
     }

     const customers = await Customer.createQueryBuilder('c')
       .leftJoinAndMapMany('c.pivot', CustomerSenagogPivot, 'csp','csp.senagog_id = :senagog_id', {senagog_id })
       .where('c.id = csp.customer_id')
       .getMany()

     return customers
   } catch (e) {
     new ErrorHandler(e, 'get-customers-error')
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
