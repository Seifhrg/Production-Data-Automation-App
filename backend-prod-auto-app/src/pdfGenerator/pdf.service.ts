import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { join } from 'path';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PdfService {
  constructor(private databaseService: DatabaseService) {}

  async createPDF(workOrderId: number): Promise<string> {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filename = `output_${Date.now()}.pdf`;
    const dir = join(__dirname, '../../', 'PDFGenerated');
    const filePath = join(dir, filename);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      doc.pipe(fs.createWriteStream(filePath));

      const workOrder = await this.databaseService.workOrder.findUnique({
        where: { DOCO: workOrderId },
        include: {
          WorkOrderPartsList: { include: { itemLocation: true } },
          WorkOrderRouting: true,
        },
      });

      if (!workOrder) {
        throw new Error('Work order not found');
      }

      doc.fontSize(12);
      doc.text("SEN'EAU", { align: 'left' });
      doc.text(`Date - ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.text(`Time - ${new Date().toLocaleTimeString()}`, { align: 'right' });
      doc.moveDown();

      doc.text('Work Order Print', { align: 'center', underline: true });
      doc.moveDown();

      doc.text('1 Page -', { align: 'right' });
      doc.moveDown();

      doc.text(
        `Order Number / Type: ${workOrder.DOCO} / ${workOrder.documentType}`,
      );
      doc.text(`Quantity Ordered / UOM: ${workOrder.quantityOrdered} UN`);
      doc.text(
        `Branch/Plant: ${workOrder.WorkOrderPartsList[0]?.itemLocation?.lotStatusCode || 'N/A'}`,
      );
      doc.text(`Description: ${workOrder.description}`);
      doc.text(
        `Requested Date: ${workOrder.requestedDate.toISOString().split('T')[0]}`,
      );
      doc.text(
        `Start Date: ${workOrder.startDate.toISOString().split('T')[0]}`,
      );

      doc.moveDown();
      doc.text('..... Parts List .....', { align: 'center', underline: true });
      doc.moveDown();

      workOrder.WorkOrderPartsList.forEach((part) => {
        doc.text(`Component Number: ${part.UKID}`);
        doc.text(`Description: ${part.description}`);
        doc.text(`Branch: ${part.itemLocation?.lotStatusCode || 'N/A'}`);
        doc.text(`Quantity Required: ${part.quantityOrdered}`);
        doc.text(`Quantity Issued: ${part.issuedQuantity}`);
        doc.moveDown();
      });

      doc.moveDown();
      doc.text('..... Routing Instructions .....', {
        align: 'center',
        underline: true,
      });
      doc.moveDown();

      workOrder.WorkOrderRouting.forEach((route) => {
        doc.text(`Operation: ${route.sequenceNumberOperations}`);
        doc.text(`Description: ${route.Description}`);
        doc.text(`Run Machine Hours: ${route.runMachine}`);
        doc.text(`Run Labor Hours: ${route.runLabour}`);
        doc.text(`Setup Labor: ${route.setupLabor}`);
        doc.moveDown();
      });

      doc.end();
      return filePath;
    } catch (error) {
      throw error;
    }
  }
}
