<?php
	$user = 'root';
	$password ='';

	try {
		$db = new PDO('mysql:host=localhost;dbname=cheng',$user,$password);
	} catch (PDOException $e) {
		print "Error!:".$e->getMessage()."<br/>";
		die();
	}
	