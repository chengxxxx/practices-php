<?php
    /*
     * 重置密码
     */
    require_once '../database.php';
    
    $email = $_POST['email'];
    
    $sql = $db->prepare("SELECT * FROM `users` WHERE `email`=:email");
    $sql->bindParam(':email', $email);
    $result = $sql->execute();
    
    if ($result)
    {
        
    }