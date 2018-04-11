<?php

/* @var $_POST type */
$v1 = $_POST['fecha'];
$v2 = $_POST['so'];
$v3 = $_POST['nav'];
$v4 = $_POST['alias'];
$v5 = $_POST['mac'];
echo $v1;
echo $v2;
echo $v3;
echo $v4;
echo $v5;
$servername = "192.168.1.53";
$username = "user";
$password = "user";
$dbname = "ximddevices";

//generate Id
function generateRandomString() {
    $allId = rand(0, 99999);
    $letras = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);
    return $allId . $letras;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$v0 = generateRandomString();
$sql = "INSERT INTO devices (id, so, navegador, fecha, alias, mac)
VALUES ('$v0','$v1', '$v2', '$v3','$v4','NULL')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    echo "Datos insertados: " . $v0 . " " . $v1 . " " . $v2 . " " . $v3 . " " . $v4;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
header("Location: http://192.168.1.54/appximdDevice/index.html");