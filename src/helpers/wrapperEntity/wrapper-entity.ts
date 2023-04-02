import {BaseEntity} from "typeorm";

export default class WrapperEntity extends BaseEntity {
    static async findOne (params) {
        const whereOptions = params?.where;

        if (!params || !whereOptions) {
            return null;
        }

        const invalidWhereOptions = Object.keys(whereOptions).every(key => [undefined, null].includes(whereOptions[key]));

        if (invalidWhereOptions) {
            return null;
        }

        return this.getRepository().findOne(params);
    }

    static save(entityOrEntities, options = {}) {
        return this.getRepository().save(entityOrEntities, options);
    }
}
