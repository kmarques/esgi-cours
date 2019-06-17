<?php
session_start();

require('./vendor/autoload.php');

$fb = new Facebook\Facebook([
    'app_id' => '', // Replace {app-id} with your app id
    'app_secret' => '',
    'default_graph_version' => 'v3.2',
]);

function loginFacebook($fb) {
    $helper = $fb->getRedirectLoginHelper();
    $permissions = ['email'];
    $url = $helper->getLoginUrl("http://localhost:8098/callback", $permissions);
    var_dump($url);
    echo "
        <a href='{$url}'>Connect with Facebook</a>
    ";
}

function callbackFacebook($fb) {
    $helper = $fb->getRedirectLoginHelper();
    try {
        $accessToken = $helper->getAccessToken();
        echo '<h3>Access Token</h3>';
        var_dump($accessToken->getValue());
      } catch(Facebook\Exceptions\FacebookResponseException $e) {
        // When Graph returns an error
        echo 'Graph returned an error: ' . $e->getMessage();
        exit;
      } catch(Facebook\Exceptions\FacebookSDKException $e) {
        // When validation fails or other local issues
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit;
      }
}
/*
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
*/
$path = strtok($_SERVER['REQUEST_URI'], '?');
switch($path) {
    case '/login':
        loginFacebook($fb);
        break;
    case '/callback':
        callbackFacebook($fb);
        break;
    default:
        var_dump($_GET, $_REQUEST);
        break;
}
