// models/relaciones.js
import { CodPago } from "./CodPago.js";
import { Inscripcion } from "./Inscripcion.js";
import { Usuario } from "./Usuario.js";
import { Perro } from "./Perro.js";
import { Exposicion } from "./Exposicion.js";

CodPago.hasMany(Inscripcion, { foreignKey: "id_pago", as: "inscripciones", onDelete: "CASCADE", onUpdate: "CASCADE" });
CodPago.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE", onUpdate: "CASCADE" });
CodPago.belongsTo(Exposicion, { foreignKey: "id_exposicion", onDelete: "CASCADE", onUpdate: "CASCADE" });


Inscripcion.belongsTo(Exposicion, { foreignKey: "id_exposicion", onDelete: "CASCADE", onUpdate: "CASCADE" });
Inscripcion.belongsTo(Perro, { foreignKey: "id_perro", onDelete: "CASCADE", onUpdate: "CASCADE" });
Inscripcion.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE", onUpdate: "CASCADE" });
Inscripcion.belongsTo(CodPago, { foreignKey: "id_pago", /* as: "pago", */ onDelete: "CASCADE", onUpdate: "CASCADE" });

Perro.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE", onUpdate: "CASCADE" });

Usuario.hasMany(CodPago, { foreignKey: "id_usuario" });

export {
  CodPago,
  Inscripcion,
  Usuario,
  Perro,
  Exposicion,
};