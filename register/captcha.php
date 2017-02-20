<?php
    /*
     * 验证码
     */
    function captcha(){
        header("Content-type: image/jpeg");
        $image = imagecreatetruecolor(100, 40);
        $bg = imagecolorallocate($image, 200, 200, 200);
        imagefill($image, 0, 0, $bg);
        
        $code = '23456789abcdefghjkmnpqrstuvwxyzABCEEFGHJKLMNPQRTUVWXYZ';
        
        for ($i=0;$i<4;$i++)
        {
            $font_color = imagecolorallocate($image, rand(0,150), rand(0,150), rand(0,150));
            $char = substr($code, rand(0,strlen($code)-1),1);//产生一个随机字符
            $captcha .= $char;//验证码
            $x = (100/4)*$i+rand(0,3);//字体的x轴位置
            $y =rand(25,35);//字体的y轴位置
    //         imagestring($image, 5, $x, $y, $char, $font_color);
            imagettftext($image, 20, 0, $x, $y, $font_color, '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', $char);
        }
        //干扰点
        for($i=0;$i<200;$i++)
        {
            $dot_color = imagecolorallocate($image, rand(0,200), rand(0,200), rand(0,200));
            imagesetpixel($image, rand(0,100), rand(0,40), $dot_color);
        }
        //干扰线
        for ($i=0;$i<3;$i++)
        {
            $line_color = imagecolorallocate($image, rand(0,200), rand(0,200), rand(0,200));
            imageline($image, rand(0,50), rand(0,40), rand(50,100), rand(0,40), $line_color);
        }
        
        imagejpeg($image);
        imagedestroy($image);
    }
    captcha();