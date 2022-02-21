<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  if(isPostFieldValid('password') && isPostFieldValid('username')){
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $ffo = Admin::login($username, $password);
    echo json_encode($ffo);
  }
  else{
    echo json_encode(array(
      'status' => 0,
      'msg' => 'Invalid login details',
    ));
  }
}
else{
  echo json_encode(array(
    'status' => 0,
    'msg' => 'Invalid request',
  ));
}

?>
