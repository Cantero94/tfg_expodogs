import { Usuario } from "../models/Usuario.js";
import { Perro } from "../models/Perro.js";
import bcrypt from "bcrypt";

// Función para mostrar los datos de la cuenta del usuario
const mostrarCuenta = async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect("/");
  }

  try {
    const usuario = await Usuario.findOne({
      where: { id_usuario: req.session.usuario.id },
      attributes: [
        "email",
        "nombre",
        "apellidos",
        "dni",
        "telefono1",
        "telefono2",
        "direccion",
        "ciudad",
        "provincia",
        "pais",
        "cp",
      ],
    });

    if (!usuario) {
      req.session.errores = ["No se pudo cargar la cuenta."];
      return res.redirect("/");
    }

    res.render("miCuenta", {
      pagina: "Mi Cuenta",
      usuario: usuario.toJSON(),
    });
  } catch (error) {
    console.error("❌ Error cargando la cuenta:", error);
    req.session.errores = ["Error en el servidor."];
    res.redirect("/");
  }
};

const actualizarCuenta = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      dni,
      password,
      password2,
      telefono1,
      telefono2,
      direccion,
      cp,
      ciudad,
      provincia,
      pais,
    } = req.body;

    if (password && password !== password2) {
      return res.status(400).json({ errores: "Las contraseñas no coinciden." });
    }
    // Recordatorio: Añadir validaciones de los campos!

    let updateData = {
      nombre,
      apellidos,
      dni,
      telefono1,
      telefono2,
      direccion,
      cp,
      ciudad,
      provincia,
      pais,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await Usuario.update(updateData, {
      where: { id_usuario: req.session.usuario.id },
    });

    return res
      .status(200)
      .json({ mensaje: "Datos actualizados correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar cuenta:", error);
    return res
      .status(500)
      .json({ error: "Error en el servidor. Inténtalo nuevamente." });
  }
};

// Función para mostrar los perros del usuario
const misPerros = async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/"); // Redirigir si no está logeado
    }

    const usuarioId = req.session.usuario.id;

    // Obtener los perros del usuario
    const perros = await Perro.findAll({ where: { id_usuario: usuarioId } });

    // Agrupar los perros por raza
    const perrosPorRaza = perros.reduce((acc, perro) => {
      // Si no existe la raza del perro, la creamos
      if (!acc[perro.raza]) {
        acc[perro.raza] = [];
      }
      // Si existe, añadimos el perro
      acc[perro.raza].push(perro);
      return acc;
    }, {});

    res.render("misPerros", {
      pagina: "Mis Perros",
      usuario: req.session.usuario,
      perrosPorRaza,
    });
  } catch (error) {
    console.error("❌ Error al obtener perros:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Como tengo que plantearme bien la estructura de la base de datos para las razas de perros, creo esta función para cargar una pila de perros.
const cargarPerrosDemo = async (req, res) => {
  const usuarioId = req.session.usuario?.id;
  if (!usuarioId) return res.redirect("/login");

  const perrosDemo = [
    {
      nombre: "Mei Dequiresa",
      raza: "Dobermann",
      sexo: "Hembra",
      microchip: "941010000287892",
      libro: "LOE",
      numero_libro: "2669347",
      fecha_nacimiento: "2015-02-25",
      padre: "Smart connection unbelievable",
      madre: "FANTA DE BRU-COR`S",
      id_usuario: usuarioId,
    },
    {
      nombre: "Nala de Can Duran",
      raza: "Dobermann",
      sexo: "Hembra",
      microchip: "948372635271823",
      libro: "LOE",
      numero_libro: "3487562",
      fecha_nacimiento: "2018-06-20",
      padre: "Rocky de Can Roca",
      madre: "MARGA DE LOS CAMPOS",
      id_usuario: usuarioId,
    },
    {
      nombre: "Zeus del Destino",
      raza: "Dobermann",
      sexo: "Hembra",
      microchip: "941234567890126",
      libro: "LOE",
      numero_libro: "2345678",
      fecha_nacimiento: "2019-07-07",
      padre: "Bobby del Futuro",
      madre: "MIMI DEL AMOR",
      id_usuario: usuarioId,
    },
    {
      nombre: "Vasco",
      raza: "Perro pastor vasco",
      sexo: "Macho",
      microchip: "987654321123456",
      libro: "LOE",
      numero_libro: "2669347",
      fecha_nacimiento: "2024-10-29",
      padre: "PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS",
      madre: "FANTA DE BRUT-COR`S",
      id_usuario: usuarioId,
    },
    {
      nombre: "Bella del Lago",
      raza: "Perro pastor vasco",
      sexo: "Hembra",
      microchip: "948362635271899",
      libro: "LOE",
      numero_libro: "3984769",
      fecha_nacimiento: "2023-07-05",
      padre: "Simba del Prado",
      madre: "FIONA DEL RIO",
      id_usuario: usuarioId,
    },
    {
      nombre: "Rex del Mar",
      raza: "Perro pastor vasco",
      sexo: "Macho",
      microchip: "945678901234569",
      libro: "LOE",
      numero_libro: "9012345",
      fecha_nacimiento: "2017-03-30",
      padre: "Rocky del Océano",
      madre: "FIONA DE LA PLAYA",
      id_usuario: usuarioId,
    },
    {
      nombre: "Theo de Marvel Lux",
      raza: "Yorkshire Terrier",
      sexo: "Macho",
      microchip: "941010000287892",
      libro: "LOE",
      numero_libro: "2456234",
      fecha_nacimiento: "2014-11-13",
      padre: "Smart connection unbelievable",
      madre: "FANTA DE BRUT-COR`S",
      id_usuario: usuarioId,
    },
    {
      nombre: "Lulu de la Vega",
      raza: "Yorkshire Terrier",
      sexo: "Hembra",
      microchip: "948362635271834",
      libro: "LOE",
      numero_libro: "3984764",
      fecha_nacimiento: "2016-09-22",
      padre: "Zeus del Monte",
      madre: "DAISY DE LOS PINARES",
      id_usuario: usuarioId,
    },
    {
      nombre: "Coco del Valle",
      raza: "Yorkshire Terrier",
      sexo: "Hembra",
      microchip: "949012345678912",
      libro: "LOE",
      numero_libro: "1234567",
      fecha_nacimiento: "2020-03-07",
      padre: "Bruno de Andalucía",
      madre: "NENA DE SEVILLA",
      id_usuario: usuarioId,
    },
  ];

  try {
    await Perro.bulkCreate(perrosDemo);
    return res.redirect("/misPerros");
  } catch (error) {
    console.error("❌ Error al cargar perros demo:", error);
    return res.status(500).send("Error al insertar datos");
  }
};

export { mostrarCuenta, actualizarCuenta, misPerros, cargarPerrosDemo };
