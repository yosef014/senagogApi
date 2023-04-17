import {Injectable} from '@nestjs/common';
import {CreateVowDto} from './dto/create-vow.dto';
import {UpdateVowDto} from './dto/update-vow.dto';
import ErrorHandler from "../../helpers/error-handling/error-handler";
import {Vow} from "./entities/vow.entity";

@Injectable()
export class VowsService {
    async saveVow(body) {
        try {
            const {customer_id, price, description, name} = body
            const vow = await Vow.create({
                customer_id,
                price,
                description,
                name
            })?.save()
            return vow
        } catch (e) {
            new ErrorHandler(e, 'save-vow-error')
        }
    }

    async getVows(data) {
        try {
            if (data?.filter) {
                data.filter = JSON.parse(data?.filter)
            }
            const {filter} = data

            const vowsQuery = Vow.createQueryBuilder('v')
                //todo need to relation vow with some senagog
            if (filter.customer_id) {

            }
            const vows = await vowsQuery.getMany()

            return vows
        } catch (e) {
            new ErrorHandler(e, 'get-vows-error')

        }
    }

    findOne(id: number) {
        return `This action returns a #${id} vow`;
    }

    update(id: number, updateVowDto: UpdateVowDto) {
        return `This action updates a #${id} vow`;
    }

    remove(id: number) {
        return `This action removes a #${id} vow`;
    }
}
