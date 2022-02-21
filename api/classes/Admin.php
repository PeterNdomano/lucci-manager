<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

class Admin{
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
      $userData = getAdminData($id);

      if($type === 'admin'){
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

  public static function login($username, $password){
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Immature function termination',
    );

    $userData = getAdminData($username);
    if(isset($userData['token'])){
      if(password_verify($password, $userData['password'])){
        //welcome
        startSession();
        $_SESSION['userType'] = 'admin';
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

  public static function register($username, $password){
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Immature function termination',
    );

    $testData = getAdminData($username);
    if(!isset($testData['token'])){
      $password = password_hash($password, PASSWORD_DEFAULT);
      $token = password_hash($username, PASSWORD_DEFAULT);
      $sql = $conn->prepare("INSERT INTO admins (username, password, token) VALUES (?, ?, ?)");
      $sql->bind_param('sss', $username, $password, $token);
      if($sql->execute()){
        $ffo = array(
          'status' => 1,
          'msg' => 'Successful',
        );
      }
      else{
        $ffo = array(
          'status' => 0,
          'msg' => 'Server error',
        );
      }
    }
    else{
      $ffo = array(
        'status' => 0,
        'msg' => 'Username already exists',
      );
    }

    return $ffo;
  }
}

?>
