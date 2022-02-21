<?php

require_once dirname(__FILE__).'/conn.php';

function startSession(){
  if(session_status() !== PHP_SESSION_ACTIVE){
    session_start();
  }
}

function classLoader($class){
  $path = dirname(__FILE__).'/classes/'.$class.'.php';
  if(file_exists($path)){
    require_once $path;
  }
  else{
    die("Class $class not found");
  }
}
?>
