import { Module } from '@nestjs/common';
import { HeaderWoService } from './header-wo.service';
import { HeaderWoController } from './header-wo.controller';

@Module({
  controllers: [HeaderWoController],
  providers: [HeaderWoService],
})
export class HeaderWoModule {}
