import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('email')
@UseGuards(JwtAuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-stock-alert')
  async sendStockAlert(
    @Body()
    sendStockAlertDto: {
      codeArticle: string;
      quantityOrdered: number;
      quantityAvailable: number;
    },
  ) {
    const { codeArticle, quantityOrdered, quantityAvailable } =
      sendStockAlertDto;
    await this.emailService.sendStockAlertEmail(
      codeArticle,
      quantityOrdered,
      quantityAvailable,
    );

    return { message: 'Email sent successfully' };
  }
}
