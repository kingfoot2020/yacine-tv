<?php


header("Content-Type: application/json; charset=UTF-8");
$secret_key="xxxxxx";
$kt="xxxxxx";
//key
$utc_str = gmdate("M d Y H:i:s", time());
$current_time = strtotime($utc_str);

$kt = decrypt($kt);

$seconds_diff = $current_time - $kt;
$minutes = ($seconds_diff / 60);

// if token > 3min

$ip = get_ip_address();
$secret = $secret_key;
$str = $ip . "" . $secret;
$str = base64_encode($str);
$str = str_replace('=', '', $str);
$str = mb_strtolower($str);

$data['key'] = encrypt($str);
echo json_encode($data);

// Functions
function encrypt($str) {
    $str = bin2hex($str);
    return base64_encode($str);
}

function decrypt($str) {
    $str = base64_decode($str);
    return pack("H*", $str);
}

function get_ip_address() {
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"]) && !empty($_SERVER["HTTP_CF_CONNECTING_IP"])) {
        $ip = $_SERVER["HTTP_CF_CONNECTING_IP"];
    } else if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>
