<?php
$CLIENT_ID = "id_5cee80d2e9c91";
$CLIENT_SECRET = "secret_5cee80d2e9cc8";
$OAUTH_HOST = "http://127.0.0.1:8099";
$STATE = "TRERERFEDGFER";


function login() {
    global $OAUTH_HOST, $CLIENT_ID, $STATE;

    $url = $OAUTH_HOST . "/auth?response_type=code&client_id=" . $CLIENT_ID 
    . "&scope=general&state=" . $STATE;

    echo "
        <a href='{$url}'>Connect with Auth-Server</a>
    ";
}

function callback() {
    global $OAUTH_HOST, $CLIENT_ID, $CLIENT_SECRET, $STATE;

    if ($_GET['state'] === $STATE) {
        $urlToken = "http://172.21.0.2/token?grant_type=authorization_code&client_id=".$CLIENT_ID
        . "&client_secret=" . $CLIENT_SECRET . "&code=" . $_GET['code'];

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $urlToken);
        curl_setopt($handle, CURLOPT_HEADER, 0);
        $result = curl_exec($handle);
        if(curl_errno($handle))
        {
            echo 'Curl error: ' . curl_error($handle);
        }
        curl_close($handle);

        echo $result;
    } else {
        echo "State invalid";
    }
}

$path = strtok($_SERVER['REQUEST_URI'], '?');
switch($path) {
    case '/login':
        login();
        break;
    case '/callback':
        callback();
        break;
}