<?php
    require_once '../database.php';

    $username = $_POST['username'];
    $password= $_POST['password'];

    $sql = 'SELECT * FROM `users` WHERE `username` = :username';
    $sql = $db->prepare($sql);
    $sql->execute(array(':username'=>$username));
    $hash = $sql->fetch(PDO::FETCH_ASSOC);
    $password = password_verify($password, $hash['password']);
    if ($password){
        echo 1;
    }else {
        echo 0;
    }
