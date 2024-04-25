import { Module } from '@nestjs/common';
import { ItemLocationService } from './item-location.service';
import { ItemLocationController } from './item-location.controller';

@Module({
  controllers: [ItemLocationController],
  providers: [ItemLocationService],
})
export class ItemLocationModule {}
