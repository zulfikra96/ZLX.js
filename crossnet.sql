-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 12 Apr 2018 pada 12.23
-- Versi server: 10.1.31-MariaDB
-- Versi PHP: 7.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crossnet`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `group_chat`
--

CREATE TABLE `group_chat` (
  `id` int(11) NOT NULL,
  `user_id` int(20) UNSIGNED NOT NULL,
  `group_id` int(20) UNSIGNED DEFAULT NULL,
  `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_type` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data untuk tabel `group_chat`
--

INSERT INTO `group_chat` (`id`, `user_id`, `group_id`, `group_name`, `group_type`) VALUES
(170, 1, NULL, 'Group test 😀', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `group_user`
--

CREATE TABLE `group_user` (
  `id` int(11) NOT NULL,
  `user_id` int(20) UNSIGNED DEFAULT NULL,
  `group_id` int(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `group_user`
--

INSERT INTO `group_user` (`id`, `user_id`, `group_id`) VALUES
(209, 1, 170),
(210, 2, 170),
(211, 9, 170);

-- --------------------------------------------------------

--
-- Struktur dari tabel `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `nama_level` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `level`
--

INSERT INTO `level` (`id`, `nama_level`) VALUES
(1, 'direktur'),
(2, 'senior manager'),
(3, 'junior manager');

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `user_id` int(50) UNSIGNED DEFAULT NULL,
  `group_id` int(50) UNSIGNED DEFAULT NULL,
  `text_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`id`, `user_id`, `group_id`, `text_message`) VALUES
(11, 1, 170, 'Test'),
(12, 1, 170, 'Hahah 😀'),
(13, 1, 170, 'Cok 😬'),
(14, 1, 170, 'Adwad'),
(15, 1, 170, 'oaownj 😬😬😬'),
(16, 1, 170, 'ksowjosjwksw\nsjsjisiwow\njaiaiaiwkw\njajaiqiqiwiba\naajiaoaiahaj 😀😀😀'),
(17, 9, 170, 'kslwmaonwowkwownwksnsownja\njajwiwkwbsjisiwiwiiw\nnsjjsjsjs\njsjsisi\njsjisieoqpqjaojsisiw\njsjsowojwiajwowndidjiebfowo\nakoqowowlwlwnxidoiee\njaiqowowj'),
(18, 9, 170, 'fhjj');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `level_id` int(50) UNSIGNED DEFAULT NULL,
  `no_hp` varchar(25) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `level_id`, `no_hp`, `email`, `username`, `password`) VALUES
(1, 1, '08755736502', 'me@haris.com', 'haris', 'U2FsdGVkX19crT8sZkT42DYJJ+T/SAq3PsOWdvIp9so='),
(2, 3, '08755736500', 'me@hudha.com', 'harisbro', 'U2FsdGVkX19JAwpp0Y7EI1A1bR1sNbC/dLaxvIPywJA='),
(3, 3, '082394932075', 'zulfikra l. abdjul', 'zulfikra2', 'U2FsdGVkX181jSMyQRDta5CEUc+193QtQFBaUoT2Bjc='),
(5, NULL, '+6287855736502', 'me@hehe.com', 'h3he', 'U2FsdGVkX19cp2fEQZkLlB/AP/xXXeT1Xl2Ye89TkVg='),
(6, NULL, '+6287855736444', 'me@meme.com', 'mmeme', 'U2FsdGVkX1+7vuHZOovTQh8pDDmYSId4b3546NvNDmM='),
(7, NULL, '+6287855736999', 'mme@zozo.com', 'zozoo', 'U2FsdGVkX18rwq1Rvmo2j+SQSpGOxWZWiI4YRTvEAD4='),
(9, 2, '0823949320755', 'zulfikra', 'zulfikra3', 'U2FsdGVkX19nf6DtpyvWsRqmpVq6M6uBUFhlN+gx1QU='),
(11, 2, '+6287855736989', 'me@h3h3.com', 'h3h3', 'U2FsdGVkX19f1K3sawaW/agSFHC9+6OxpyK9hoFWtpA=');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `group_chat`
--
ALTER TABLE `group_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `group_user`
--
ALTER TABLE `group_user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `group_chat`
--
ALTER TABLE `group_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT untuk tabel `group_user`
--
ALTER TABLE `group_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT untuk tabel `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
