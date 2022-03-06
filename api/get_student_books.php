<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
  startSession();
  $id = htmlspecialchars($_SESSION['userId']);
  $student = new Student($id);
  $ffo = $student->getBooks();
  echo json_encode($ffo);

}

?>
