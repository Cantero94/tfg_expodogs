-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-03-2025 a las 15:10:50
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
  `fecha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
(1, 'nacional', b'1', 'http://expodogs.es/media/img/medina2023.webp', b'1', 20, 20, 'Sociedad Canina Medinense', '2022-10-01', 'Medina del Campo', 'Exposición Nacional Medina 2022', 'Nac. Medina 2022', '2022-09-20T23:59', '2022-08-01T00:00', '', '', 30, 'exposicion'),
(2, 'nacional', b'1', 'http://expodogs.es/media/img/medina2024.webp', b'1', 10, 15, 'Sociedad Canina Medinense', '2023-03-10', 'Medina del Campo', 'Exposición Nacional Medina 2023', 'Nac. Medina 2023', '2023-02-28T23:59', '2022-12-01T00:00', '', '', 25, 'exposicion'),
(3, 'nacional', b'1', 'http://expodogs.es/media/img/bilbao2024.webp', b'0', 50, 50, 'Sociedad Canina de Bizkaia', '2023-09-08', 'Muskiz (Bizkaia)', 'Exposición Nacional Bilbao 2023', 'Nac. Bilbao 2023', '2023-07-31T23:59', '2023-06-01T00:00', '', '', 40, 'exposicion'),
(4, 'nacional', b'1', 'http://expodogs.es/media/img/sanbernardo2024.webp', b'1', 0, 50, 'Club Español del Perro San Bernardo', '2024-01-15', 'Camping Cazalegas', 'Monográfica San Bernardo Invierno 2024', 'Monográfica SB 2024 (1)', '2023-12-31T23:59', '2023-11-01T00:00', '', '', 35, 'monografica'),
(5, 'nacional', b'0', 'http://expodogs.es/media/img/sanbernardo2025.webp', b'1', 0, 50, 'Club Español del Perro San Bernardo', '2024-02-28', 'Camping Cazalegas', 'Monográfica San Bernardo 2024', 'Monográfica SB 2024 (2)', '2024-02-15T23:59', '2023-12-01T00:00', '', '', 50, 'monografica'),
(6, 'monográfica', b'1', 'http://expodogs.es/media/img/2024_MONOGRAFICA.webp', b'1', 10, 20, 'Club Monográfico Canino', '2024-01-20', 'Madrid', 'Monográfica 2024', 'Mono. 2024 (1)', '2024-01-10T23:59', '2023-10-01T00:00', '', '', 45, 'monografica'),
(7, 'monográfica', b'1', 'http://expodogs.es/media/img/2024_WINNER.webp', b'1', 5, 5, 'Asoc. Bulldog Francés', '2023-11-23', 'Toledo', 'Monográfica Winner BF 2023', 'Winner BF 2023', '2023-11-10T23:59', '2023-09-01T00:00', '', '', 40, 'monografica'),
(8, 'nacional', b'1', 'http://expodogs.es/media/img/carlino2024.webp', b'1', 0, 0, 'Club Español del Carlino', '2022-08-05', 'Barcelona', 'Monográfica Carlino 2022', 'Mono. Carlino 2022', '2022-07-25T23:59', '2022-06-01T00:00', '', '', 25, 'monografica'),
(9, 'nacional', b'1', 'http://expodogs.es/media/img/cegas2024.webp', b'1', 50, 50, 'Club Español del Galgo Afgano, Saluki...', '2023-02-22', 'Valladolid', 'Monográfica CEGAS 2023', 'CEGAS 2023', '2023-02-12T23:59', '2022-12-01T00:00', '', '', 45, 'monografica'),
(10, 'nacional', b'1', 'http://expodogs.es/media/img/cegas2025.webp', b'0', 50, 50, 'Club Español del Galgo Afgano, Saluki...', '2024-02-15', 'Valladolid', 'Monográfica CEGAS 2024 (Invierno)', 'CEGAS 2024 (1)', '2024-02-01T23:59', '2023-10-01T00:00', '', '', 50, 'monografica'),
(11, 'nacional', b'1', 'http://expodogs.es/media/img/collie2024.webp', b'1', 30, 30, 'Club Español del Collie', '2021-06-20', 'Málaga', 'Exposición Nacional Collie 2021', 'Nac. Collie 2021', '2021-06-10T23:59', '2021-04-01T00:00', '', '', 28, 'exposicion'),
(12, 'nacional', b'1', 'http://expodogs.es/media/img/collie2025.webp', b'1', 50, 10, 'Club Español del Collie', '2019-09-01', 'Málaga', 'Exposición Nacional Collie 2019', 'Nac. Collie 2019', '2019-08-20T23:59', '2019-06-01T00:00', '', '', 35, 'exposicion'),
(13, 'internacional', b'1', 'http://expodogs.es/media/img/cre2024.webp', b'1', 5, 5, 'Club Español del Rottweiler', '2020-11-23', 'San Martín de la Vega', 'Klubsieger CRE 2020', 'CRE 2020', '2020-11-10T23:59', '2020-09-01T00:00', '', '', 40, 'monografica'),
(14, 'internacional', b'1', 'http://expodogs.es/media/img/cre2025.webp', b'1', 50, 50, 'Club Español del Rottweiler', '2018-07-10', 'San Martín de la Vega', 'Klubsieger CRE 2018', 'CRE 2018', '2018-06-20T23:59', '2018-04-01T00:00', '', '', 50, 'monografica'),
(15, 'nacional', b'1', 'http://expodogs.es/media/img/sca2024.webp', b'1', 20, 20, 'Sociedad Canina Andaluza', '2017-10-28', 'Sevilla', 'Exposición Nacional SCA 2017', 'Nac. SCA 2017', '2017-10-01T23:59', '2017-07-01T00:00', '', '', 33, 'exposicion'),
(16, 'nacional', b'1', 'http://expodogs.es/media/img/medina2023.webp', b'1', 0, 50, 'Sociedad Canina Medinense', '2021-04-10', 'Medina del Campo', 'Exposición Nacional Medina 2021', 'Nac. Medina 2021', '2021-03-31T23:59', '2021-02-01T00:00', '', '', 28, 'exposicion'),
(17, 'nacional', b'1', 'http://expodogs.es/media/img/bilbao2024.webp', b'1', 10, 10, 'Sociedad Canina de Bizkaia', '2022-06-05', 'Muskiz (Bizkaia)', 'Exposición Nacional Bilbao 2022', 'Nac. Bilbao 2022', '2022-05-20T23:59', '2022-03-01T00:00', '', '', 35, 'exposicion'),
(18, 'monográfica', b'1', 'http://expodogs.es/media/img/2024_MONOGRAFICA.webp', b'1', 15, 15, 'Club Monográfico Canino', '2024-02-05', 'Madrid', 'Monográfica 2024 (2)', 'Mono. 2024 (2)', '2024-01-25T23:59', '2023-10-15T00:00', '', '', 45, 'monografica'),
(19, 'nacional', b'1', 'http://expodogs.es/media/img/carlino2024.webp', b'1', 0, 50, 'Club Español del Carlino', '2023-10-20', 'Barcelona', 'Monográfica Carlino Otoño 2023', 'Mono. Carlino 2023', '2023-10-10T23:59', '2023-08-01T00:00', '', '', 50, 'monografica'),
(20, 'internacional', b'1', 'http://expodogs.es/media/img/sanbernardo2024.webp', b'1', 50, 0, 'Club Español del Perro San Bernardo', '2022-03-15', 'Camping Cazalegas', 'Monográfica San Bernardo 2022', 'San Bernardo 2022', '2022-03-01T23:59', '2022-01-01T00:00', '', '', 48, 'monografica'),
(21, 'nacional', b'1', 'http://expodogs.es/media/img/sca2024.webp', b'1', 0, 10, 'Sociedad Canina Andaluza', '2025-05-01', 'Sevilla', 'Exposición Nacional SCA 2025', 'Nac. SCA 2025', '2025-04-20T23:59', '2025-03-25T00:00', '', '', 35, 'exposicion'),
(22, 'nacional', b'1', 'http://expodogs.es/media/img/2024_WINNER.webp', b'1', 20, 20, 'Asoc. Bulldog Francés', '2025-06-10', 'Toledo', 'Monográfica Winner BF 2025', 'Winner BF 2025', '2025-05-31T23:59', '2025-04-01T00:00', '', '', 40, 'monografica'),
(23, 'nacional', b'1', 'http://expodogs.es/media/img/collie2024.webp', b'1', 30, 30, 'Club Español del Collie', '2025-07-12', 'Málaga', 'Exposición Nacional Collie 2025', 'Nac. Collie 2025', '2025-06-30T23:59', '2025-05-01T00:00', '', '', 38, 'exposicion'),
(24, 'internacional', b'1', 'http://expodogs.es/media/img/cre2025.webp', b'1', 50, 50, 'Club Español del Rottweiler', '2025-07-25', 'San Martín de la Vega', 'Klubsieger CRE Verano 2025', 'CRE 2025 Verano', '2025-07-10T23:59', '2025-05-01T00:00', '', '', 50, 'monografica'),
(25, 'nacional', b'1', 'http://expodogs.es/media/img/medina2024.webp', b'0', 0, 50, 'Sociedad Canina Medinense', '2025-08-15', 'Medina del Campo', 'Exposición Nacional Medina 2025', 'Nac. Medina 2025', '2025-08-01T23:59', '2025-06-01T00:00', '', '', 30, 'exposicion'),
(26, 'nacional', b'1', 'http://expodogs.es/media/img/sanbernardo2025.webp', b'1', 50, 50, 'Club Español del Perro San Bernardo', '2025-09-02', 'Camping Cazalegas', 'Monográfica San Bernardo 2025', 'San Bernardo 2025', '2025-08-20T23:59', '2025-06-15T00:00', '', '', 55, 'monografica'),
(27, 'nacional', b'1', 'http://expodogs.es/media/img/collie2025.webp', b'1', 10, 15, 'Club Español del Collie', '2025-10-12', 'Málaga', 'Exposición Nacional Collie Otoño 2025', 'Nac. Collie Otoño 2025', '2025-10-01T23:59', '2025-08-01T00:00', '', '', 42, 'exposicion'),
(28, 'nacional', b'1', 'http://expodogs.es/media/img/cegas2024.webp', b'1', 0, 50, 'Club Español del Galgo Afgano, Saluki...', '2025-11-01', 'Valladolid', 'Monográfica CEGAS 2025', 'CEGAS 2025 (Otoño)', '2025-10-20T23:59', '2025-08-15T00:00', '', '', 50, 'monografica');

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
  `id_usuario` bigint(20) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `perros`
--

INSERT INTO `perros` (`id_perro`, `fecha_nacimiento`, `libro`, `madre`, `microchip`, `nombre`, `numero_libro`, `padre`, `raza`, `sexo`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, '2015-02-25', 'LOE', 'Nala de Can Duran', '941010000287892', 'Mei Dequiresa', '2669347', 'Smart connection unbelievable', 'Dobermann', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(2, '2024-10-29', 'LOE', 'FANTA DE BRUT-COR`S', '987654321123456', 'Vasco', '2669347', 'PRINCE CHARMANT DU DOMAINE DES JOYAUX TIBETAINS', 'Perro pastor vasco', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(3, '2014-11-13', 'LOE', 'LUNA DE LOS BOSQUES', '941010000287892', 'Theo de Marvel Lux', '2456234', 'Smart connection unbelievable', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(4, '2018-06-20', 'LOE', 'MARGA DE LOS CAMPOS', '948372635271823', 'Nala de Can Duran', '3487562', 'Rocky de Can Roca', 'Dobermann', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(5, '2020-01-10', 'LOE', 'CORA DE LA MONTAÑA', '946372635271845', 'Bobby de la Sierra', '3984756', 'Thor de las Nieves', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(6, '2017-03-15', 'LOE', 'LUNA DE LOS BOSQUES', '948362635271867', 'Max de los Llanos', '3984761', 'Duke del Valle', 'Perro pastor vasco', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(7, '2023-07-05', 'LOE', 'FIONA DEL RIO', '948362635271899', 'Bella del Lago', '3984769', 'Simba del Prado', 'Perro pastor vasco', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(8, '2016-09-22', 'LOE', 'DAISY DE LOS PINARES', '948362635271834', 'Lulu de la Vega', '3984764', 'Zeus del Monte', 'Yorkshire Terrier', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(9, '2019-12-11', 'LOE', 'NINA DE LAS ROCAS', '948362635271888', 'Toby del Valle', '3984770', 'Bruno del Río', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(10, '2015-02-25', 'LOE', 'MIMI DE LUX', '948362635271899', 'Oscar de Windsor', '3984772', 'Charlie de Londres', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(11, '2021-08-14', 'LOE', 'DAMA DE CASTILLA', '942345678900001', 'Simba de la Mancha', '3456789', 'Max de Madrid', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(12, '2022-01-30', 'LOE', 'CINDY DEL NORTE', '945678900123456', 'Luna de Aragón', '4567890', 'Zeus del Sur', 'Dobermann', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(13, '2019-11-10', 'LOE', 'TARA DEL PIRINEO', '947890012345678', 'Rocky de Cataluña', '5678901', 'Rex de España', 'Perro pastor vasco', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(14, '2020-06-05', 'LOE', 'LOLA DE ASTURIAS', '949012345678901', 'Nina del Cantábrico', '6789012', 'Duke del Atlántico', 'Perro pastor vasco', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(15, '2023-02-22', 'LOE', 'COCO DEL BOSQUE', '941234567890123', 'Toby del Prado', '7890123', 'Milo de los Valles', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(16, '2018-04-18', 'LOE', 'SUSI DE CANARIAS', '943456789012345', 'Bella del Teide', '8901234', 'Ricky de Gran Canaria', 'Yorkshire Terrier', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(17, '2017-07-29', 'LOE', 'DULCE DEL MAR', '945678901234567', 'Lola de las Olas', '9012345', 'Simón del Pacífico', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(18, '2021-10-10', 'LOE', 'CANELA DEL SOL', '947890123456789', 'Max del Caribe', '0123456', 'Bobby del Trópico', 'Perro pastor vasco', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(19, '2020-03-07', 'LOE', 'NENA DE SEVILLA', '949012345678912', 'Zeus de la Giralda', '1234567', 'Bruno de Andalucía', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(20, '2022-09-25', 'LOE', 'MIMI DE CATALUÑA', '941234567890134', 'Oscar del Mediterráneo', '2345678', 'Lucas de Barcelona', 'Yorkshire Terrier', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(21, '2016-12-19', 'LOE', 'TARA DE LEÓN', '943456789012356', 'Rocky de Castilla', '3456789', 'Leo del Bierzo', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(22, '2018-07-30', 'LOE', 'LUCY DE LA VEGA', '945678901234568', 'Coco del Valle', '4567890', 'Simón del Monte', 'Perro pastor vasco', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(23, '2023-06-15', 'LOE', 'DULCE DEL CIELO', '947890123456780', 'Nina del Sol', '5678901', 'Rex del Universo', 'Yorkshire Terrier', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(24, '2019-04-05', 'LOE', 'NINA DE LOS CAMPOS', '949012345678913', 'Toby de la Granja', '6789012', 'Max del Río', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(25, '2015-05-20', 'LOE', 'COCO DEL BOSQUE', '941234567890125', 'Bobby de los Robles', '7890123', 'Zeus del Prado', 'Perro pastor vasco', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(26, '2021-11-11', 'LOE', 'BELLA DEL LAGO', '943456789012347', 'Charlie del Río', '8901234', 'Simba del Bosque', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(27, '2017-03-30', 'LOE', 'FIONA DE LA PLAYA', '945678901234569', 'Rex del Mar', '9012345', 'Rocky del Océano', 'Dobermann', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(28, '2023-01-14', 'LOE', 'CINDY DEL BOSQUE', '947890123456781', 'Toby del Valle', '0123456', 'Bruno de la Montaña', 'Perro pastor vasco', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(29, '2018-09-03', 'LOE', 'LUNA DEL SOL', '949012345678914', 'Nina del Prado', '1234567', 'Leo de Castilla', 'Yorkshire Terrier', 'Macho', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08'),
(30, '2019-07-07', 'LOE', 'MIMI DEL AMOR', '941234567890126', 'Zeus del Destino', '2345678', 'Bobby del Futuro', 'Dobermann', 'Hembra', 1, '2025-03-19 14:07:08', '2025-03-19 14:07:08');

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
  `nombre` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `telefono1` varchar(255) DEFAULT NULL,
  `telefono2` varchar(255) DEFAULT NULL,
  `token_verificacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `activo`, `apellidos`, `baneado`, `ciudad`, `cp`, `direccion`, `dni`, `email`, `nombre`, `pais`, `password`, `provincia`, `telefono1`, `telefono2`, `token_verificacion`, `createdAt`, `updatedAt`) VALUES
(1, b'1', 'Cantero', b'0', 'Calasparra', '30420', 'Calle Cuesta Blanca', '48743042Q', 'jccanterogarcia@gmail.com', 'José Carlos', 'España', '$2b$10$/dyUtWKAOLh32ayIBp7XEuDpQJbrdGkPVgcS9CJC8fSzav6hphVty', 'Murcia', '622024712', '639118311', NULL, '2025-03-14 08:25:42', '2025-03-19 13:32:56'),
(65, b'0', 'Cantero García', b'0', 'Calasparra', '30420', 'Calle Cuesta Blanca', '48743042Q', 'jc.canterito@gmail.com', 'José Carlos', 'España', '$2b$10$nKvy11/xKFx5FiRa/3FokOA6.xk9kdmeOfX2Ludco1leOK8vsR4Ku', 'Murcia', '622024712', '', 'ca9ee7255f971605403c8480ae24d528018bae691571cbf0fd3e0da8a419daa4', '2025-03-21 13:43:48', '2025-03-21 13:43:48');

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
  MODIFY `id_exposicion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `perros`
--
ALTER TABLE `perros`
  MODIFY `id_perro` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

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
