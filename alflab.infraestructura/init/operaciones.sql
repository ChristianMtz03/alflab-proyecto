-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2026 a las 02:11:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alflaboperaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `Id_cotizacion` int(11) NOT NULL,
  `Id_cliente` int(11) NOT NULL,
  `FechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `Estatus` varchar(20) NOT NULL DEFAULT 'Pendiente',
  `Total` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizaciones`
--

INSERT INTO `cotizaciones` (`Id_cotizacion`, `Id_cliente`, `FechaCreacion`, `Estatus`, `Total`) VALUES
(2, 4, '2026-03-26 00:34:22', 'Pendiente', 346.50),
(3, 1, '2026-03-26 00:42:28', 'Pendiente', 130.00),
(4, 1, '2026-03-26 14:16:31', 'Pendiente', 200.00),
(5, 1, '2026-03-26 14:16:31', 'Pendiente', 100.00),
(6, 1, '2026-03-26 14:16:31', 'Aprobada', 100.00),
(8, 1, '2026-03-26 14:17:42', 'Pendiente', 200.00),
(9, 1, '2026-03-26 14:17:42', 'Pendiente', 100.00),
(10, 1, '2026-03-26 14:17:42', 'Aprobada', 100.00),
(12, 1, '2026-03-26 14:19:08', 'Pendiente', 200.00),
(13, 1, '2026-03-26 14:19:08', 'Pendiente', 100.00),
(14, 1, '2026-03-26 14:19:08', 'Aprobada', 100.00),
(16, 1, '2026-03-26 14:19:58', 'Pendiente', 200.00),
(17, 1, '2026-03-26 14:19:58', 'Pendiente', 100.00),
(18, 1, '2026-03-26 14:19:58', 'Aprobada', 100.00),
(20, 1, '2026-03-26 14:31:37', 'Pendiente', 200.00),
(21, 1, '2026-03-26 14:31:37', 'Pendiente', 100.00),
(22, 1, '2026-03-26 14:31:37', 'Aprobada', 100.00),
(24, 1, '2026-03-26 14:41:51', 'Pendiente', 200.00),
(25, 1, '2026-03-26 14:41:51', 'Pendiente', 100.00),
(26, 1, '2026-03-26 14:41:51', 'Aprobada', 100.00),
(28, 1, '2026-03-26 14:56:36', 'Pendiente', 200.00),
(29, 1, '2026-03-26 14:56:36', 'Pendiente', 100.00),
(30, 1, '2026-03-26 14:56:36', 'Aprobada', 100.00),
(32, 1, '2026-03-26 15:01:46', 'Pendiente', 200.00),
(33, 1, '2026-03-26 15:01:46', 'Pendiente', 100.00),
(34, 1, '2026-03-26 15:01:46', 'Aprobada', 100.00),
(36, 1, '2026-03-26 15:02:43', 'Pendiente', 200.00),
(37, 1, '2026-03-26 15:02:43', 'Pendiente', 100.00),
(38, 1, '2026-03-26 15:02:43', 'Aprobada', 100.00),
(40, 1, '2026-03-26 15:02:56', 'Pendiente', 200.00),
(41, 1, '2026-03-26 15:02:56', 'Pendiente', 100.00),
(42, 1, '2026-03-26 15:02:56', 'Aprobada', 100.00),
(44, 1, '2026-03-26 22:07:08', 'Pendiente', 200.00),
(45, 1, '2026-03-26 22:07:08', 'Pendiente', 100.00),
(46, 1, '2026-03-26 22:07:08', 'Aprobada', 100.00),
(48, 1, '2026-03-26 22:07:21', 'Pendiente', 200.00),
(49, 1, '2026-03-26 22:07:21', 'Pendiente', 100.00),
(50, 1, '2026-03-26 22:07:21', 'Aprobada', 100.00),
(52, 1, '2026-03-27 13:10:14', 'Pendiente', 200.00),
(53, 1, '2026-03-27 13:10:14', 'Pendiente', 100.00),
(54, 1, '2026-03-27 13:10:14', 'Aprobada', 100.00),
(56, 1, '2026-03-27 13:10:24', 'Pendiente', 200.00),
(57, 1, '2026-03-27 13:10:24', 'Pendiente', 100.00),
(58, 1, '2026-03-27 13:10:24', 'Aprobada', 100.00),
(60, 1, '2026-03-27 13:11:53', 'Pendiente', 200.00),
(61, 1, '2026-03-27 13:11:53', 'Pendiente', 100.00),
(62, 1, '2026-03-27 13:11:53', 'Aprobada', 100.00),
(64, 1, '2026-03-27 13:12:05', 'Pendiente', 200.00),
(65, 1, '2026-03-27 13:12:05', 'Pendiente', 100.00),
(66, 1, '2026-03-27 13:12:05', 'Aprobada', 100.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion_detalle`
--

CREATE TABLE `cotizacion_detalle` (
  `Id_detalle` int(11) NOT NULL,
  `Id_cotizacion` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL DEFAULT 1,
  `PrecioUnitario` decimal(10,2) NOT NULL,
  `Subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizacion_detalle`
--

INSERT INTO `cotizacion_detalle` (`Id_detalle`, `Id_cotizacion`, `Id_producto`, `Cantidad`, `PrecioUnitario`, `Subtotal`) VALUES
(2, 2, 2, 3, 85.50, 256.50),
(3, 2, 2, 2, 45.00, 90.00),
(4, 3, 3, 2, 65.00, 130.00),
(5, 4, 4, 2, 100.00, 200.00),
(6, 5, 4, 1, 100.00, 100.00),
(7, 6, 4, 1, 100.00, 100.00),
(9, 8, 9, 2, 100.00, 200.00),
(10, 9, 9, 1, 100.00, 100.00),
(11, 10, 9, 1, 100.00, 100.00),
(13, 12, 14, 2, 100.00, 200.00),
(14, 13, 14, 1, 100.00, 100.00),
(15, 14, 14, 1, 100.00, 100.00),
(17, 16, 19, 2, 100.00, 200.00),
(18, 17, 19, 1, 100.00, 100.00),
(19, 18, 19, 1, 100.00, 100.00),
(21, 20, 24, 2, 100.00, 200.00),
(22, 21, 24, 1, 100.00, 100.00),
(23, 22, 24, 1, 100.00, 100.00),
(25, 24, 32, 2, 100.00, 200.00),
(26, 25, 32, 1, 100.00, 100.00),
(27, 26, 32, 1, 100.00, 100.00),
(29, 28, 34, 2, 100.00, 200.00),
(30, 29, 34, 1, 100.00, 100.00),
(31, 30, 34, 1, 100.00, 100.00),
(33, 32, 39, 2, 100.00, 200.00),
(34, 33, 39, 1, 100.00, 100.00),
(35, 34, 39, 1, 100.00, 100.00),
(37, 36, 44, 2, 100.00, 200.00),
(38, 37, 44, 1, 100.00, 100.00),
(39, 38, 44, 1, 100.00, 100.00),
(41, 40, 49, 2, 100.00, 200.00),
(42, 41, 49, 1, 100.00, 100.00),
(43, 42, 49, 1, 100.00, 100.00),
(45, 44, 54, 2, 100.00, 200.00),
(46, 45, 54, 1, 100.00, 100.00),
(47, 46, 54, 1, 100.00, 100.00),
(49, 48, 59, 2, 100.00, 200.00),
(50, 49, 59, 1, 100.00, 100.00),
(51, 50, 59, 1, 100.00, 100.00),
(53, 52, 64, 2, 100.00, 200.00),
(54, 53, 64, 1, 100.00, 100.00),
(55, 54, 64, 1, 100.00, 100.00),
(57, 56, 69, 2, 100.00, 200.00),
(58, 57, 69, 1, 100.00, 100.00),
(59, 58, 69, 1, 100.00, 100.00),
(61, 60, 74, 2, 100.00, 200.00),
(62, 61, 74, 1, 100.00, 100.00),
(63, 62, 74, 1, 100.00, 100.00),
(65, 64, 79, 2, 100.00, 200.00),
(66, 65, 79, 1, 100.00, 100.00),
(67, 66, 79, 1, 100.00, 100.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Id_producto` int(11) NOT NULL,
  `CodigoBarra` varchar(50) NOT NULL,
  `NombreProducto` varchar(150) NOT NULL,
  `Caracteristicas` varchar(300) DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `CantidadExistencia` int(11) NOT NULL DEFAULT 0,
  `Id_proveedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Id_producto`, `CodigoBarra`, `NombreProducto`, `Caracteristicas`, `Precio`, `CantidadExistencia`, `Id_proveedor`) VALUES
(2, '7501000005678', 'Probeta Graduada 100ml', 'Vidrio borosilicato, graduación cada 1ml', 45.00, 15, NULL),
(3, '7501000009999', 'Vaso de Precipitado 500ml', 'Vidrio borosilicato, graduación cada 10ml', 65.00, 10, NULL),
(4, 'COT1774556191131', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(5, 'TEST1774556191158', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(6, 'TEST1774556191178', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(7, 'TEST1774556191223', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(9, 'COT1774556262255', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(10, 'TEST1774556262277', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(11, 'TEST1774556262290', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(12, 'TEST1774556262331', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(14, 'COT1774556348874', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(15, 'TEST1774556348888', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(16, 'TEST1774556348903', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(17, 'TEST1774556348948', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(19, 'COT1774556398323', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(20, 'TEST1774556398342', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(21, 'TEST1774556398357', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(22, 'TEST1774556398395', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(24, 'COT1774557097190', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(25, 'TEST1774557097320', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(26, 'TEST1774557097335', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(27, 'TEST1774557097381', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(29, 'TEST1774557711609', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(30, 'TEST1774557711626', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(31, 'TEST1774557711659', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(32, 'COT1774557711673', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(34, 'COT1774558595951', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(35, 'TEST1774558595955', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(36, 'TEST1774558595977', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(37, 'TEST1774558596015', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(39, 'COT1774558905958', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(40, 'TEST1774558905986', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(41, 'TEST1774558906000', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(42, 'TEST1774558906038', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(44, 'COT1774558963444', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(45, 'TEST1774558963470', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(46, 'TEST1774558963485', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(47, 'TEST1774558963527', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(49, 'COT1774558976687', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(50, 'TEST1774558976713', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(51, 'TEST1774558976728', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(52, 'TEST1774558976768', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(54, 'COT1774584427998', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(55, 'TEST1774584428026', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(56, 'TEST1774584428039', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(57, 'TEST1774584428074', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(59, 'COT1774584441406', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(60, 'TEST1774584441433', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(61, 'TEST1774584441445', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(62, 'TEST1774584441481', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(64, 'COT1774638613952', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(65, 'TEST1774638613981', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(66, 'TEST1774638613993', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(67, 'TEST1774638614031', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(69, 'COT1774638624507', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(70, 'TEST1774638624533', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(71, 'TEST1774638624546', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(72, 'TEST1774638624579', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(74, 'COT1774638713554', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(75, 'TEST1774638713581', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(76, 'TEST1774638713593', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(77, 'TEST1774638713628', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL),
(79, 'COT1774638725352', 'Producto Para Cotizacion Test', NULL, 100.00, 50, NULL),
(80, 'TEST1774638725366', 'Producto Test', 'Características de prueba', 99.99, 10, NULL),
(81, 'TEST1774638725377', 'Producto Para GetById', NULL, 50.00, 5, NULL),
(82, 'TEST1774638725410', 'Producto Actualizado', 'Nueva característica', 75.00, 8, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id_usuario` int(11) NOT NULL,
  `NombreUsuario` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Rol` varchar(50) NOT NULL DEFAULT 'Empleado',
  `Activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_usuario`, `NombreUsuario`, `Email`, `PasswordHash`, `Rol`, `Activo`) VALUES
(1, 'Administrador AlfLab', 'admin@alflab.mx', '$2b$10$F9/2eYizhbq94WfnEmKSQeiQh0XBfmEYzBD4ugZQ.IIJjfHZFMaMS', 'Administrador', 1),
(2, 'Usuario Test', 'test_1774556190987@alflab.mx', '$2b$10$G4N2Dt3LoGCbr6hTYZhuWeSZ6GWuFY11gdjnOtwOcSfIJDJktYfje', 'Empleado', 1),
(3, 'Usuario Test', 'test_1774556262094@alflab.mx', '$2b$10$yK3jUhBqS2e3Zka9utKPCOh4dfaoqH9w1uQw0LkXl736UxD1qe51.', 'Empleado', 1),
(4, 'Usuario Test', 'test_1774556348711@alflab.mx', '$2b$10$rj96S7EUbNK1HEoNWUZG0OrdgUWkB/KmOheTH/vSYeyaJSWGQkVpm', 'Empleado', 1),
(5, 'Usuario Test', 'test_1774556398189@alflab.mx', '$2b$10$JELJlZ.gfox.a.iaY7EvPuiVWF66FH0OnaFxTI6Dv0/NY9beUwzXq', 'Empleado', 1),
(6, 'Usuario Inactivo', 'inactivo@alflab.mx', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Empleado', 0),
(7, 'Usuario Test', 'test_1774557097163@alflab.mx', '$2b$10$S93tJjo43SOSG1s3ln.rK.hVjGzFhTcSmlK13pyCQYK0hQ3p0G/aC', 'Empleado', 1),
(8, 'Usuario Test', 'test_1774557711542@alflab.mx', '$2b$10$wiNeMBkMF5eZFs4inY/BUuJwoWtbCkZau6qaWbSb0LtkHVocynO7S', 'Empleado', 1),
(9, 'Nuevo Usuario', 'nuevo_1774557711840@alflab.mx', '$2b$10$zA9QI6c0XwPvJApXK7JVauZ4aZdPwUvoQ2X1RikWjuyiSqny6PMae', 'Empleado', 1),
(10, 'Usuario Test', 'test_1774558595823@alflab.mx', '$2b$10$nmR9AlOxK06AbIvSt.r0k.h81FvNqTgEXFf/0b4Atx1IxC2f8BX/.', 'Empleado', 1),
(11, 'Nuevo Usuario', 'nuevo_1774558596133@alflab.mx', '$2b$10$gOCTL7EIAvK5wkgoCT80RO6qq0UN1/j61OX7c3X3BrL7GcrOeRb.K', 'Empleado', 1),
(12, 'Usuario Test', 'test_1774558905816@alflab.mx', '$2b$10$.POETg/AQqcOPTjkQvEgN.SOxMGydRZ1SzjqrqeFf2tKeLGS0GUPO', 'Empleado', 1),
(13, 'Nuevo Usuario', 'nuevo_1774558906138@alflab.mx', '$2b$10$kw1ETiJhPDgVH3gVy.hbE.XojbZkQjK/uIPG2dA3yfGew2h5tpScG', 'Empleado', 1),
(14, 'Usuario Test', 'test_1774558963315@alflab.mx', '$2b$10$IlRuCVLJpZfzmauzqioDC.uXLVUdtVHXBjAN.RhSOKnEFtBOY2QtC', 'Empleado', 1),
(15, 'Nuevo Usuario', 'nuevo_1774558963640@alflab.mx', '$2b$10$ohmaZhL9wPHa4O9oyJtVKeRSJE.uDMYYDWHZn8FgmcAmrtPONFTSa', 'Empleado', 1),
(16, 'Usuario Test', 'test_1774558976555@alflab.mx', '$2b$10$Gqw95SyitTjyV7x7taVC4e.ijtrz/a70rdf8cZPJOQ5WgvpzHjEE6', 'Empleado', 1),
(17, 'Nuevo Usuario', 'nuevo_1774558976883@alflab.mx', '$2b$10$5Yi3oW/lyxjOMO/APwmIc.rsua1YDpcosFbUP1w1ISfIfuALG5Mhe', 'Empleado', 1),
(18, 'Usuario Test', 'test_1774584427815@alflab.mx', '$2b$10$7elNcYQY8f4sOoItTsiCweLUgnXI4NxKsQzucX8eYyLYxD7WnUQOa', 'Empleado', 1),
(19, 'Nuevo Usuario', 'nuevo_1774584428170@alflab.mx', '$2b$10$UJTLcTL1Vm9mcMxGbkZeUOq36YG73mXrYHhrtOLoJNWBUa6/QlH2K', 'Empleado', 1),
(20, 'Usuario Test', 'test_1774584441265@alflab.mx', '$2b$10$cGWlbsMN4vRi6wVv.24Dfu5P92xvTBRfw/nfba0h6EOJPs6j3azKS', 'Empleado', 1),
(21, 'Nuevo Usuario', 'nuevo_1774584441609@alflab.mx', '$2b$10$BZX2Mg1df/Hv2.egLPovDuFdzJXCzoLj39i1ca0JuvLMrPBenwLJ.', 'Empleado', 1),
(22, 'Usuario Test', 'test_1774638613794@alflab.mx', '$2b$10$4ffIJ12fgoqR.CpyH3cEPe2JEC4DGrVN0vX5WeH.QaRZcIX1bOF9W', 'Empleado', 1),
(23, 'Nuevo Usuario', 'nuevo_1774638614141@alflab.mx', '$2b$10$kzIe32XYTlihwFvrOU25.OAFrfCfSxRYMBt1NugQWzbspBhhYGvHe', 'Empleado', 1),
(24, 'Usuario Test', 'test_1774638624368@alflab.mx', '$2b$10$E9xDord7kJY6KWb8yPSH0.I/U.2tQhTot453wUAlVxaUURMl4K0ou', 'Empleado', 1),
(25, 'Nuevo Usuario', 'nuevo_1774638624683@alflab.mx', '$2b$10$qjD6uCu28vHQz0CC6aXtp.a0AIwVW2f2rSgUk3eI5A0px1nGKuW1G', 'Empleado', 1),
(26, 'Usuario Test', 'test_1774638713427@alflab.mx', '$2b$10$MWek6qfrBTDjqg20m6B02u.XL6Y8dJKi7y1EYFBg03yuodrueqv46', 'Empleado', 1),
(27, 'Nuevo Usuario', 'nuevo_1774638713729@alflab.mx', '$2b$10$oEoK0G835VMh47l/I6lRC.R2sQZ6RrUW9sa2rQkHvBHP14n0CYw/G', 'Empleado', 1),
(28, 'Usuario Test', 'test_1774638725213@alflab.mx', '$2b$10$XxTdBNfu33/WTZev0AqIY.fkW1CTpMadLeJB3.PT3q1MFjSZ3AN/u', 'Empleado', 1),
(29, 'Nuevo Usuario', 'nuevo_1774638725526@alflab.mx', '$2b$10$bwubzlyCsA24uHwsllgz/uRtJ17IuYAWHpeF.Kt4EvqfWm.d8Gsim', 'Empleado', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`Id_cotizacion`);

--
-- Indices de la tabla `cotizacion_detalle`
--
ALTER TABLE `cotizacion_detalle`
  ADD PRIMARY KEY (`Id_detalle`),
  ADD KEY `fk_detalle_cotizacion` (`Id_cotizacion`),
  ADD KEY `fk_detalle_producto` (`Id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Id_producto`),
  ADD UNIQUE KEY `uq_productos_codigo` (`CodigoBarra`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id_usuario`),
  ADD UNIQUE KEY `uq_usuarios_email` (`Email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `Id_cotizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `cotizacion_detalle`
--
ALTER TABLE `cotizacion_detalle`
  MODIFY `Id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cotizacion_detalle`
--
ALTER TABLE `cotizacion_detalle`
  ADD CONSTRAINT `fk_detalle_cotizacion` FOREIGN KEY (`Id_cotizacion`) REFERENCES `cotizaciones` (`Id_cotizacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
