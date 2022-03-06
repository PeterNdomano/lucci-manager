<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $sql = $conn->prepare("SELECT * FROM books ORDER BY id DESC");
  $sql->execute();
  $result = $sql->get_result();
  $books = array();
  if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
      array_push($books, $row);
    }
    echo json_encode(array(
      'status' => 1,
      'books' => $books,
      'msg' => 'success',
    ));
  }
  else{
    echo json_encode(array(
      'status' => 0,
      'msg' => 'No books were found',
    ));
  }


}

?>
