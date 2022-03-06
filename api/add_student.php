<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $auth = Admin::auth();
  if($auth['status'] === 1){
    if(isPostFieldValid('firstName') && isPostFieldValid('lastName') && isPostFieldValid('admissionNo')){
      $firstName = htmlspecialchars($_POST['firstName']);
      $lastName = htmlspecialchars($_POST['lastName']);
      $admissionNo = $_POST['admissionNo'];
      $testData = getStudentDataByAd($admissionNo);
      $password = password_hash("komu2022", PASSWORD_DEFAULT);
      $token = password_hash($admissionNo, PASSWORD_DEFAULT);

      if(!isset($testData['date'])){
        $sql = $conn->prepare("INSERT INTO students (firstName, lastName, admissionNo, password, token)  VALUES (?, ?, ?, ?, ?)");
        $sql->bind_param('sssss', $firstName, $lastName, $admissionNo, $password, $token);
        if($sql->execute()){
          echo json_encode(array(
            'status'=> 1,
            'msg' => 'Succesful',
          ));
        }
        else{
          echo json_encode(array(
            'status'=> 0,
            'msg' => 'Server error',
          ));
        }

      }
      else{
        echo json_encode(array(
          'status'=> 0,
          'msg' => 'Admission number already recorded',
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
  else{
    echo json_encode(array(
      'status'=> 0,
      'msg' => 'Invalid request',
    ));
  }
}

?>
