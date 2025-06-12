// utils/generarPDFInscripcion.js
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Genera la factura proforma en PDF
 * @returns {Promise<string>} Ruta absoluta del PDF generado
 */
export const generarPDFInscripcion = async (
  usuario,
  exposicion,
  pago,
  perros,
  inscripciones
) => {
  const cod_pago = pago.cod_pago;

  // Ruta de salida
  const filePath = path.join(
    __dirname,
    `../public/pdf/proforma_${cod_pago}.pdf`
  );
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // ---------- Documento ----------
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 40, left: 50, right: 50, bottom: 80 },
    bufferPages: true               // <-- Para dibujar pies al final
  });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // ---------- Encabezado ----------
  doc.image("public/img/logonegro.png", 50, 40, { width: 100 });
  doc.fontSize(10)
     .text("Gestión Integral de Exposiciones S.L.", 400, 40, { align: "right" })
     .text("CIF: B73927816", { align: "right" })
     .text("Avenida Primero de Mayo, 24 1º", { align: "right" })
     .text("30420, Calasparra - Murcia", { align: "right" });
  doc.moveDown();

  doc.fontSize(16)
     .fillColor("#000")
     .text("FACTURA PROFORMA", 0, 120, { align: "center", bold: true });

  const marginLeft = 60;

  // ---------- Datos cliente ----------
  doc.moveDown();
  doc.fontSize(11)
     .fillColor("#000")
     .text(`Cliente: ${usuario.nombre} ${usuario.apellidos}`, marginLeft)
     .text(`DNI: ${usuario.dni}`, marginLeft)
     .text(
       `Dirección: ${usuario.direccion}, ${usuario.cp}, ${usuario.ciudad}, ${usuario.provincia}`,
       marginLeft
     )
     .text(`Teléfono: ${usuario.telefono1}`, marginLeft)
     .text(`Email: ${usuario.email}`, marginLeft);

  // ---------- Datos inscripción ----------
  doc.moveDown();
  doc.fontSize(11)
     .text(`Exposición: ${exposicion.nombre}`, marginLeft)
     .text(
       `Fecha de inscripción: ${new Date(pago.createdAt).toLocaleDateString()}`,
       marginLeft
     );
  if (pago.fecha_pago) {
    doc.text(
      `Fecha de pago: ${new Date(pago.fecha_pago).toLocaleDateString()}`,
      marginLeft
    );
  }
  doc.text(`Código de Pago: ${cod_pago}`, marginLeft);

  // ---------- Separador ----------
  doc.moveDown();
  doc.strokeColor("#aaaaaa")
     .lineWidth(1)
     .moveTo(marginLeft, doc.y)
     .lineTo(550, doc.y)
     .stroke();
  doc.moveDown();

  // ---------- Detalle perros ----------
  doc.font("Helvetica-Bold")
     .fontSize(11)
     .text("Detalles de inscripción:", marginLeft, doc.y, { underline: true });
  doc.moveDown(0.5);

  // Agrupar perros por raza
  const perrosPorRaza = perros.reduce((acc, p) => {
    acc[p.raza] = acc[p.raza] || [];
    acc[p.raza].push(p);
    return acc;
  }, {});

  const subtotales = {};
  const FOOTER_SPACE = 20; // espacio reservado para el pie

  /**
   * Devuelve true si hay espacio suficiente en la página para nPixels.
   */
  const cabeBloque = (nPixels) => {
    const limite = doc.page.height - doc.page.margins.bottom - FOOTER_SPACE;
    return doc.y + nPixels <= limite;
  };

  /**
   * Imprime la información de un perro, forzando salto si es necesario.
   */
  const imprimirPerro = (p, insc) => {
    const lineH = doc.currentLineHeight();
    const blockHeight = lineH * 4 + 4; // 4 líneas + margen pequeño

    if (!cabeBloque(blockHeight)) {
      doc.addPage();  // Salto limpio antes de empezar el perro
    }

    // --- Bloque ---
    doc.fontSize(10).font("Helvetica-Bold")
       .text(`· ${p.nombre}`, marginLeft * 1.25);
    doc.fontSize(9).font("Helvetica")
       .text(`  Microchip: ${p.microchip}     Libro: ${p.libro}-${p.numero_libro}`,
             marginLeft * 1.5);
    doc.text(`  Clase: ${insc.clase} ${p.sexo}s`, marginLeft * 1.5);
    doc.text(`  Precio: ${insc.precio.toFixed(2)}€ (${insc.tarifa_aplicada})`,
             marginLeft * 1.5);
    doc.moveDown(0.5);
  };

  // Mostrar perros agrupados por raza
  Object.entries(perrosPorRaza).forEach(([raza, grupo]) => {
    doc.font("Helvetica-Bold")
       .fontSize(11)
       .text(`Raza: ${raza}`, marginLeft);
    doc.moveDown(0.3);

    grupo.forEach((p) => {
      const insc = inscripciones.find((i) => i.id_perro === p.id_perro);

      // Acumular subtotales
      subtotales[insc.tarifa_aplicada] =
        (subtotales[insc.tarifa_aplicada] || 0) + insc.precio;

      imprimirPerro(p, insc);
    });

    doc.moveDown(1);
  });

  // ---------- Resumen ----------
  doc.moveDown();
  doc.strokeColor("#aaaaaa")
     .lineWidth(1)
     .moveTo(marginLeft, doc.y)
     .lineTo(550, doc.y)
     .stroke();
  doc.moveDown();

  doc.fontSize(10).font("Helvetica-Bold")
     .text("Resumen por tarifa:", marginLeft);
  Object.entries(subtotales).forEach(([tarifa, total]) => {
    const cantidad = inscripciones.filter(i => i.tarifa_aplicada === tarifa).length;
    doc.font("Helvetica")
       .text(`- ${tarifa}: (x${cantidad}) ${total.toFixed(2)} €`,
             marginLeft * 1.25);
  });

  doc.moveDown();
  doc.fontSize(12).font("Helvetica-Bold")
     .text(`Importe total: ${pago.total}€`, marginLeft);
  doc.moveDown();

  doc.fontSize(16).fillColor("#FF0000");
  if (pago.estado === "pendiente") {
    doc.text("PENDIENTE DE PAGO", 0, doc.y, { align: "center" });
  } else {
    doc.text(pago.estado.toUpperCase(), 0, doc.y + 20, { align: "center" });
  }

  // ---------- Pies de página ----------
  const addFooters = () => {
    const { start, count } = doc.bufferedPageRange();
    for (let i = start; i < start + count; i++) {
      doc.switchToPage(i);

      const bottomY =
        doc.page.height - doc.page.margins.bottom + 20; // mismo offset que FOOTER_SPACE

      doc.fontSize(9)
         .fillColor("black")
         .text(
           "Este documento no tiene validez fiscal. Sirve como confirmación de inscripción.",
           50,
           bottomY,
           { lineBreak: false }
         )
         .text(
           `Página ${i - start + 1} / ${count}`,
           doc.page.width - 100,
           bottomY,
           { lineBreak: false }
         );
    }
    // Volvemos a la última página para terminar correctamente
    doc.switchToPage(start + count - 1);
  };

  addFooters();
  doc.end();

  // ---------- Promesa de finalización ----------
  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
