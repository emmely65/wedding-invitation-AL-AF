<?php
// ====================================================================
// REST API RSVP & UCAPAN PERNIKAHAN
// Mendukung request dari Localhost maupun Vercel (CORS Enabled)
// ====================================================================

// 1. Set Header CORS & JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Tangani preflight OPTIONS request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

// 2. Konfigurasi Koneksi Database
// Otomatis mendeteksi apakah berjalan di Laragon Lokal atau cPanel Hosting
$isLocal = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']) || 
           strpos($_SERVER['HTTP_HOST'] ?? '', '192.168.') !== false ||
           strpos($_SERVER['HTTP_HOST'] ?? '', '.test') !== false;

if ($isLocal) {
    // --- Kredensial Database Lokal (Laragon) ---
    $dbHost = 'localhost';
    $dbName = 'wedding_db'; // Nama database di phpMyAdmin lokal Anda
    $dbUser = 'root';
    $dbPass = '';           // Password root bawaan Laragon biasanya kosong
} else {
    // --- Kredensial Database cPanel Arenhost ---
    // Sesuaikan 3 baris di bawah ini saat diupload ke cPanel:
    $dbHost = 'localhost';
    $dbName = 'beragam_wedding'; // Ganti nama database cPanel Anda
    $dbUser = 'beragam_user';    // Ganti username database cPanel Anda
    $dbPass = 'PASSWORD_ANDA';   // Ganti password database cPanel Anda
}

// 3. Inisialisasi Koneksi PDO dengan Charset utf8mb4 (Aman untuk Emoji)
try {
    $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Koneksi database gagal: ' . $e->getMessage()
    ]);
    exit();
}

// 4. ROUTE: GET (Ambil Daftar Ucapan)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, name, attendance, message, created_at FROM wishes ORDER BY created_at DESC LIMIT 100");
        $wishes = $stmt->fetchAll();

        echo json_encode([
            'status' => 'success',
            'data'   => $wishes
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Gagal mengambil data: ' . $e->getMessage()
        ]);
    }
    exit();
}

// 5. ROUTE: POST (Simpan Ucapan Baru)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    $name = trim($input['name'] ?? '');
    $attendance = in_array($input['attendance'] ?? '', ['present', 'tentative', 'absent']) 
        ? $input['attendance'] 
        : 'present';
    $message = trim($input['message'] ?? '');

    // Validasi input
    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Nama dan ucapan wajib diisi.'
        ]);
        exit();
    }

    try {
        $sql = "INSERT INTO wishes (name, attendance, message, created_at) VALUES (:name, :attendance, :message, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name'       => $name,
            ':attendance' => $attendance,
            ':message'    => $message,
        ]);

        $insertedId = $pdo->lastInsertId();

        // Ambil data yang baru saja disimpan
        $fetchStmt = $pdo->prepare("SELECT id, name, attendance, message, created_at FROM wishes WHERE id = :id");
        $fetchStmt->execute([':id' => $insertedId]);
        $newWish = $fetchStmt->fetch();

        http_response_code(201);
        echo json_encode([
            'status'  => 'success',
            'message' => 'Ucapan berhasil disimpan.',
            'data'    => $newWish
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Gagal menyimpan ucapan: ' . $e->getMessage()
        ]);
    }
    exit();
}

// Metode HTTP tidak diizinkan
http_response_code(405);
echo json_encode([
    'status'  => 'error',
    'message' => 'Metode HTTP tidak didukung.'
]);
