<?php
$v1 = $_POST['fecha'];
$v2 = $_POST['so'];
$v3 = $_POST['nav'];
$v4 = $_POST['alias'];
echo $v1;
echo $v2;
echo $v3;
echo $v4;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 
$v0= 1;
$sql = "INSERT INTO test_device (id, fecha, so, nav, alias)
VALUES ($v0,'$v1', '$v2', '$v3','$v4')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

php?>