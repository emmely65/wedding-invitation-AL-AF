-- ====================================================================
-- SKEMA TABEL RSVP & UCAPAN PERNIKAHAN (Affandi & Alfiya)
-- Karakter set: utf8mb4 (Wajib agar mendukung emoji seperti ❤️🥰😍🤲)
-- Kompatibel dengan: MySQL 5.7+, MySQL 8.0+, MariaDB (cPanel / phpMyAdmin)
-- ====================================================================

-- 1. Buat Tabel wishes jika belum ada
CREATE TABLE IF NOT EXISTS `wishes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL COMMENT 'Nama Tamu Undangan',
  `attendance` ENUM('present', 'tentative', 'absent') NOT NULL DEFAULT 'present' COMMENT 'Status Kehadiran: present (Hadir), tentative (Masih Ragu), absent (Tidak Hadir)',
  `message` TEXT NOT NULL COMMENT 'Pesan / Doa / Ucapan',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Waktu Pengiriman',
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Data Awal / Contoh Ucapan (Opsional, dapat dihapus di phpMyAdmin)
INSERT INTO `wishes` (`name`, `attendance`, `message`, `created_at`) VALUES
('Asri', 'present', 'Selamat ya kak, semoga lancar acaranya dan menjadi keluarga sakinah mawaddah warahmah.', NOW() - INTERVAL 1 HOUR),
('Fazaaa', 'present', 'Bagusss banget undangannya, berkah selalu yaa ❤️🥰🥰', NOW() - INTERVAL 2 HOUR),
('Firman', 'present', 'MasyaAllah barakallahu lakuma, semoga langgeng sampai surga 🤲', NOW() - INTERVAL 4 HOUR),
('Nindy', 'tentative', 'InsyaAllah hadir jika tidak ada halangan mendadak yaa kak!', NOW() - INTERVAL 1 DAY);
