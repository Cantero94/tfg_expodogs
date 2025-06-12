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
  pago,
  perros,
  inscripciones
) => {
  const cod_pago = pago.cod_pago;

  const filePath = path.join(
    __dirname,
    `../public/pdf/proforma_${cod_pago}.pdf`
  );

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 40, left: 50, right: 50, bottom: 80 },
  });

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream); // Empieza a escribir en el archivo pdf

  // Añadimos un pie de página a cada página con el número de página
  let currentPage = 1;
  const addFooter = () => {
    const bottom = doc.page.height - doc.page.margins.bottom + 40;

    doc.save();

    doc
      .fontSize(9)
      .fillColor("black")
      .text(
        "Este documento no tiene validez fiscal. Sirve como confirmación de inscripción.",
        50,
        bottom,
        { lineBreak: false }
      )
      .text(`Página ${currentPage}`, doc.page.width - 100, bottom, {
        lineBreak: false,
      });

    doc.restore();
    currentPage++;
  };

  // Footer para la primera página
  addFooter();

  // Footer para cada nueva página
  doc.on("pageAdded", () => {
    setImmediate(() => {
      addFooter();
    });
  });

  doc.image("public/img/logonegro.png", 50, 40, { width: 100 });
  doc
    .fontSize(10)
    .text("Gestión Integral de Exposiciones S.L.", 400, 40, { align: "right" })
    .text("CIF: B73927816", { align: "right" })
    .text("Avenida Primero de Mayo, 24 1º", { align: "right" })
    .text("30420, Calasparra - Murcia", { align: "right" });
  doc.moveDown();

  doc
    .fontSize(16)
    .fillColor("#000")
    .text("FACTURA PROFORMA", 0, 120, { align: "center", bold: true });

  const marginLeft = 60;

  doc.moveDown();
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

  doc.moveDown();
  doc.fontSize(11).text(`Exposición: ${exposicion.nombre}`, marginLeft);
  doc.text(
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

  doc.moveDown();
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(marginLeft, doc.y)
    .lineTo(550, doc.y)
    .stroke();
  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .text("Detalles de inscripción:", marginLeft, doc.y, { underline: true });
  doc.moveDown(0.5);

  const subtotales = {};

  // Agrupar perros por raza
  const perrosPorRaza = {};
  perros.forEach((p) => {
    if (!perrosPorRaza[p.raza]) {
      perrosPorRaza[p.raza] = [];
    }
    perrosPorRaza[p.raza].push(p);
  });

  // Iterar por cada raza
  Object.entries(perrosPorRaza).forEach(([raza, grupo]) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(`Raza: ${raza}`, marginLeft);
    doc.moveDown(0.3);

    grupo.forEach((p) => {
      const insc = inscripciones.find((i) => i.id_perro === p.id_perro);
      if (!subtotales[insc.tarifa_aplicada]) {
        subtotales[insc.tarifa_aplicada] = 0;
      }
      subtotales[insc.tarifa_aplicada] += insc.precio;

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(`· ${p.nombre}`, marginLeft * 1.25);
      doc
        .font("Helvetica")
        .fontSize(9)
        .text(
          `  Microchip: ${p.microchip}     Libro: ${p.libro}-${p.numero_libro}`,
          marginLeft * 1.5
        );
      doc.text(`  Clase: ${insc.clase} ${p.sexo}s`, marginLeft * 1.5);
      doc.text(
        `  Precio: ${insc.precio.toFixed(2)}€ (${insc.tarifa_aplicada})`,
        marginLeft * 1.5
      );
      doc.moveDown(0.5);
    });

    doc.moveDown(1);
  });

  doc.moveDown();
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(marginLeft, doc.y)
    .lineTo(550, doc.y)
    .stroke();
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Resumen por tarifa:", marginLeft);
  for (const [tarifa, total] of Object.entries(subtotales)) {
    const cantidadPerros = inscripciones.filter(
      (insc) => insc.tarifa_aplicada === tarifa
    ).length;
    doc
      .font("Helvetica")
      .text(
        `- ${tarifa}: (x${cantidadPerros}) ${total.toFixed(2)} €`,
        marginLeft * 1.25
      );
  }
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(`Importe total: ${pago.total}€`, marginLeft);
  doc.moveDown();

  doc.fontSize(16).fillColor("#FF0000");
  if (pago.estado === "pendiente") {
    doc.text("PENDIENTE DE PAGO", 0, doc.y, { align: "center" });
  } else {
    doc.text(pago.estado.toUpperCase(), 0, doc.y + 20, { align: "center" });
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
