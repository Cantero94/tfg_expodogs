# 🐾 Expodogs — Plataforma de Gestión de Exposiciones Caninas

Este proyecto representa la culminación del aprendizaje adquirido a lo largo del ciclo formativo de Desarrollo de Aplicaciones Web. Sirve como antesala para el Trabajo Fin de Grado, integrando múltiples tecnologías tanto del lado del cliente como del servidor. Su propósito es ofrecer una plataforma intuitiva para la gestión de exposiciones caninas, desde el registro de usuarios hasta la inscripción y gestión de pagos.

🔗 [Acceder al proyecto desplegado](https://tfg-expodogs.onrender.com)

---

## 📋 Funcionalidades principales

- 🔐 **Gestión de usuarios**:
  - Registro con validación de datos (cliente y servidor)
  - Verificación por email mediante token único
  - Login con opción “Recordarme” y recuperación de contraseña

- 🐶 **Gestión de perros**:
  - Agrupados por raza y organizados con acordeón de Bootstrap
  - Carga de una lista demo si el usuario no tiene perros registrados

- 📅 **Consulta de exposiciones**:
  - Filtros avanzados: por nombre, entidad, año y paginación dinámica

- 📝 **Inscripción de perros en exposiciones**:
  - Selección de exposición con plazos activos
  - Interfaz para seleccionar perros, asignar clases y confirmar inscripción
  - Aplicación automática de tarifas por orden de inscripción
  - Generación de código de pago único

- 💸 **Gestión de pagos**:
  - Visualización agrupada por código de pago
  - Acceso a detalles de inscripciones y resumen por tarifa
  - Generación de factura proforma en PDF
  - Simulación de pago (marcar como pagado)

---

## 🧪 Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (nativo), Pug (plantillas)
- **Backend**: Node.js, Express.js
- **ORM & BBDD**: Sequelize, MySQL
- **Email & PDF**: Nodemailer, PDFKit
- **Autenticación & Sesión**: Express-session, bcrypt, crypto
- **Deploy**: Render.com (Free Tier)

---

## 🧩 Modelo de base de datos

El sistema gestiona 5 entidades clave:

- **Usuarios** (`usuarios`)
- **Perros** (`perros`)
- **Exposiciones** (`exposiciones`)
- **Pagos** (`cod_pagos`)
- **Inscripciones** (`inscripciones`)

### 🔗 Relaciones entre tablas

- Un **usuario** puede registrar muchos **perros** y realizar muchos **pagos**
- Un **perro** solo pertenece a un usuario
- Un **pago** está asociado a un único usuario y a una única exposición
- Una **inscripción** pertenece a un perro, una exposición, un pago y un usuario
- Las inscripciones se agrupan por código de pago, facilitando el control y facturación

---

## 👨‍🎓 Autor

**José Carlos Cantero García**  
Este proyecto es parte del módulo de Desarrollo Web Servidor, Cliente y Diseño de Interfaces.

---

¡Gracias por visitar el proyecto!
