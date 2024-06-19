import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private mg: mailgun.Mailgun;

  constructor(private configService: ConfigService) {
    this.mg = mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });
  }

  async sendStockAlertEmail(
    codeArticle: string,
    quantityOrdered: number,
    quantityAvailable: number,
  ) {
    const subject =
      quantityAvailable <= 0
        ? `Stock Alert: No Quantity Available for Article ${codeArticle}`
        : `Stock Alert: Low Quantity Available for Article ${codeArticle}`;

    const message =
      quantityAvailable <= 0
        ? `There is no quantity available in stock for article ${codeArticle}. Requested quantity: ${quantityOrdered}.`
        : `The quantity available for article ${codeArticle} is low. Current quantity: ${quantityAvailable}. Requested quantity: ${quantityOrdered}.`;

    const data = {
      from: 'Demo Sender <demo@sandbox6dfb0357c89b430580d2ef869fe3fe6a.mailgun.org>',
      to: this.configService.get<string>('RESPONSIBLE_STOCK_EMAIL'),
      subject: subject,
      text: message,
    };

    try {
      const result = await this.mg.messages().send(data);
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
