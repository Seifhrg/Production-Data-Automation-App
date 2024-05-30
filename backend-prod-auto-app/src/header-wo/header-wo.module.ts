import { Module } from '@nestjs/common';
import { HeaderWoService } from './header-wo.service';
import { HeaderWoController } from './header-wo.controller';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [LogModule],
  controllers: [HeaderWoController],
  providers: [HeaderWoService],
})
export class HeaderWoModule {}
