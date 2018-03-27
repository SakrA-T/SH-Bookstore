<?php 
	$name=$_POST['name'];
	$value=$_POST['value'];
	if(setcookie($name, $value, time()+3600*24*1))
	// if(setcookie($name, $value, time()+30))
		echo 1;
	else
		echo 0;
?>