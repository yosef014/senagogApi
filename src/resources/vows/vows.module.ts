import { Module } from '@nestjs/common';
import { VowsService } from './vows.service';
import { VowsController } from './vows.controller';

@Module({
  controllers: [VowsController],
  providers: [VowsService]
})
export class VowsModule {}
