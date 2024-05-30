import { Module } from '@nestjs/common';
import { ItemLocationService } from './item-location.service';
import { ItemLocationController } from './item-location.controller';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [LogModule],
  controllers: [ItemLocationController],
  providers: [ItemLocationService],
})
export class ItemLocationModule {}
