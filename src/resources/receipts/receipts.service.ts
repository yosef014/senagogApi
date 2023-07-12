import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";
import {Vow} from "../vows/entities/vow.entity";
import {Receipt} from "./entities/receipt.entity";

@Injectable()
export class ReceiptsService {
  async saveReceipt(body, req) {
    try {
      const {customer_id, price, description, name, id} = body
      const senagog_id = req.user.senagog_id
      const receipt = await Receipt.create({
        id,
        customer_id,
        price,
        description,
        senagog_id,
        name
      })?.save()
      return receipt
    } catch (e) {
      new ErrorHandler(e, 'save-receipt-error')
    }
  }

  async getReceipts(data, req) {
    try {
      if (data?.filter) {
        data.filter = JSON.parse(data?.filter)
      }
      const senagog_id = req.user.senagog_id
      const {filter} = data
      const receiptQuery = Receipt.createQueryBuilder('r')
          .where('r.senagog_id = :senagog_id', { senagog_id: senagog_id})
      if (filter?.customer_id) {
        receiptQuery.andWhere('r.customer_id = :customer_id',{ customer_id: filter.customer_id })
      }
      const receipts = await receiptQuery.getMany()

      return receipts
    } catch (e) {
      new ErrorHandler(e, 'get-receipts-error')

    }
  }

  async getReceipt(data) {
    try {
      const { receipt_id } = data
      const receipt = await Receipt.findOne({where: {id: receipt_id }})
      return receipt
    } catch (e) {
      new ErrorHandler(e, 'get-receipt-error')
    }
  }



  async removeReceipt(data) {
    try {
      const {receipt_id} = data
      await Receipt.delete({id: receipt_id})
    } catch (e) {
      new ErrorHandler(e, 'removeReceipt-error')

    }
  }
}
