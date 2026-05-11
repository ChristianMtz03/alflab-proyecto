-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2026 a las 02:11:05
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
-- Base de datos: `alflabcatalogos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Id_cliente` int(11) NOT NULL,
  `NombreCliente` varchar(100) NOT NULL,
  `Empresa` varchar(150) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `Direccion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id_cliente`, `NombreCliente`, `Empresa`, `Telefono`, `Email`, `Direccion`) VALUES
(4, 'Laura Sánchez', NULL, '6185554321', 'laura.sanchez@gmail.com', NULL),
(5, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(6, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(7, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(8, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456'),
(9, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(11, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(12, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456'),
(13, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(15, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(16, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456'),
(17, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(19, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(20, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456'),
(21, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(23, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(24, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456'),
(25, 'Cliente Para GetById', 'Empresa Test', '6181234567', 'getbyid@test.com', 'Calle Test 123'),
(27, 'Cliente Prueba Test', 'Empresa Test', '6181234567', 'cliente.prueba@test.com', 'Calle Test 123, Durango'),
(28, 'Cliente Actualizado', 'Empresa Actualizada', '6189999999', 'actualizado@test.com', 'Nueva Dirección 456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `Id_proveedor` int(11) NOT NULL,
  `NombreProveedor` varchar(100) NOT NULL,
  `NombreEmpresa` varchar(150) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `RFC` varchar(13) DEFAULT NULL,
  `Direccion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`Id_proveedor`, `NombreProveedor`, `NombreEmpresa`, `Telefono`, `Email`, `RFC`, `Direccion`) VALUES
(1, 'Proveedor Actualizado', 'Empresa Actualizada S.A.', '5598765432', 'actualizado@proveedor.com', 'PAC900101XY2', 'Nueva Dirección Industrial 456'),
(3, 'Miguel Torres', NULL, '6181112233', 'miguel.torres@gmail.com', NULL, 'Blvd. Domingo Arrieta 321, Durango'),
(4, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(5, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(7, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(9, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(11, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(13, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX'),
(15, 'Proveedor Prueba Test', 'Empresa Prueba S.A.', '5512345678', 'proveedor.prueba@test.com', 'PPR900101AB1', 'Calle Industrial 789, CDMX');

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
(1, 'Administrador AlfLab', 'admin@alflab.mx', '$2a$11$7aRWiqOeNjPn0OYE/WtxXe8umSBYGGXaAITixAMVqjJg3VaWeoRzq', 'Administrador', 1),
(2, 'Usuario Test', 'test_63093953-e158-4128-b1de-0767af91bcd4@alflab.mx', '$2a$11$EY2wL33wijfMNKcwt2qXp.UsIC7EQmvLsye5XLXfBH6LcKH7pROkS', 'Empleado', 1),
(3, 'Usuario Test', 'test_93e1e106-17ac-497d-b84a-4eec8d2877ab@alflab.mx', '$2a$11$dEsMCObsgul1LNL/iiHLFuaonZi/QuxgUkTI2MOVo8xqzeAe5NSmC', 'Empleado', 1),
(4, 'Usuario Test', 'test_f40d40a3-5c95-44d6-9a69-bb195fefb59e@alflab.mx', '$2a$11$XdY7ModPwXjSugzxAjSI9O15Z1TvJKYNnxxIDtV8VAXv5jZYy08d6', 'Empleado', 1),
(5, 'Usuario Test', 'test_8036edd6-b208-4ccb-87f4-6a05ef24e552@alflab.mx', '$2a$11$4MMl4GS6AH7teB5fDMBhgeMweTuczd9ayoVRHzqfME0dENMJdsYrm', 'Empleado', 1),
(6, 'Usuario Test', 'test_f6be609e-f934-43d4-b713-88062f6f1374@alflab.mx', '$2a$11$A5KqdG0sOMFpBNo.rYaKhOgBsK0WwAi2PcB6l1YFoBqhE6.KZZOx2', 'Empleado', 1),
(7, 'Usuario Test', 'test_fb6093a2-53d5-45c0-919d-c078a211361f@alflab.mx', '$2a$11$rwe1Za2tNpf3QzbjLqScbeNsgcNmE8wpre5RdtyBsLAzMiNK4X9dK', 'Empleado', 1),
(8, 'Usuario Test', 'test_5355355b-74b9-406d-a2fd-064c56e0f306@alflab.mx', '$2a$11$/om1QW3aywpnfJnKO0caJuT/wvtxc/6SeZfsZr2DhKnd05FeS0yjy', 'Empleado', 1),
(9, 'Usuario Test', 'test_b8b4fc56-f03f-4b5b-980d-43359b757b34@alflab.mx', '$2a$11$EGE2KVdtk8SqEpiY2hJuv.FPtgOPmSisV/V8KkmJleFZlN1OH5cVC', 'Empleado', 1),
(10, 'Usuario Test', 'test_e677ed8e-510e-46d8-82f5-780a886fd61f@alflab.mx', '$2a$11$VfVoXOcHTe7gBhPEYkbDquc69AR8ISbLWQmnh4ODhtsYXE4uT9TNC', 'Empleado', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id_cliente`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`Id_proveedor`);

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
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `Id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `Id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
