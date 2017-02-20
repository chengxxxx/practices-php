function $(idValue){
	return document.getElementById(idValue);
}

window.onload = function(){
	$('username').focus();

	var chk_username,chk_password,chk_capatch='yes';
	function chkreg(){
		if ('yes' == chk_username && 'yes' == chk_password && chk_capatch){
			$('login').disabled = false;
		}else{
			$('login').disabled = true;
		}
	}
	function xhr(){
		var XHR;
		if (window.XMLHttpRequest) {
			XHR = new XMLHttpRequest();
		}else{
			XHR = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return XHR;
	}
	//检查名称格式
		$('username').onblur = function(){
			var name = $('username').value;
			if (name.length == 0){
				$('notify-username').innerHTML = '<font color="red">请填写用户名！</font>';
			}else if (name.match(/^[a-zA-Z0-9_]*/) == '' || name.length < 3) {
				$('notify-username').innerHTML = '<font color="red">用户名不合法！</font>';
			}else{
				var XHR = xhr();
				XHR.open('POST', '../check_username.php',true);
				XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				XHR.send('username='+name);
				XHR.onreadystatechange = function(){
					if (4 == XHR.readyState && 200 == XHR.status) {
						var msg = XHR.responseText;
						if (1 == msg) {
							$('notify-username').innerHTML = '<font color="red">OK</font>';
							chk_username = 'yes';
						}else if (0 == msg) {
							$('notify-username').innerHTML = '<font color="red">用户名不存在！</font>';
							chk_username = '';
						}
					}
				}
			}
			chkreg();
		};
		
		//检查密码
		$('password').onblur = function(){
			var password = $('password').value;
			if (password.length == 0){
				$('notify-password').innerHTML = '<font color="red">请输入密码！</font>';
				chk_password = '';
			}else{
				$('notify-password').innerHTML = '<font color="red"></font>';
				chk_password = 'yes';
			}
			chkreg();
		};
		//登陆
		$('login').onclick = function (){
			var name = $('username').value;
			var password = $('password').value;
			var XHR = xhr();
			XHR.open('POST', 'login.php',true);
			XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			XHR.send('username='+name+'&password='+password);
			XHR.onreadystatechange = function(){
				if (4 == XHR.readyState && 200 == XHR.status) {
					var msg = XHR.responseText;
					if (1 == msg) {
						alert('登陆成功!');
						chk_username = '';
					}else if (0 == msg) {
						alert('用户名或密码错误！'+msg);
						chk_username = 'yes';
					}
				}
			}
		};
	}