<?php
    $filename = 'wukong.jpg';
    header("Content-type: text/html;charset=utf-8");
    header("Content-type: application/octet-stream");
    header("Accept-range: bytes");
    header("Accept-lenght: ".filesize($filename));//可以不设置，浏览器会自动识别
    header("Content-disposition: attachment;filename=".basename($filename));
    readfile($filename);