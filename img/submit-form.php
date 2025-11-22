<?php
header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("خطا: فقط درخواست POST مجاز است.");
}

// بررسی فیلدها
if (empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['company'])) {
    exit("لطفاً تمام فیلدها را پر کنید.");
}

// پاک‌سازی
$name = trim($_POST['name']);
$phone = trim($_POST['phone']);
$company = trim($_POST['company']);

// اعتبارسنجی طول
if (strlen($name) > 50 || strlen($company) > 100 || strlen($phone) > 15) {
    exit("ورودی‌ها بیش از حد طولانی هستند.");
}

// پاک‌سازی کاراکترهای نامعتبر
$name = preg_replace('/[^\p{L}\p{N}\s\-\'آ-ی]/u', '', $name);
$company = preg_replace('/[^\p{L}\p{N}\s\-\'آ-ی]/u', '', $company);
$phone = preg_replace('/[^0-9]/', '', $phone); // فقط اعداد

// اعتبارسنجی تلفن ایران (11 رقم با 09)
if (!preg_match('/^09[0-9]{9}$/', $phone)) {
    exit("شماره تلفن باید معتبر باشد (مثال: 09123456789).");
}

// آماده‌سازی ایمیل
$to = "asadipour.e@gmail.com";
$subject = "✅ درخواست همکاری - " . $name;
$body = "نام: $name\nتلفن: $phone\nشرکت: $company\nتاریخ: " . date("Y-m-d H:i:s");

$headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'yourdomain.com') . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.";
}
?>