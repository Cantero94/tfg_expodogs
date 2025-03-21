// utils/generarPDFInscripcion.js
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generarPDFInscripcion = (
  usuario,
  exposicion,
  cod_pago,
  perros,
  inscripciones
) => {
  const filePath = path.join(
    __dirname,
    `../public/pdf/proforma_${cod_pago}.pdf`
  );
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, left: 50, right: 50, bottom: 50 },
  });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // **🔹 Logo a la izquierda, empresa a la derecha**
  doc.image("public/img/logonegro.png", 50, 50, { width: 100 }); // Logo en la parte superior izquierda
  doc
    .fontSize(10)
    .text("Gestión Integral de Exposiciones S.L.", 400, 50, { align: "right" })
    .text("CIF: B73927816", { align: "right" })
    .text("Avenida Primero de Mayo, 24 1º", { align: "right" })
    .text("30420, Calasparra - Murcia", { align: "right" });
  doc.moveDown();
  // **🔹 Título en el centro**
  doc
    .fontSize(16)
    .fillColor("#000")
    .text("FACTURA PROFORMA", 0, 130, { align: "center", bold: true });

  // **📌 A partir de aquí, agregamos márgenes manualmente**
  const marginLeft = 60; // Definimos margen izquierdo

  // **🔹 Datos del cliente**
  doc.moveDown(4);
  doc
    .fontSize(11)
    .fillColor("#000")
    .text(`Cliente: ${usuario.nombre} ${usuario.apellidos}`, marginLeft);
  doc.text(`DNI: ${usuario.dni}`, marginLeft);
  doc.text(
    `Dirección: ${usuario.direccion}, ${usuario.cp}, ${usuario.ciudad}, ${usuario.provincia}`,
    marginLeft
  );
  doc.text(`Teléfono: ${usuario.telefono1}`, marginLeft);
  doc.text(`Email: ${usuario.email}`, marginLeft);

  // **🔹 Datos de la exposición**
  doc.moveDown(2);
  doc.fontSize(11).text(`Exposición: ${exposicion.nombre}`, marginLeft);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, marginLeft);
  doc.text(`Código de Pago: ${cod_pago}`, marginLeft);

  // **🔹 Línea divisoria**
  doc.moveDown();
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(marginLeft, doc.y)
    .lineTo(550, doc.y)
    .stroke();
  doc.moveDown();

  // **🔹 Tabla de inscripción**
  doc
    .font("Helvetica-Bold")
    .text("Detalles de inscripción:", marginLeft, doc.y, { underline: true });
  doc.moveDown(0.5);

  perros.forEach((p, idx) => {
    const insc = inscripciones.find((i) => i.id_perro === p.id_perro);
    doc
      .font("Helvetica-Bold")
      .text(`· ${p.nombre}`, marginLeft, doc.y, { continued: true })
      .font("Helvetica")
      .text(` (Microchip: ${p.microchip})`);
    doc.text(`  Libro: ${p.libro}-${p.numero_libro}`, marginLeft);
    doc.text(`  Clase: ${insc.clase} - Sexo: ${p.sexo}`, marginLeft);
    doc.text(`  Tarifa aplicada: ${insc.tarifa_aplicada}`, marginLeft);
    doc.text(`  Precio: ${insc.precio.toFixed(2)} €`, marginLeft);
    doc.moveDown(0.5);
  });

  // **🔹 Línea divisoria final**
  doc.moveDown();
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(marginLeft, doc.y)
    .lineTo(550, doc.y)
    .stroke();
  doc.moveDown();

  // **🔹 Estado de pago en grande**
  doc
    .fontSize(16)
    .fillColor("#FF0000")
    .text("PENDIENTE DE PAGO", 0, doc.y + 20, { align: "center" });
  doc.moveDown(4);
  // **🔹 Nota final pegada al borde inferior**
  doc
    .fillColor("#000")
    .fontSize(9)
    .text(
      "Este documento no tiene validez fiscal. Sirve como confirmación de inscripción.",
      {
        align: "center",
      }
    );

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
