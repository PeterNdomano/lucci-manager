<?php

require_once dirname(__FILE__).'/conn.php';

function startSession(){
  if(session_status() !== PHP_SESSION_ACTIVE){
    session_start();
  }
}

function classLoader($class){
  $path = dirname(__FILE__).'/classes/'.$class.'.php';
  if(file_exists($path)){
    require_once $path;
  }
  else{
    die("Class $class not found");
  }
}

function getAdminData($id){
  global $conn;
  $sql = $conn->prepare("SELECT * FROM admins WHERE id = ? OR username = ?");
  $sql->bind_param('ss', $id, $id);
  $sql->execute();
  $result = $sql->get_result();
  $row = mysqli_fetch_assoc($result);
  return $row;
}
?>
