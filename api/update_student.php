<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $auth = Admin::auth();
  if($auth['status'] === 1){
    if(isPostFieldValid('studentId') && isPostFieldValid('firstName') && isPostFieldValid('lastName')){
      $firstName = htmlspecialchars($_POST['firstName']);
      $lastName = htmlspecialchars($_POST['lastName']);
      $studentId = htmlspecialchars($_POST['studentId']);

      $student = new Student($studentId);
      $student->updateLastname($lastName);
      $student->updateFirstname($firstName);
      echo json_encode(array(
        'status'=> 1,
        'msg' => 'Success',
      ));
    }
    else{
      echo json_encode(array(
        'status'=> 0,
        'msg' => 'Invalid request',
      ));
    }
  }
  else{
    echo json_encode(array(
      'status'=> 0,
      'msg' => 'Invalid request',
    ));
  }
}

?>
