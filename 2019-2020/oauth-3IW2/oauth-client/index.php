<?php
$CLIENT_ID = 'client_5edf6b5a4bd496.60805207';
$CLIENT_SECRET = '22a0e9533df65ec194975ae1e6c5631ffc4ef70c';
$STATE = 'FZAFEZA23AREZAFRBDQ>FB4';
$URL = urlencode('https://localhost:7071');

// Authorization Code Process (1/2)
function home()
{
    global $CLIENT_ID;
    global $STATE;
    global $URL;

    $link = "http://localhost:7070/auth?response_type=code&client_id={$CLIENT_ID}&scope=['email']&state={$STATE}&redirect_uri={$URL}/cb";
    echo "<a href=\"{$link}\">Connect with oauth-server</a>";
}

// Authorization Code Process (2/2)
function cb()
{
    global $CLIENT_ID;
    global $CLIENT_SECRET;
    global $STATE;
    global $URL;

    ["code" => $code, "state" => $rstate] = $_GET;

    if ($STATE === $rstate) {
        // Exchange authCode with access_token
        $surl = "http://oauth-server/token?grant_type=authorization_code&client_id={$CLIENT_ID}&client_secret={$CLIENT_SECRET}&code={$code}&redirect_uri={$URL}/cb";
        $result = json_decode(file_get_contents($surl), true);
        ['access_token' => $access_token] = $result;

        // Get userdata with access_token
        $sapi = "http://oauth-server/me";
        $rs = curl_init($sapi);
        curl_setopt($rs, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($rs, CURLOPT_HEADER, 0);
        curl_setopt($rs, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer {$access_token}"
        ]);
        $result = curl_exec($rs);
        curl_close($rs);
        var_dump($result);
    }
}

$route = strtok($_SERVER['REQUEST_URI'], '?');
switch ($route) {
    case '/':
        home();
        break;
    case '/cb':
        cb();
        break;
    case '/auth-success':
        //authSucess();
        break;
    case '/token':
        //token();
        break;
}
