<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';


class Book {
  public $id;
  function __construct($id){
    $this->id = $id;
  }

  public function updateTitle($title){
    global $conn;
    $sql = $conn->prepare("UPDATE books SET title = ? WHERE id = ?");
    $sql->bind_param('ss', $title, $this->id);
    $sql->execute();
  }

  public function updateCategory($category){
    global $conn;
    $sql = $conn->prepare("UPDATE books SET category = ? WHERE id = ?");
    $sql->bind_param('ss', $category, $this->id);
    $sql->execute();
  }



  public function getData(){
    return getBookData($this->id);
  }

  public function lend($admissionNo, $fromDate, $toDate){
    global $conn;
    $bookData = $this->getData();
    $studentData = getStudentDataByAd($admissionNo);
    $student = new Student($studentData['id']);
    $collection = json_decode($studentData['bookCollection']);

    $sql = $conn->prepare("INSERT INTO lendings ( admissionNo, fromDate, toDate) VALUES (?, ?, ?)");
    $sql->bind_param('sss', $admissionNo, $fromDate, $toDate);
    $sql->execute();

    $new = array(
      'bookId' => $bookData['id'],
      'title' => $bookData['title'],
      'lendId' => $sql->insert_id,
    );
    array_push($collection, $new);
    $collection = json_encode($collection);
    $student->updateCollection($collection);

  }
}

?>
