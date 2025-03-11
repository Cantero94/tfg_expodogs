-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-01-2025 a las 11:15:38
-- Versión del servidor: 10.11.6-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jccanterog04_webExposiciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exposiciones`
--

CREATE TABLE `exposiciones` (
  `id_exposicion` bigint(20) NOT NULL,
  `ambito` varchar(255) DEFAULT NULL,
  `cargo_paypal` bit(1) DEFAULT NULL,
  `cartel` varchar(255) DEFAULT NULL,
  `contar_veteranos` bit(1) DEFAULT NULL,
  `descuento_razas` double DEFAULT NULL,
  `descuento_socios` double DEFAULT NULL,
  `entidad_organizadora` varchar(255) DEFAULT NULL,
  `fecha` varchar(255) DEFAULT NULL,
  `lugar` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `nombre_corto` varchar(255) DEFAULT NULL,
  `plazo1_fin` varchar(255) DEFAULT NULL,
  `plazo1_inicio` varchar(255) DEFAULT NULL,
  `plazo2_fin` varchar(255) DEFAULT NULL,
  `plazo2_inicio` varchar(255) DEFAULT NULL,
  `precio_inscripcion` double DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `exposiciones`
--

INSERT INTO `exposiciones` (`id_exposicion`, `ambito`, `cargo_paypal`, `cartel`, `contar_veteranos`, `descuento_razas`, `descuento_socios`, `entidad_organizadora`, `fecha`, `lugar`, `nombre`, `nombre_corto`, `plazo1_fin`, `plazo1_inicio`, `plazo2_fin`, `plazo2_inicio`, `precio_inscripcion`, `tipo`) VALUES
(17, 'internacional', b'1', 'images/expo1.jpg', b'1', 50, 50, 'Sociedad Canina de Bizkaia', '2024-09-08', 'Muskiz (Bizkaia)', '58 Exposición Internacional de Bilbao', '58 Exposición Internacional de Bilbao', '2024-07-31T23:59', '2024-06-01T00:00', '2024-08-31T23:59', '2024-08-01T00:00', 50, 'exposicion'),
(18, 'nacional', b'1', 'images/expo1.jpg', b'1', 50, 50, 'Sociedad Canina de Bizkaia', '2024-09-07', 'Muskiz (Bizkaia)', '59 Exposición Nacional de Bilbao', '59 Exposición Nacional de Bilbao', '2024-08-01T00:00', '2024-06-01T00:00', '2024-09-01T00:00', '2024-08-01T00:00', 30, 'exposicion'),
(19, 'nacional', b'1', 'images/expo2.jpg', b'1', 0, 50, 'Club Español del Perro San Bernardo', '2024-10-13', 'Camping Cazalegas', 'XXXVIII Monográfica A del CEPSB', 'XXXVIII Monográfica A del CEPSB', '2024-10-08T01:25', '2024-08-01T01:24', '', '', 50, 'monografica'),
(20, 'nacional', b'1', 'https://cre-es.expodogs.es/2024/2024cre.jpg', b'1', 0, 50, 'Club Español del Rottwiler', '2024-11-23', 'San Martín de la Vega (Madrid)', 'Monográfica Klubsieger Zuchtschau CRE 2024', 'Monográfica Klubsieger Zuchtschau CRE 2024', '2024-11-19T01:28', '2024-10-01T01:28', '', '', 50, 'monografica'),
(21, NULL, b'1', 'https://aefrbf.expodogs.es/2024/2024_WINNER.jpg', b'1', 0, 50, 'Asociación Española para el Fomento de la Raza Bulldog Francés', '2024-11-23', 'Torralba de Oropesa (Toledo)', 'X Monográfica Winner del AEFRBF', 'X Monográfica Winner del AEFRBF', '2024-11-19T02:19', '2024-09-01T00:00', '', '', 50, 'monografica'),
(22, NULL, b'1', 'https://cegas.expodogs.es/2025/cegas2025.jpg', b'1', 0, 50, 'Club Español del Galgo Afgano, Saluki y Demás Lebreles Extranjeros', '2025-02-22', 'Valladolid', 'XLIII Monográfica del CEGAS & DLE', 'XLIII Monográfica del CEGAS & DLE', '2025-02-12T02:21', '2024-09-01T00:00', '', '', 50, 'monografica'),
(26, 'internacional', b'1', 'https://scaragon.expodogs.es/aragon2024/cartel.jpg', b'0', 0, 0, 'Sociedad Canina de Bizkaia', '2024-11-18', 'TARRAGONA', 'a', 'a', '2024-11-18T09:53', '2024-12-01T13:53', '', '', 5, 'exposicion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id_inscripcion` bigint(20) NOT NULL,
  `clase` varchar(255) DEFAULT NULL,
  `cod_pago` varchar(255) NOT NULL,
  `fecha_inscripcion` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `id_exposicion` bigint(20) NOT NULL,
  `id_perro` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id_inscripcion`, `clase`, `cod_pago`, `fecha_inscripcion`, `precio`, `id_exposicion`, `id_perro`, `id_usuario`, `estado`) VALUES
(27, 'Intermedia', '202411162333241', '2024-11-16T23:33:24.466356400', 15, 18, 11, 1, 'completo'),
(30, 'Veteranos', '2024111623382828', '2024-11-16T23:38:36.595692700', 30, 18, 16, 28, 'pendiente'),
(32, 'Cachorros', '202411171352231', '2024-11-17T13:52:23.502195200', 50, 17, 17, 1, 'pendiente'),
(35, 'Clase Abierta', '202411171451261', '2024-11-17T14:51:26.741698700', 50, 17, 11, 1, 'Pendiente'),
(39, 'Clase Abierta', '202501240944531', '2025-01-24T09:44:53.432737100', 50, 20, 11, 1, 'Pendiente'),
(40, 'Clase Abierta', '202501240944531', '2025-01-24T09:44:53.444504100', 50, 20, 17, 1, 'Pendiente'),
(41, 'Clase Abierta', '202501240944531', '2025-01-24T09:44:53.457052900', 50, 20, 20, 1, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perros`
--

CREATE TABLE `perros` (
  `id_perro` bigint(20) NOT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  `libro` varchar(255) DEFAULT NULL,
  `madre` varchar(255) DEFAULT NULL,
  `microchip` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numero_libro` varchar(255) DEFAULT NULL,
  `padre` varchar(255) DEFAULT NULL,
  `raza` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `id_usuario` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `perros`
--

INSERT INTO `perros` (`id_perro`, `fecha_nacimiento`, `libro`, `madre`, `microchip`, `nombre`, `numero_libro`, `padre`, `raza`, `sexo`, `id_usuario`) VALUES
(11, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', 1),
(16, '2024-10-28', 'LOE', 'O\'FEE-LY HAPPY DAY OF CYLY OF COURSE ', '941010000287892', 'Ai Mi Chico', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', 28),
(17, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS ', 'Perro pastor vasco', 'Macho', 1),
(20, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `activo` bit(1) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `baneado` bit(1) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_socio` bit(1) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `telefono1` varchar(255) DEFAULT NULL,
  `telefono2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `activo`, `apellidos`, `baneado`, `ciudad`, `cp`, `direccion`, `dni`, `email`, `is_socio`, `localidad`, `nombre`, `pais`, `password`, `provincia`, `telefono1`, `telefono2`) VALUES
(1, b'1', 'Cantero García', b'0', 'Calasparra', '30420', 'Calle Cuesta Blanca, Nº 8', '1234123412', 'jccanterogarcia@gmail.com', b'1', 'Calasparra', 'José Carlos', 'España', '123456', 'Murcia', '622024712', '622024712'),
(27, b'1', 'Cantero Pérez', b'0', 'Calasparra', '30420', 'Avenida Juan Rámón Jiménez\r\n141', '52812013B', 'expodogs@gmail.com', b'1', 'Calasparra', 'Juan Antonio', 'España', '', 'Murcia', '639118311', ''),
(28, b'1', 'García Milla', b'0', 'Albacete', '02006', 'Calle Concepción', '12345678A', 'lafilo@gmail.com', b'1', 'Albacete', 'Ana Belén', 'España', '123456', 'Albacete', '671213804', '671213804'),
(37, b'1', 'Cabeza', b'0', 'La Felipa', '02156', 'Calle Albacete, Nº20', '40366835H', 'jac@gmail.com', b'0', 'La Felipa', 'José Ángel', 'España', '123456', 'Albacete', '659123445', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `exposiciones`
--
ALTER TABLE `exposiciones`
  ADD PRIMARY KEY (`id_exposicion`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `FK27d0nj7ts1iwf3usup0b2jw6p` (`id_exposicion`),
  ADD KEY `FK5uvat2snuba1tcj2voe4hd6f` (`id_perro`),
  ADD KEY `FKb8p9mtsaog816n0pvw70tve16` (`id_usuario`);

--
-- Indices de la tabla `perros`
--
ALTER TABLE `perros`
  ADD PRIMARY KEY (`id_perro`),
  ADD KEY `FKp089vt4l3g1ta35ondwmvfgio` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `exposiciones`
--
ALTER TABLE `exposiciones`
  MODIFY `id_exposicion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `perros`
--
ALTER TABLE `perros`
  MODIFY `id_perro` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `FK27d0nj7ts1iwf3usup0b2jw6p` FOREIGN KEY (`id_exposicion`) REFERENCES `exposiciones` (`id_exposicion`),
  ADD CONSTRAINT `FK5uvat2snuba1tcj2voe4hd6f` FOREIGN KEY (`id_perro`) REFERENCES `perros` (`id_perro`),
  ADD CONSTRAINT `FKb8p9mtsaog816n0pvw70tve16` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `perros`
--
ALTER TABLE `perros`
  ADD CONSTRAINT `FKp089vt4l3g1ta35ondwmvfgio` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
