import {
  Controller,
  Post,
  Param,
  Res,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post(':id')
  async createPDF(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const workOrderId = parseInt(id, 10);
      if (isNaN(workOrderId)) {
        throw new HttpException(
          'Invalid work order ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filePath = await this.pdfService.createPDF(workOrderId);
      res.json({ filePath });
    } catch (error) {
      console.error('Error in controller:', error.message);
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('download/:filename')
  async downloadPDF(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    const filePath = path.join(__dirname, '../../', 'PDFGenerated', filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
    });
  }
}
