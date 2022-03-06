<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $auth = Admin::auth();
  if($auth['status'] === 1){
    if(isPostFieldValid('bookId') && isPostFieldValid('title') && isPostFieldValid('category')){
      $title = htmlspecialchars($_POST['title']);
      $category = htmlspecialchars($_POST['category']);
      $bookId = htmlspecialchars($_POST['bookId']);

      $book = new Book($bookId);
      $book->updateTitle($title);
      $book->updateCategory($category);
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
