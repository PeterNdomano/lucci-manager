<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  if(isPostFieldValid('password') && isPostFieldValid('admissionNo')){
    $admissionNo = $_POST['admissionNo'];
    $password = $_POST['password'];
    $ffo = Student::login($admissionNo, $password);
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
