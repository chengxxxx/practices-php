function $(idValue){
	return document.getElementById(idValue);
}

window.onload = function(){
	$('username').focus();

	var chk_username,
		chk_existusername,
		chk_password,
		chk_confire,
		chk_email;
	//控制注册按钮的可用状态
	function chkreg(){
		if ('yes' == chk_username && 'yes' == chk_password && 'yes' == chk_confire && 'yes' == chk_email) {
			$('register').disabled = false;
		}else{
			$('register').disabled = true;
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
	//检查注册名称格式
	$('username').onblur = function(){
		var name = $('username').value;
		if (name.length == 0){
			$('notify-username').innerHTML = '<font color="red">不能为空！</font>';
		}else if (name.match(/^[a-zA-Z0-9_]*/) == '') {
			$('notify-username').innerHTML = '<font color="red">输入不合法！</font>';
		}else if (name.length < 3) {
			$('notify-username').innerHTML = '<font color="red">长度不能短于3！</font>';
		}else{
			var XHR = xhr();
			XHR.open('POST', '../check_username.php',true);
			XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			XHR.send('username='+name);
			XHR.onreadystatechange = function(){
				if (4 == XHR.readyState && 200 == XHR.status) {
					var msg = XHR.responseText;
					if (1 == msg) {
						$('notify-username').innerHTML = '<font color="red">已被使用！</font>';
						chk_username = '';
					}else if (0 == msg) {
						$('notify-username').innerHTML = '<font color="red">可以使用！</font>';
						chk_username = 'yes';
					}
				}
			}
		}
		chkreg();
	};
	//检查密码密码格式
	$('password').onblur = function(){
		var password = $('password').value;
		if (password.length < 5) {
			$('notify-password').innerHTML = '<font color="red">密码不能少于5位！</font>';
		}else if (password.length >= 5 && password.length <= 8) {
			$('notify-password').innerHTML = '<font color="red">密码强度：弱！</font>';
			chk_password = 'yes';
		}else if (password.match(/^[0-9]*$/) != null || password.match(/^[a-zA-Z]*$/) != null) {
			$('notify-password').innerHTML = '<font color="red">密码强度：中！</font>';
			chk_password = 'yes';
		}else{
			$('notify-password').innerHTML = '<font color="red">密码强度：高！</font>';
			chk_password = 'yes';
		}
		chkreg();
	};
	//确认密码
	$('confire').onblur = function(){
		var password = $('password').value;
		var confire = $('confire').value;
		if (password == confire && password.length != 0 && password.length >= 5) {
			$('notify-confire').innerHTML = '<font color="red">正确！</font>';
			chk_confire = 'yes';
		}else if (confire.length == 0) {
			$('notify-confire').innerHTML = '';
		}else if (password != confire) {
			$('notify-confire').innerHTML = '<font color="red">不一致！</font>';
		}
		chkreg();
	};
	//检查邮箱格式
	$('email').onblur = function(){
		var email = $('email').value;
		var email_reg = /^\w+([-+.]\w+)*@\w+([-+.]\w+)*\.\w+$/;
		if (email.match(email_reg) == null) {
			$('notify-email').innerHTML = '<font color="red">错误！</font>';
		}else{
			$('notify-email').innerHTML = '<font color="red">正确！</font>';
			chk_email = 'yes';
		}
		chkreg();
	};
	//显示(隐藏)详细信息
	$('btn-details').onclick = function(){
		chkreg();
		$('details').style.display = ($('details').style.display == 'none' ? '' : 'none');
	};
	//注册
	$('register').onclick = function(){
		var username = $('username').value,
			password = $('password').value,
			email = $('email').value,
			// question = $('question').value,
			// anwser = $('anwser').value,
			// realname = $('realname').value,
			// birthday = $('birthday').value,
			// telephone = $('telephone').value,
			// qq = $('qq').value,
			// +'&question='+question+'&anwser='+anwser+'&realname='+realname+'&birthday='+birthday+'&telephone='+telephone+'&qq='+qq
			data = 'username='+username+'&password='+password+'&email='+email,
			XHR = xhr();
		XHR.open('POST','register.php',true);
		XHR.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		XHR.send(data);
		XHR.onreadystatechange = function(){
			if (4 == XHR.readyState && 200 == XHR.status) {
				var msg = XHR.responseText;
				if (0 == msg) {
					alert('注册失败！');
				}else if (1 == msg) {
					alert('恭喜，注册成功！');
				}
			}
		}
	};
}
