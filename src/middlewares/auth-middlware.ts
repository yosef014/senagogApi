import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {User} from "../resources/users/entities/user.entity";
import ErrorHandler from "../helpers/error-handling/error-handler";
import {CustomersService} from "../resources/customers/customers.service";
import {Customer} from "../resources/customers/entities/customer.entity";
import { UsersService } from "../resources/users/users.service";
import * as process from "process";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('AuthMiddleware')
            if (!req.headers.authorization) {
                return;
            }

            const decodedToken: any = await this.userService.decodeToken(req.headers.authorization)

            if (!decodedToken) {
                return res.status(422).send({message: 'AUTHORIZATION HEADER IS NOT VALID'});
            }

            const user: any = await User.findOne({where:{id: decodedToken.jti}});

            if (user) {
                req.user = user;
                return next();
            }
        } catch (e) {
            new ErrorHandler(e, 'decodeToken')
        }
    }
}

