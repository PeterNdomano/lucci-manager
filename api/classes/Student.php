<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';


class Student {
  public $id;
  function __construct($id){
    $this->id = $id;
  }

  public static function auth(){
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Immature function termination',
    );

    startSession();

    if(isset($_SESSION['userType']) && isset($_SESSION['userToken']) && isset($_SESSION['userId'])){
      $id = htmlspecialchars($_SESSION['userId']);
      $token = htmlspecialchars($_SESSION['userToken']);
      $type = htmlspecialchars($_SESSION['userType']);
      $userData = getStudentData($id);

      if($type === 'student'){
        if($userData['token'] === $token){
          $ffo = array(
            'status' => 1,
            'msg' => 'Welcome',
          );
        }
        else{
          $ffo = array(
            'status' => 0,
            'msg' => 'Login please',
          );
        }
      }
      else{
        $ffo = array(
          'status' => 0,
          'msg' => 'Login please',
        );
      }
    }
    else{
      $ffo = array(
        'status' => 0,
        'msg' => 'Login please',
      );
    }

    return $ffo;
  }


  public static function login($admissionNo, $password){
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Immature function termination',
    );

    $userData = getStudentDataByAd($admissionNo);
    if(isset($userData['token'])){
      if(password_verify($password, $userData['password'])){
        //welcome
        startSession();
        $_SESSION['userType'] = 'student';
        $_SESSION['userToken'] = $userData['token'];
        $_SESSION['userId'] = $userData['id'];
        $ffo = array(
          'status' => 1,
          'msg' => 'Welcome',
        );
      }
      else{
        $ffo = array(
          'status' => 0,
          'msg' => 'Wrong login details',
        );
      }
    }
    else{
      $ffo = array(
        'status' => 0,
        'msg' => 'Wrong login details',
      );
    }

    return $ffo;
  }

  public function getBooks(){
    $studentData = $this->getData();
    $ffo = array(
      'status' => 0,
      'msg' => 'No books were found',
    );
    $books = [];

    $collection = json_decode($studentData['bookCollection'], true);
    if(sizeof($collection) > 0){
      for($i = 0; $i < sizeof($collection); $i++){
        $bookData = getBookData($collection[$i]['bookId']);
        array_push($books, $bookData);
      }
    }

    if(sizeof($books) > 0){
      $ffo = array(
        'status' => 1,
        'msg' => 'Your books',
        'books' => $books,
      );
    }
    else{
      $ffo = array(
        'status' => 0,
        'msg' => 'No books were found',
      );
    }

    return $ffo;
  }

  public function getData(){
    return getStudentData($this->id);
  }

  public function updateCollection($collection){
    global $conn;
    $sql = $conn->prepare("UPDATE students SET bookCollection = ? WHERE id = ?");
    $sql->bind_param('ss', $collection, $this->id);
    $sql->execute();
  }

  public function updatePassword($password){
    global $conn;
    $password = password_hash($password, PASSWORD_DEFAULT);
    $sql = $conn->prepare("UPDATE students SET password = ? WHERE id = ?");
    $sql->bind_param('ss', $password, $this->id);
    $sql->execute();
  }

  public function updateFirstname($collection){
    global $conn;
    $sql = $conn->prepare("UPDATE students SET firstName = ? WHERE id = ?");
    $sql->bind_param('ss', $collection, $this->id);
    $sql->execute();
  }

  public function updateLastname($collection){
    global $conn;
    $sql = $conn->prepare("UPDATE students SET lastName = ? WHERE id = ?");
    $sql->bind_param('ss', $collection, $this->id);
    $sql->execute();
  }
}

?>
