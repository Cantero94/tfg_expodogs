-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-03-2025 a las 03:19:36
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
-- Base de datos: `jccanterog04_expodogs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cod_pagos`
--

CREATE TABLE `cod_pagos` (
  `id_pago` bigint(20) NOT NULL,
  `cod_pago` varchar(255) NOT NULL,
  `estado` enum('pendiente','pagado','fallido') DEFAULT 'pendiente',
  `total` double NOT NULL,
  `metodo_pago` varchar(255) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  `id_exposicion` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `cod_pagos`
--

INSERT INTO `cod_pagos` (`id_pago`, `cod_pago`, `estado`, `total`, `metodo_pago`, `fecha_pago`, `createdAt`, `updatedAt`, `id_usuario`, `id_exposicion`) VALUES
(1, '196f4cd1eece27fb', 'pagado', 61.25, NULL, '2025-03-24 00:58:19', '2025-03-24 00:57:07', '2025-03-24 00:58:19', 1, 21),
(2, '74430727a5d50d84', 'pagado', 35, NULL, '2025-03-24 01:00:43', '2025-03-24 00:59:51', '2025-03-24 01:00:43', 1, 21),
(3, '1e089a6be970d8f7', 'pendiente', 87.5, NULL, NULL, '2025-03-24 01:06:03', '2025-03-24 01:06:03', 1, 24),
(4, '1f9e5ad5fe20553c', 'pagado', 110, NULL, '2025-03-24 01:10:51', '2025-03-24 01:10:10', '2025-03-24 01:10:51', 11, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exposiciones`
--

CREATE TABLE `exposiciones` (
  `id_exposicion` bigint(20) NOT NULL,
  `ambito` varchar(255) DEFAULT NULL,
  `cargo_paypal` tinyint(1) DEFAULT NULL,
  `cartel` varchar(255) DEFAULT NULL,
  `contar_veteranos` tinyint(1) DEFAULT NULL,
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
  `tipo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `exposiciones`
--

INSERT INTO `exposiciones` (`id_exposicion`, `ambito`, `cargo_paypal`, `cartel`, `contar_veteranos`, `descuento_razas`, `descuento_socios`, `entidad_organizadora`, `fecha`, `lugar`, `nombre`, `nombre_corto`, `plazo1_fin`, `plazo1_inicio`, `plazo2_fin`, `plazo2_inicio`, `precio_inscripcion`, `tipo`, `createdAt`, `updatedAt`) VALUES
(1, 'nacional', NULL, 'img/medina2023.webp', NULL, 20, 20, 'Sociedad Canina Medinense', '2022-10-01', 'Medina del Campo', 'Exposición Nacional Medina 2022', 'Nac. Medina 2022', '2022-09-20T23:59', '2022-08-01T00:00', '', '', 30, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(2, 'nacional', NULL, 'img/medina2024.webp', NULL, 10, 15, 'Sociedad Canina Medinense', '2023-03-10', 'Medina del Campo', 'Exposición Nacional Medina 2023', 'Nac. Medina 2023', '2023-02-28T23:59', '2022-12-01T00:00', '', '', 25, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(3, 'nacional', NULL, 'img/bilbao2024.webp', NULL, 50, 50, 'Sociedad Canina de Bizkaia', '2023-09-08', 'Muskiz (Bizkaia)', 'Exposición Nacional Bilbao 2023', 'Nac. Bilbao 2023', '2023-07-31T23:59', '2023-06-01T00:00', '', '', 40, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(4, 'nacional', NULL, 'img/sanbernardo2024.webp', NULL, 0, 50, 'Club Español del Perro San Bernardo', '2024-01-15', 'Camping Cazalegas', 'Monográfica San Bernardo Invierno 2024', 'Monográfica SB 2024 (1)', '2023-12-31T23:59', '2023-11-01T00:00', '', '', 35, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(5, 'nacional', NULL, 'img/sanbernardo2025.webp', NULL, 0, 50, 'Club Español del Perro San Bernardo', '2024-02-28', 'Camping Cazalegas', 'Monográfica San Bernardo 2024', 'Monográfica SB 2024 (2)', '2024-02-15T23:59', '2023-12-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(6, 'monográfica', NULL, 'img/2024_MONOGRAFICA.webp', NULL, 10, 20, 'Club Monográfico Canino', '2024-01-20', 'Madrid', 'Monográfica 2024', 'Mono. 2024 (1)', '2024-01-10T23:59', '2023-10-01T00:00', '', '', 45, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(7, 'monográfica', NULL, 'img/2024_WINNER.webp', NULL, 5, 5, 'Asoc. Bulldog Francés', '2023-11-23', 'Toledo', 'Monográfica Winner BF 2023', 'Winner BF 2023', '2023-11-10T23:59', '2023-09-01T00:00', '', '', 40, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(8, 'nacional', NULL, 'img/carlino2024.webp', NULL, 0, 0, 'Club Español del Carlino', '2022-08-05', 'Barcelona', 'Monográfica Carlino 2022', 'Mono. Carlino 2022', '2022-07-25T23:59', '2022-06-01T00:00', '', '', 25, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(9, 'nacional', NULL, 'img/cegas2024.webp', NULL, 50, 50, 'Club Español del Galgo Afgano, Saluki...', '2023-02-22', 'Valladolid', 'Monográfica CEGAS 2023', 'CEGAS 2023', '2023-02-12T23:59', '2022-12-01T00:00', '', '', 45, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(10, 'nacional', NULL, 'img/cegas2025.webp', NULL, 50, 50, 'Club Español del Galgo Afgano, Saluki...', '2024-02-15', 'Valladolid', 'Monográfica CEGAS 2024 (Invierno)', 'CEGAS 2024 (1)', '2024-02-01T23:59', '2023-10-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(11, 'nacional', NULL, 'img/collie2024.webp', NULL, 30, 30, 'Club Español del Collie', '2021-06-20', 'Málaga', 'Exposición Nacional Collie 2021', 'Nac. Collie 2021', '2021-06-10T23:59', '2021-04-01T00:00', '', '', 28, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(12, 'nacional', NULL, 'img/collie2025.webp', NULL, 50, 10, 'Club Español del Collie', '2019-09-01', 'Málaga', 'Exposición Nacional Collie 2019', 'Nac. Collie 2019', '2019-08-20T23:59', '2019-06-01T00:00', '', '', 35, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(13, 'internacional', NULL, 'img/cre2024.webp', NULL, 5, 5, 'Club Español del Rottweiler', '2020-11-23', 'San Martín de la Vega', 'Klubsieger CRE 2020', 'CRE 2020', '2020-11-10T23:59', '2020-09-01T00:00', '', '', 40, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(14, 'internacional', NULL, 'img/cre2025.webp', NULL, 50, 50, 'Club Español del Rottweiler', '2018-07-10', 'San Martín de la Vega', 'Klubsieger CRE 2018', 'CRE 2018', '2018-06-20T23:59', '2018-04-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(15, 'nacional', NULL, 'img/sca2024.webp', NULL, 20, 20, 'Sociedad Canina Andaluza', '2017-10-28', 'Sevilla', 'Exposición Nacional SCA 2017', 'Nac. SCA 2017', '2017-10-01T23:59', '2017-07-01T00:00', '', '', 33, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(16, 'nacional', NULL, 'img/medina2023.webp', NULL, 0, 50, 'Sociedad Canina Medinense', '2021-04-10', 'Medina del Campo', 'Exposición Nacional Medina 2021', 'Nac. Medina 2021', '2021-03-31T23:59', '2021-02-01T00:00', '', '', 28, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(17, 'nacional', NULL, 'img/bilbao2024.webp', NULL, 10, 10, 'Sociedad Canina de Bizkaia', '2022-06-05', 'Muskiz (Bizkaia)', 'Exposición Nacional Bilbao 2022', 'Nac. Bilbao 2022', '2022-05-20T23:59', '2022-03-01T00:00', '', '', 35, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(18, 'monográfica', NULL, 'img/2024_MONOGRAFICA.webp', NULL, 15, 15, 'Club Monográfico Canino', '2024-02-05', 'Madrid', 'Monográfica 2024 (2)', 'Mono. 2024 (2)', '2024-01-25T23:59', '2023-10-15T00:00', '', '', 45, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(19, 'nacional', NULL, 'img/carlino2024.webp', NULL, 0, 50, 'Club Español del Carlino', '2023-10-20', 'Barcelona', 'Monográfica Carlino Otoño 2023', 'Mono. Carlino 2023', '2023-10-10T23:59', '2023-08-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(20, 'internacional', NULL, 'img/sanbernardo2024.webp', NULL, 50, 0, 'Club Español del Perro San Bernardo', '2022-03-15', 'Camping Cazalegas', 'Monográfica San Bernardo 2022', 'San Bernardo 2022', '2022-03-01T23:59', '2022-01-01T00:00', '', '', 48, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(21, 'nacional', NULL, 'img/sca2024.webp', NULL, 0, 10, 'Sociedad Canina Andaluza', '2025-05-01', 'Sevilla', 'Exposición Nacional SCA 2025', 'Nac. SCA 2025', '2025-04-20T23:59', '2025-01-01T00:00', '', '', 35, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(22, 'nacional', NULL, 'img/2024_WINNER.webp', NULL, 20, 20, 'Asoc. Bulldog Francés', '2025-06-10', 'Toledo', 'Monográfica Winner BF 2025', 'Winner BF 2025', '2025-05-31T23:59', '2025-01-01T00:00', '', '', 40, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(23, 'nacional', NULL, 'img/collie2024.webp', NULL, 30, 30, 'Club Español del Collie', '2025-07-12', 'Málaga', 'Exposición Nacional Collie 2025', 'Nac. Collie 2025', '2025-06-30T23:59', '2025-01-01T00:00', '', '', 38, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(24, 'internacional', NULL, 'img/cre2025.webp', NULL, 50, 50, 'Club Español del Rottweiler', '2025-07-25', 'San Martín de la Vega', 'Klubsieger CRE Verano 2025', 'CRE 2025 Verano', '2025-07-10T23:59', '2025-01-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(25, 'nacional', NULL, 'img/medina2024.webp', NULL, 0, 50, 'Sociedad Canina Medinense', '2025-08-15', 'Medina del Campo', 'Exposición Nacional Medina 2025', 'Nac. Medina 2025', '2025-08-01T23:59', '2025-01-01T00:00', '', '', 30, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(26, 'nacional', NULL, 'img/sanbernardo2025.webp', NULL, 50, 50, 'Club Español del Perro San Bernardo', '2025-09-02', 'Camping Cazalegas', 'Monográfica San Bernardo 2025', 'San Bernardo 2025', '2025-08-20T23:59', '2025-01-01T00:00', '', '', 55, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(27, 'nacional', NULL, 'img/collie2025.webp', NULL, 10, 15, 'Club Español del Collie', '2025-10-12', 'Málaga', 'Exposición Nacional Collie Otoño 2025', 'Nac. Collie Otoño 2025', '2025-10-01T23:59', '2025-01-01T00:00', '', '', 42, 'exposicion', '2025-03-21 18:39:28', '2025-03-21 18:39:28'),
(28, 'nacional', NULL, 'img/cegas2024.webp', NULL, 0, 50, 'Club Español del Galgo Afgano, Saluki...', '2025-11-01', 'Valladolid', 'Monográfica CEGAS 2025', 'CEGAS 2025 (Otoño)', '2025-10-20T23:59', '2025-01-01T00:00', '', '', 50, 'monografica', '2025-03-21 18:39:28', '2025-03-21 18:39:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id_inscripcion` bigint(20) NOT NULL,
  `clase` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `tarifa_aplicada` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_pago` bigint(20) DEFAULT NULL,
  `id_exposicion` bigint(20) DEFAULT NULL,
  `id_perro` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id_inscripcion`, `clase`, `precio`, `tarifa_aplicada`, `createdAt`, `updatedAt`, `id_pago`, `id_exposicion`, `id_perro`, `id_usuario`) VALUES
(1, 'Campeones Jóvenes', 35, 'Primer perro', '2025-03-24 00:57:07', '2025-03-24 00:57:07', 1, 21, 1, 1),
(2, 'Trabajo', 26.25, 'Segundo perro', '2025-03-24 00:57:07', '2025-03-24 00:57:07', 1, 21, 4, 1),
(3, 'Jóvenes', 17.5, 'Tercer perro y siguientes', '2025-03-24 00:59:51', '2025-03-24 00:59:51', 2, 21, 5, 1),
(4, 'Veteranos', 17.5, 'Tercer perro y siguientes', '2025-03-24 00:59:51', '2025-03-24 00:59:51', 2, 21, 11, 1),
(5, 'Intermedia', 50, 'Primer perro', '2025-03-24 01:06:03', '2025-03-24 01:06:03', 3, 24, 1, 1),
(6, 'Veteranos', 37.5, 'Segundo perro', '2025-03-24 01:06:03', '2025-03-24 01:06:03', 3, 24, 4, 1),
(7, 'Cachorros', 40, 'Primer perro', '2025-03-24 01:10:11', '2025-03-24 01:10:11', 4, 22, 69, 11),
(8, 'Cachorros', 30, 'Segundo perro', '2025-03-24 01:10:11', '2025-03-24 01:10:11', 4, 22, 70, 11),
(9, 'Trabajo', 20, 'Tercer perro y siguientes', '2025-03-24 01:10:11', '2025-03-24 01:10:11', 4, 22, 72, 11),
(10, 'Abierta', 20, 'Tercer perro y siguientes', '2025-03-24 01:10:11', '2025-03-24 01:10:11', 4, 22, 74, 11);

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `perros`
--

INSERT INTO `perros` (`id_perro`, `fecha_nacimiento`, `libro`, `madre`, `microchip`, `nombre`, `numero_libro`, `padre`, `raza`, `sexo`, `createdAt`, `updatedAt`, `id_usuario`) VALUES
(1, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(2, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(3, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(4, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(5, '2020-01-10', 'LOE', 'CORA DE LA MONTAÑA', '946372635271845', 'Bobby de la Sierra', '3984756', 'Thor de las Nieves', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(6, '2017-03-15', 'LOE', 'LUNA DE LOS BOSQUES', '948362635271867', 'Max de los Llanos', '3984761', 'Duke del Valle', 'Perro pastor vasco', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(7, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(8, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(9, '2019-12-11', 'LOE', 'NINA DE LAS ROCAS', '948362635271888', 'Toby del Valle', '3984770', 'Bruno del Río', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(10, '2015-02-25', 'LOE', 'MIMI DE LUX', '948362635271899', 'Oscar de Windsor', '3984772', 'Charlie de Londres', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(11, '2021-08-14', 'LOE', 'DAMA DE CASTILLA', '942345678900001', 'Simba de la Mancha', '3456789', 'Max de Madrid', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(12, '2022-01-30', 'LOE', 'CINDY DEL NORTE', '945678900123456', 'Luna de Aragón', '4567890', 'Zeus del Sur', 'Dobermann', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(13, '2019-11-10', 'LOE', 'TARA DEL PIRINEO', '947890012345678', 'Rocky de Cataluña', '5678901', 'Rex de España', 'Perro pastor vasco', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(14, '2020-06-05', 'LOE', 'LOLA DE ASTURIAS', '949012345678901', 'Nina del Cantábrico', '6789012', 'Duke del Atlántico', 'Perro pastor vasco', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(15, '2023-02-22', 'LOE', 'COCO DEL BOSQUE', '941234567890123', 'Toby del Prado', '7890123', 'Milo de los Valles', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(16, '2018-04-18', 'LOE', 'SUSI DE CANARIAS', '943456789012345', 'Bella del Teide', '8901234', 'Ricky de Gran Canaria', 'Yorkshire Terrier', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(17, '2017-07-29', 'LOE', 'DULCE DEL MAR', '945678901234567', 'Lola de las Olas', '9012345', 'Simón del Pacífico', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(18, '2021-10-10', 'LOE', 'CANELA DEL SOL', '947890123456789', 'Max del Caribe', '0123456', 'Bobby del Trópico', 'Perro pastor vasco', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(19, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Zeus de la Giralda', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(20, '2022-09-25', 'LOE', 'MIMI DE CATALUÑA', '941234567890134', 'Oscar del Mediterráneo', '2345678', 'Lucas de Barcelona', 'Yorkshire Terrier', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(21, '2016-12-19', 'LOE', 'TARA DE LEÓN', '943456789012356', 'Rocky de Castilla', '3456789', 'Leo del Bierzo', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(22, '2018-07-30', 'LOE', 'LUCY DE LA VEGA', '945678901234568', 'Coco del Valle', '4567890', 'Simón del Monte', 'Perro pastor vasco', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(23, '2023-06-15', 'LOE', 'DULCE DEL CIELO', '947890123456780', 'Nina del Sol', '5678901', 'Rex del Universo', 'Yorkshire Terrier', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(24, '2019-04-05', 'LOE', 'NINA DE LOS CAMPOS', '949012345678913', 'Toby de la Granja', '6789012', 'Max del Río', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(25, '2015-05-20', 'LOE', 'COCO DEL BOSQUE', '941234567890125', 'Bobby de los Robles', '7890123', 'Zeus del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(26, '2021-11-11', 'LOE', 'BELLA DEL LAGO', '943456789012347', 'Charlie del Río', '8901234', 'Simba del Bosque', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(27, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Dobermann', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(28, '2023-01-14', 'LOE', 'CINDY DEL BOSQUE', '947890123456781', 'Toby del Valle', '0123456', 'Bruno de la Montaña', 'Perro pastor vasco', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(29, '2018-09-03', 'LOE', 'LUNA DEL SOL', '949012345678914', 'Nina del Prado', '1234567', 'Leo de Castilla', 'Yorkshire Terrier', 'Macho', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(30, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-21 18:31:41', '2025-03-21 18:31:41', 1),
(33, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(34, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(35, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(36, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(37, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(38, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Perro pastor vasco', 'Macho', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(39, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(40, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(41, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Coco del Valle', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:01:10', '2025-03-23 12:01:10', NULL),
(42, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(43, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(44, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(45, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(46, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(47, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Perro pastor vasco', 'Macho', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(48, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(49, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(50, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Coco del Valle', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:14:48', '2025-03-23 12:14:48', 3),
(51, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(52, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(53, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(54, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(55, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(56, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Perro pastor vasco', 'Macho', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(57, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(58, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(59, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Coco del Valle', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:18:37', '2025-03-23 12:18:37', 4),
(60, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(61, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(62, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(63, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(64, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(65, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Perro pastor vasco', 'Macho', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(66, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(67, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(68, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Coco del Valle', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Hembra', '2025-03-23 12:34:32', '2025-03-23 12:34:32', 5),
(69, '2015-02-25', 'LOE', 'FANTA DE BRU-COR`S', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(70, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(71, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(72, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(73, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(74, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Perro pastor vasco', 'Macho', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(75, '2014-11-13', 'LOE', 'FANTA DE BRUT-COR`S', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(76, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11),
(77, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Coco del Valle', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Hembra', '2025-03-24 01:09:52', '2025-03-24 01:09:52', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `activo` tinyint(1) DEFAULT 0,
  `apellidos` varchar(255) DEFAULT NULL,
  `baneado` tinyint(1) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `telefono1` varchar(255) DEFAULT NULL,
  `telefono2` varchar(255) DEFAULT NULL,
  `token_verificacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `activo`, `apellidos`, `baneado`, `ciudad`, `cp`, `direccion`, `dni`, `email`, `nombre`, `pais`, `password`, `provincia`, `telefono1`, `telefono2`, `token_verificacion`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Cantero García', 0, 'Calasparra', '30420', 'Calle Cuesta Blanca', '48743042Q', 'jccanterogarcia@gmail.com', 'José Carlos', 'España', '$2b$10$sa9c9e1fXoGR/Fb4c8NUqOQMnXv7c/r7Dl0e7fPTAuSB9A.iKBxPS', 'Murcia', '622024712', '639118311', '8bd10aa863345d9f2a81a7b062f958eddfc32f3f40181d1718e3cd9d97caed40', '2025-03-21 17:30:47', '2025-03-23 23:25:02'),
(3, 1, 'Fernández Martínez', 0, 'Albacete', '02005', 'C/Ignacio Monturiol N1 2D', '47092665G', 'miriamp3@hotmail.com', 'Miriam', 'España', '$2b$10$CG3u21BPJweMyzwTPmqdEuvA7L3jkwLz6D2Iw6k8tKM/Lto531Qkm', 'Albacete', '635019027', '', NULL, '2025-03-23 12:13:52', '2025-03-23 12:14:34'),
(4, 1, 'Ríos Hernández', 0, 'Albacete', '02001', 'C/ Alcalde Conangla, n58, 3D', '47448384M', 'edasr.94@gmail.com', 'María', 'España', '$2b$10$mS3UOJNwrxrvH.37b4Xk1.NT9x923jjGUKD7fVJvRgS2JsN2hbbJW', 'España', '625555484', '', NULL, '2025-03-23 12:17:56', '2025-03-23 12:18:24'),
(5, 1, 'CANTERO PEREZ', 0, 'CALASPARRA', '30420', 'I De Mayo, 24', '52812013B', 'jant.cantero@gmail.com', 'JUAN ANTONIO', 'España', '$2b$10$R5BkdWYZbqKw7LQhDTHCJ.xqui17gucM0nZ41EupeRkNng6064jEG', 'MURCIA', '639118311', '', NULL, '2025-03-23 12:33:38', '2025-03-23 12:34:12'),
(11, 1, 'Cantero García', 0, 'Calasparra', '30420', 'Calle Cuesta Blanca', '48743042Q', 'jc.canterito@gmail.com', 'José Carlos', 'España', '$2b$10$HnW2n8HWh4Bxmtkf/54dOeuZBjbdHHV.kOPR8606WFMOFgfCfEXQe', 'Murcia', '622024712', '', NULL, '2025-03-24 01:09:22', '2025-03-24 01:09:37');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cod_pagos`
--
ALTER TABLE `cod_pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD UNIQUE KEY `cod_pago` (`cod_pago`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_exposicion` (`id_exposicion`);

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
  ADD KEY `id_pago` (`id_pago`),
  ADD KEY `id_exposicion` (`id_exposicion`),
  ADD KEY `id_perro` (`id_perro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `perros`
--
ALTER TABLE `perros`
  ADD PRIMARY KEY (`id_perro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cod_pagos`
--
ALTER TABLE `cod_pagos`
  MODIFY `id_pago` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `exposiciones`
--
ALTER TABLE `exposiciones`
  MODIFY `id_exposicion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `perros`
--
ALTER TABLE `perros`
  MODIFY `id_perro` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cod_pagos`
--
ALTER TABLE `cod_pagos`
  ADD CONSTRAINT `cod_pagos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cod_pagos_ibfk_2` FOREIGN KEY (`id_exposicion`) REFERENCES `exposiciones` (`id_exposicion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_pago`) REFERENCES `cod_pagos` (`id_pago`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_exposicion`) REFERENCES `exposiciones` (`id_exposicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`id_perro`) REFERENCES `perros` (`id_perro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perros`
--
ALTER TABLE `perros`
  ADD CONSTRAINT `perros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
