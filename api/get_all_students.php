<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $sql = $conn->prepare("SELECT * FROM students ORDER BY id DESC");
  $sql->execute();
  $result = $sql->get_result();
  $students = array();
  if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
      $collection = json_decode($row['bookCollection']);
      $row['bookCollection'] = $collection;
      array_push($students, $row);
    }
    echo json_encode(array(
      'status' => 1,
      'students' => $students,
      'msg' => 'success',
    ));
  }
  else{
    echo json_encode(array(
      'status' => 0,
      'msg' => 'No students were found',
    ));
  }


}

?>
