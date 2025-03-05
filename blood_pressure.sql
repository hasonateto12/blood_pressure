-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 04:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `blood_pressure`
--

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

CREATE TABLE `measurements` (
                                `id` int(11) NOT NULL,
                                `user_id` int(11) NOT NULL,
                                `high_value` int(11) NOT NULL,
                                `low_value` int(11) NOT NULL,
                                `heart_rate` int(11) NOT NULL,
                                `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `user_id`, `high_value`, `low_value`, `heart_rate`, `date`) VALUES
                                                                                                  (91, 3, 120, 120, 115, '2025-02-26'),
                                                                                                  (92, 3, 120, 120, 115, '2025-02-26'),
                                                                                                  (93, 3, 200, 200, 115, '2025-02-26'),
                                                                                                  (94, 3, 150, 150, 115, '2025-02-26'),
                                                                                                  (95, 3, 400, 400, 166, '2025-02-26'),
                                                                                                  (96, 3, 200, 500, 116, '2025-02-26'),
                                                                                                  (97, 3, 500, 600, 400, '2025-02-26'),
                                                                                                  (117, 2, 120, 80, 82, '2025-03-03'),
                                                                                                  (138, 5, 96, 115, 96, '2025-03-02'),
                                                                                                  (139, 2, 140, 100, 114, '2025-03-03'),
                                                                                                  (140, 2, 150, 120, 80, '2025-03-04'),
                                                                                                  (141, 2, 190, 120, 80, '2025-03-04'),
                                                                                                  (143, 2, 120, 120, 400, '2025-03-04'),
                                                                                                  (145, 5, 154, 63, 80, '2025-03-04'),
                                                                                                  (146, 5, 120, 600, 80, '2025-03-04'),
                                                                                                  (147, 2, 115, 120, 400, '2025-02-05'),
                                                                                                  (148, 4, 120, 80, 80, '2025-03-05'),
                                                                                                  (149, 4, 164, 80, 80, '2025-03-06'),
                                                                                                  (150, 4, 144, 80, 80, '2025-03-06'),
                                                                                                  (151, 4, 400, 80, 80, '2025-03-06'),
                                                                                                  (152, 4, 400, 20, 80, '2025-03-06'),
                                                                                                  (153, 4, 400, 20, 80, '2025-03-06'),
                                                                                                  (154, 5, 120, 65, 80, '2025-03-04'),
                                                                                                  (155, 4, 120, 97, 80, '2025-03-06'),
                                                                                                  (156, 5, 180, 97, 80, '2025-03-06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
                                       (2, 'teto'),
                                       (3, 'mohammad'),
                                       (4, 'sofian'),
                                       (5, 'DAD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
    ADD PRIMARY KEY (`id`),
  ADD KEY `measurements_fk1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `measurements`
--
ALTER TABLE `measurements`
    ADD CONSTRAINT `measurements_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;