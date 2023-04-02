import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from '../../helpers/constants';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  exports: [UsersService]
})
export class UsersModule {}
