<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $auth = Admin::auth();
  if($auth['status'] === 1){
    if(isPostFieldValid('bookId') && isPostFieldValid('admissionNo') && isPostFieldValid('from') && isPostFieldValid('to')){
      $admissionNo = $_POST['admissionNo'];
      $fromDate = date('Y-m-d', strtotime($_POST['from']));
      $toDate = date('Y-m-d', strtotime($_POST['to']));
      $bookId = htmlspecialchars($_POST['bookId']);

      $book = new Book($bookId);
      $studentData = getStudentDataByAd($admissionNo);
      if(isset($studentData['date'])){
        if(!bookInCollection($studentData['bookCollection'], $bookId)){
          $book->lend($admissionNo, $fromDate, $toDate);
          echo json_encode(array(
            'status'=> 1,
            'msg' => 'Successful',
          ));
        }
        else{
          echo json_encode(array(
            'status'=> 0,
            'msg' => 'Student already has this book',
          ));
        }
      }
      else{
        echo json_encode(array(
          'status'=> 0,
          'msg' => 'No student with given admission number was found',
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
