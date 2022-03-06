<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $auth = Admin::auth();
  if($auth['status'] === 1){
    if(isPostFieldValid('title') && isPostFieldValid('type') && isPostFieldValid('category')){
      $title = htmlspecialchars($_POST['title']);
      $type = htmlspecialchars($_POST['type']);
      $category = htmlspecialchars($_POST['category']);

      $file = $fileError = '';
      if($type === 'soft copy'){
        //upload file
        if(isset($_FILES['file'])){
          $ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
          if($ext === 'pdf'){
            //name file
            $file = 'files/'.date("Y-m-d").time().".".$ext;
            if(move_uploaded_file($_FILES['file']['tmp_name'], $file)){
              //..
            }
            else{
              $fileError = 'File upload error';
            }
          }
          else{
            $fileError = 'Only PDF files are allowed';
          }
        }
        else{
          $fileError = "Invalid file";
        }
      }

      if($fileError === ''){
        $sql = $conn->prepare("INSERT INTO books (title, type, category, file) VALUES (?, ?, ?, ?)");
        $sql->bind_param('ssss', $title, $type, $category, $file);
        if($sql->execute()){
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
      else{
        echo json_encode(array(
          'status'=> 0,
          'msg' => $fileError,
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
