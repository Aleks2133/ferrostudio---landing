<?php
declare(strict_types=1);

/**
 * Wspólny odbiornik wszystkich formularzy Ferro Studio (kontakt, wycena,
 * próbki, przewodnik, konfigurator) — bez zewnętrznych usług. Wysyła e-mail
 * przez PHP mail() wprost na kontakt@ferrostudio.pl, na tym samym serwerze
 * co skrzynka, więc nie trzeba żadnego konta ani klucza API.
 *
 * Formularze różnią się polami, więc treść maila budujemy DYNAMICZNIE z tego,
 * co przyszło w $_POST — żaden formularz nie musi pasować do sztywnego
 * schematu. Zarezerwowane klucze sterujące (temat, honeypot, zgoda) są
 * pomijane w wyświetlanej treści.
 */

header('Content-Type: application/json; charset=utf-8');

const TO_EMAIL = 'kontakt@ferrostudio.pl';
const FROM_EMAIL = 'kontakt@ferrostudio.pl'; // ta sama domena — mail() to lubi
const RATE_LIMIT_SECONDS = 15;
const MAX_TOTAL_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8 MB łącznie

// Pola sterujące — nie trafiają do treści maila jako "pole: wartość".
const CONTROL_FIELDS = ['subject', 'from_name', 'website', 'consent', '_start'];

// Ładniejsze etykiety dla znanych pól; czego nie ma tutaj, dostaje etykietę
// wyprowadzoną z nazwy pola (patrz prettify_label()).
const LABELS = [
    'name'     => 'Imię i nazwisko / firma',
    'email'    => 'E-mail',
    'phone'    => 'Telefon',
    'address'  => 'Adres wysyłki',
    'message'  => 'Wiadomość',
    'project'  => 'Nad czym pracuje',
    'rodzaj'   => 'Rodzaj realizacji',
    'miejsce'  => 'Miejsce montażu',
    'rozmiar'  => 'Orientacyjna szerokość',
    'plik'     => 'Czy ma gotowy plik',
    'konfiguracja' => 'Konfiguracja z /konfigurator',
    'link'     => 'Link do podglądu konfiguracji',
    // odpowiedniki z wersji EN formularzy — panel jest po polsku niezależnie
    // od tego, w jakiej wersji językowej klient wypełnił formularz
    'type'     => 'Rodzaj realizacji',
    'location' => 'Miejsce montażu',
    'size'     => 'Orientacyjna szerokość',
    'file'     => 'Czy ma gotowy plik',
];

// Pola, których wartość zwykle jest długa — dostają własny blok pod tabelą
// zamiast ciasnego wiersza.
const LONG_FIELDS = ['message', 'project', 'address', 'konfiguracja'];

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

function post(string $key): string {
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';
}

/** Usuwa znaki nowej linii, żeby nikt nie wstrzyknął dodatkowych nagłówków przez pole formularza. */
function clean_header(string $value): string {
    return trim(str_replace(["\r", "\n"], '', $value));
}

/** Koduje polskie znaki w nazwie nadawcy (RFC 2047) — bez tego klient pocztowy
 *  zgaduje kodowanie i „—" zamienia się w „â€"". */
function mime_encode(string $value): string {
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function prettify_label(string $key): string {
    $key = preg_replace('/\[.*\]$/', '', $key) ?? $key;
    return mb_convert_case(str_replace(['_', '-'], ' ', $key), MB_CASE_TITLE);
}

// Honeypot: pole niewidoczne dla człowieka, boty je wypełniają. Po cichu
// udajemy sukces, żeby bot nie dostał sygnału do adaptacji.
if (post('website') !== '') {
    echo json_encode(['success' => true]);
    exit;
}

session_start();
$now = time();
$last = (int) ($_SESSION['contact_last_submit'] ?? 0);
if ($last !== 0 && $now - $last < RATE_LIMIT_SECONDS) {
    http_response_code(429);
    echo json_encode(['error' => 'Wiadomość została już wysłana. Odczekaj chwilę przed kolejną.']);
    exit;
}

$email = post('email');
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Podaj poprawny adres e-mail.']);
    exit;
}

foreach ($_POST as $key => $value) {
    if (is_string($value) && strlen($value) > 8000) {
        http_response_code(400);
        echo json_encode(['error' => 'Za długa treść pola „' . prettify_label($key) . '".']);
        exit;
    }
}

$subject  = post('subject') ?: 'Nowe zapytanie ze strony ferrostudio.pl';
$fromName = post('from_name') ?: 'Ferro Studio — formularz';
$safeEmail   = clean_header($email);
$safeSubject = clean_header($subject);
$safeFrom    = clean_header($fromName);
$replyName   = clean_header(post('name') ?: $email);

// --- normalizacja załączników: różne formularze używają różnych nazw pól
//     (attachment[] w kontakcie/wycenie, projekt/podglad w konfiguratorze),
//     pojedynczych albo wielokrotnych — sprowadzamy to do jednej płaskiej listy.
$attachments = [];
$totalSize = 0;
foreach ($_FILES as $field => $fileInfo) {
    $names = is_array($fileInfo['name']) ? $fileInfo['name'] : [$fileInfo['name']];
    $count = count($names);
    for ($i = 0; $i < $count; $i++) {
        $error = is_array($fileInfo['error']) ? $fileInfo['error'][$i] : $fileInfo['error'];
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['error' => 'Błąd wysyłki pliku. Spróbuj ponownie albo wyślij mniejszy plik.']);
            exit;
        }
        $size = is_array($fileInfo['size']) ? $fileInfo['size'][$i] : $fileInfo['size'];
        $totalSize += $size;
        if ($totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
            http_response_code(400);
            echo json_encode(['error' => 'Załączniki są za duże (limit łącznie 8 MB). Napisz bezpośrednio na ' . TO_EMAIL . '.']);
            exit;
        }
        $name = is_array($fileInfo['name']) ? $fileInfo['name'][$i] : $fileInfo['name'];
        $tmp  = is_array($fileInfo['tmp_name']) ? $fileInfo['tmp_name'][$i] : $fileInfo['tmp_name'];
        $attachments[] = ['name' => basename((string) $name), 'tmp' => (string) $tmp];
    }
}

// --- treść maila: prosty branded układ, tabele + inline style (jedyne, co
//     przetrwa większość klientów pocztowych) ---

$shortRows = '';
$longBlocks = '';
foreach ($_POST as $key => $rawValue) {
    if (in_array($key, CONTROL_FIELDS, true) || !is_string($rawValue)) {
        continue;
    }
    $value = trim($rawValue);
    if ($value === '') {
        continue;
    }
    $baseKey = preg_replace('/\[\d*\]$/', '', $key) ?? $key;
    $label = LABELS[$baseKey] ?? prettify_label($baseKey);

    if (in_array($baseKey, LONG_FIELDS, true) || strlen($value) > 80) {
        $longBlocks .= '<tr><td style="padding:20px 28px 4px;">'
            . '<div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#78736A;margin-bottom:8px;">' . htmlspecialchars($label) . '</div>'
            . '<div style="font:15px/1.6 Arial,sans-serif;color:#191815;white-space:pre-wrap;">' . nl2br(htmlspecialchars($value)) . '</div>'
            . '</td></tr>';
    } else {
        $shortRows .= '<tr>'
            . '<td style="padding:12px 20px;background:#F3F1EC;font:600 11px/1.4 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#78736A;width:150px;border-bottom:2px solid #fff;">' . htmlspecialchars($label) . '</td>'
            . '<td style="padding:12px 20px;background:#F3F1EC;font:15px/1.5 Arial,sans-serif;color:#191815;border-bottom:2px solid #fff;">' . htmlspecialchars($value) . '</td>'
            . '</tr>';
    }
}

if ($attachments !== []) {
    $fileList = implode(', ', array_map(fn($a) => htmlspecialchars($a['name']), $attachments));
    $longBlocks .= '<tr><td style="padding:20px 28px 4px;">'
        . '<div style="font:600 11px/1.4 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#78736A;margin-bottom:8px;">Załączniki</div>'
        . '<div style="font:14px/1.6 Arial,sans-serif;color:#191815;">' . $fileList . '</div>'
        . '</td></tr>';
}

$html = '<div style="background:#EDEAE3;padding:32px 16px;font-family:Arial,sans-serif;">'
    . '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;border-collapse:collapse;background:#ffffff;">'
    . '<tr><td style="background:#191815;padding:28px 28px 24px;border-top:3px solid #C1502E;">'
    . '<div style="font:900 22px/1 Arial,sans-serif;color:#EDEAE3;letter-spacing:.01em;">FERRO STUDIO</div>'
    . '<div style="font:13px/1.5 Arial,sans-serif;color:#D9642E;margin-top:8px;">' . htmlspecialchars($subject) . '</div>'
    . '</td></tr>'
    . '<tr><td style="padding:0;"><table role="presentation" width="100%" style="border-collapse:collapse;">' . $shortRows . '</table></td></tr>'
    . '<tr><td style="padding:0;"><table role="presentation" width="100%" style="border-collapse:collapse;">' . $longBlocks . '</table></td></tr>'
    . '<tr><td style="height:20px;"></td></tr>'
    . '<tr><td style="padding:16px 28px;background:#191815;font:12px/1.5 Arial,sans-serif;color:rgba(237,234,227,.55);">'
    . 'Formularz na ferrostudio.pl &middot; ' . date('Y-m-d H:i')
    . '</td></tr>'
    . '</table></div>';

$textLines = [$subject, ''];
foreach ($_POST as $key => $rawValue) {
    if (in_array($key, CONTROL_FIELDS, true) || !is_string($rawValue)) {
        continue;
    }
    $value = trim($rawValue);
    if ($value === '') {
        continue;
    }
    $baseKey = preg_replace('/\[\d*\]$/', '', $key) ?? $key;
    $label = LABELS[$baseKey] ?? prettify_label($baseKey);
    $textLines[] = "{$label}: {$value}";
}
if ($attachments !== []) {
    $textLines[] = 'Załączniki: ' . implode(', ', array_map(fn($a) => $a['name'], $attachments));
}
$textLines[] = '';
$textLines[] = '— formularz na ferrostudio.pl, ' . date('Y-m-d H:i');
$text = implode("\n", $textLines);

$altBoundary = 'alt-' . bin2hex(random_bytes(12));
$mixBoundary = 'mix-' . bin2hex(random_bytes(12));

$alternative = "--{$altBoundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $text . "\r\n\r\n"
    . "--{$altBoundary}\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $html . "\r\n\r\n"
    . "--{$altBoundary}--\r\n";

$body = "--{$mixBoundary}\r\n"
    . "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"\r\n\r\n"
    . $alternative . "\r\n";

foreach ($attachments as $file) {
    $content = @file_get_contents($file['tmp']);
    if ($content === false) {
        continue;
    }
    $encoded = chunk_split(base64_encode($content));
    $safeFileName = str_replace(['"', "\r", "\n"], '', $file['name']);
    $mime = function_exists('mime_content_type') ? (mime_content_type($file['tmp']) ?: 'application/octet-stream') : 'application/octet-stream';
    $body .= "--{$mixBoundary}\r\n"
        . "Content-Type: {$mime}; name=\"{$safeFileName}\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . "Content-Disposition: attachment; filename=\"{$safeFileName}\"\r\n\r\n"
        . $encoded . "\r\n";
}
$body .= "--{$mixBoundary}--";

$headers = 'From: ' . mime_encode($safeFrom) . ' <' . FROM_EMAIL . ">\r\n"
    . 'Reply-To: ' . mime_encode($replyName) . " <{$safeEmail}>\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: multipart/mixed; boundary=\"{$mixBoundary}\"\r\n";

$encodedSubject = mime_encode($safeSubject);
$sent = @mail(TO_EMAIL, $encodedSubject, $body, $headers);

error_log('send-form.php: mail() returned ' . ($sent ? 'OK' : 'FALSE') . " sending \"{$safeSubject}\" to " . TO_EMAIL);

if (!$sent) {
    http_response_code(502);
    echo json_encode(['error' => 'Nie udało się wysłać wiadomości. Napisz bezpośrednio na ' . TO_EMAIL . ' lub zadzwoń.']);
    exit;
}

$_SESSION['contact_last_submit'] = $now;

echo json_encode(['success' => true]);
