<?php
    require_once '../database.php';
    require_once 'captcha.php';
    
    $username = $_POST['username'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
    $email = $_POST['email'];
    $sql = $db->prepare("INSERT INTO `users`(`username`,`password`,`email`) VALUES(:username,:password,:email)");
    $arr = array(':username'=>$username,
                 ':password'=>$password,
                 ':email'=>$email
                );
    $sql->execute($arr);
    echo $sql->rowCount();