<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  startSession();
  $id = htmlspecialchars($_SESSION['userId']);
  $student = new Student($id);
  if(isPostFieldValid('password')){
    $password = $_POST['password'];
    $student->updatePassword($password);
    echo json_encode(array(
      'status'=> 1,
      'msg' => 'Success',
    ));
  }
  else{
    echo json_encode(array(
      'status'=> 0,
      'msg' => 'Server error',
    ));
  }
}

?>
