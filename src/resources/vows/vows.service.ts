import {Injectable} from '@nestjs/common';
import {CreateVowDto} from './dto/create-vow.dto';
import {UpdateVowDto} from './dto/update-vow.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";
import {Vow} from "./entities/vow.entity";

@Injectable()
export class VowsService {
    async saveVow(body, req) {
        try {
            const {customer_id, price, description, name} = body
            const senagog_id = req.user.senagog_id
            const vow = await Vow.create({
                customer_id,
                price,
                senagog_id,
                description,
                name
            })?.save()
            return vow
        } catch (e) {
            new ErrorHandler(e, 'save-vow-error')
        }
    }

    async getVows(data, req) {
        try {
            if (data?.filter) {
                data.filter = JSON.parse(data?.filter)
            }
            const senagog_id = req.user.senagog_id
            const {filter} = data
            const vowsQuery = Vow.createQueryBuilder('v')
                .where('v.senagog_id = :senagog_id', { senagog_id: senagog_id})
            if (filter?.customer_id) {
                vowsQuery.andWhere('v.customer_id = :customer_id',{ customer_id: filter.customer_id })
            }
            const vows = await vowsQuery.getMany()

            return vows
        } catch (e) {
            new ErrorHandler(e, 'get-vows-error')
        }
    }

    async getVow(data) {
        try {
            const { vow_id } = data
            const vow = await Vow.findOne({where: {id: vow_id }})
            return vow
        } catch (e) {
            new ErrorHandler(e, 'get-vow-error')
        }
    }

    async removeVow(data) {
        try {
            const {vow_id} = data
            await Vow.delete({id: vow_id})
        } catch (e) {
            new ErrorHandler(e, 'removeVow-error')

        }
    }
}
