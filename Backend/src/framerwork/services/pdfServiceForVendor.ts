

import PDFDocument from "pdfkit";
import { IpdfServiceVendor } from "../../domain/interface/serviceInterface/IpdfServiceVendor";
import { VendorPdfReportInput } from "../../domain/entities/eventReportDataEntity";

export class PdfServiceVendor implements IpdfServiceVendor {
  async generateVendorReportPdf(data: VendorPdfReportInput): Promise<Buffer> {
    return new Promise((resolve, _reject) => {
      const doc = new PDFDocument({ margin: 50 }); // Set document margin
      const buffers: Uint8Array[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Main Title
      doc
        .fontSize(24)
        .fillColor("black")
        .text("Vendor Report", { align: "center", underline: true });
      doc.moveDown(2);

      // -------- EVENTS SECTION --------
      doc.fontSize(18).fillColor("black").text("Event Summary", { underline: true });
      doc.moveDown(1);

      // Table setup for events
      const eventTableTop = doc.y;
      const eventRowHeight = 25;
      const eventColumns = [
        { label: "Event Title", width: 180 },
        { label: "Start Date", width: 100 },
        { label: "Tickets Sold", width: 100 },
        { label: "Total Income", width: 100 },
      ];
      const startX = doc.page.margins.left;

      // Draw event table header
      let x = startX;
      doc.font("Helvetica-Bold").fontSize(12);
      eventColumns.forEach(col => {
        doc.text(col.label, x, eventTableTop, { width: col.width });
        x += col.width;
      });

      // Draw line under header
      doc
        .moveTo(startX, eventTableTop + eventRowHeight - 5)
        .lineTo(startX + eventColumns.reduce((sum, c) => sum + c.width, 0), eventTableTop + eventRowHeight - 5)
        .stroke();

      // Draw event rows
      doc.font("Helvetica").fontSize(10);
      let y = eventTableTop + eventRowHeight;

      data.events.forEach(event => {
        x = startX;

        const values = [
          event.title,
          new Date(event.schedule[0].startTime).toDateString(),
          event.ticketPurchased.toString(),
          `₹${(event.pricePerTicket! * event.ticketPurchased).toFixed(2)}`
        ];

        values.forEach((text, i) => {
          doc.text(text, x, y, { width: eventColumns[i].width });
          x += eventColumns[i].width;
        });

        y += eventRowHeight;

        if (y > doc.page.height - 50) {
          doc.addPage();
          y = doc.page.margins.top;
        }
      });

      // Move down before bookings section
      doc.moveDown(2);

      // -------- BOOKINGS SECTION --------
      const headingX = doc.page.margins.left;
      const headingY = doc.y;
      doc
        .fontSize(18)
        .fillColor("black")
        .text("Service Booking Summary", headingX, headingY, {
          underline: true,
          align: "left",
          width: doc.page.width - doc.page.margins.left - doc.page.margins.right, // full width
        });
      doc.moveDown(1);

      const bookingTableTop = doc.y;
      const bookingRowHeight = 25;
      const bookingColumns = [
        { label: "Service Title", width: 120 },
        { label: "Price", width: 50 },
        { label: "Date", width: 90 },
        { label: "Payment", width: 70 },
        { label: "Status", width: 70 },
        { label: "Client Email", width: 95 },
      ];

      // Draw bookings header
      x = startX;
      doc.font("Helvetica-Bold").fontSize(12);
      bookingColumns.forEach(col => {
        doc.text(col.label, x, bookingTableTop, { width: col.width });
        x += col.width;
      });

      // Line under header
      doc
        .moveTo(startX, bookingTableTop + bookingRowHeight - 5)
        .lineTo(startX + bookingColumns.reduce((sum, c) => sum + c.width, 0), bookingTableTop + bookingRowHeight - 5)
        .stroke();

      // Draw bookings rows
      doc.font("Helvetica").fontSize(10);
      y = bookingTableTop + bookingRowHeight;

      data.bookings.forEach(booking => {
        x = startX;
        const values = [
          booking.serviceId.serviceTitle,
          `Rs ${booking.serviceId.servicePrice}`,
          new Date(booking.createdAt).toDateString(),
          booking.paymentStatus,
          booking.status,
          booking.clientId.email,
        ];

        values.forEach((text, i) => {
          doc.text(text, x, y, { width: bookingColumns[i].width, lineBreak: true });
          x += bookingColumns[i].width;
        });

        y += bookingRowHeight;

        // Pagination if bottom reached
        if (y > doc.page.height - 50) {
          doc.addPage();
          y = doc.page.margins.top;

          // Repeat booking table header on new page
          x = startX;
          doc.font("Helvetica-Bold").fontSize(12);
          bookingColumns.forEach(col => {
            doc.text(col.label, x, y, { width: col.width });
            x += col.width;
          });
          doc
            .moveTo(startX, y + bookingRowHeight - 5)
            .lineTo(startX + bookingColumns.reduce((sum, c) => sum + c.width, 0), y + bookingRowHeight - 5)
            .stroke();

          y += bookingRowHeight;
          doc.font("Helvetica").fontSize(10);
        }
      });

      doc.end();
    });
  }
}
