<?php
    require_once 'database.php';
    
    $username = $_POST['username'];
    $query = $db->prepare('SELECT * FROM users WHERE username = ?');
    $query->bindParam(1,$username,PDO::PARAM_STR);
    $query->execute();
    echo $query->rowCount();
    