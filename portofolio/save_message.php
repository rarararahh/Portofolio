<?php
// Mengatur header untuk mengizinkan akses dari domain yang sama
header('Content-Type: application/json');

try {
    // Mendapatkan pesan dari POST request
    $message = $_POST['message'];
    
    // Nama file untuk menyimpan pesan
    $filename = 'pesan.txt';
    
    // Menambahkan pesan ke file
    if (file_put_contents($filename, $message, FILE_APPEND) !== false) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Message saved successfully']);
    } else {
        throw new Exception('Failed to write to file');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>