<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

$ffo = Admin::register('Kelvin', 'ohhmama@222');
echo json_encode($ffo);

?>
