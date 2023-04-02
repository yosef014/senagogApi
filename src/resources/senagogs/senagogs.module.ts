import { Module } from '@nestjs/common';
import { SenagogsService } from './senagogs.service';
import { SenagogsController } from './senagogs.controller';

@Module({
  controllers: [SenagogsController],
  providers: [SenagogsService]
})
export class SenagogsModule {}
