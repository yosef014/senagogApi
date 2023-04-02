require('dotenv').config();
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/users/users.module';
import { CustomersModule } from './resources/customers/customers.module';
import ormconfig from '../ormconfig';
import { AuthMiddleware } from "./middlewares/auth-middlware";
import { SenagogsModule } from './resources/senagogs/senagogs.module';
import { VowsModule } from './resources/vows/vows.module';
import { ReceiptsModule } from './resources/receipts/receipts.module';
import { ExpensesModule } from './resources/expenses/expenses.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, CustomersModule, SenagogsModule, VowsModule, ReceiptsModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer:MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method:RequestMethod.POST },
        { path: '*', method:RequestMethod.DELETE }
      )
  }
}
