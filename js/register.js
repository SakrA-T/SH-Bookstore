$().ready(function() {
		var registbtn = $("#r-btn"),
            tipbox = $(".z-tip"),
            userbox=$("#r-user"),
            psdbox=$("#r-psd"),
            cpsdbox=$("#r-checkpsd"),
            numbox = $("#r-num"),
            qqbox = $("#r-qq"),
            clgselect = $("#r-college"),
            photobox = $("#r-photo");
	        //form提交
        var tipstate = function(flag){
            if (flag) {
                tipbox.css('visibility', 'visible');
            }else{
                tipbox.css('visibility', 'hidden');
            }
        }
        userbox.focus(function(event) {
            tipstate(false);
        });
        psdbox.focus(function(event) {
            tipstate(false);
        });
        cpsdbox.focus(function(event) {
            tipstate(false);
        });
        numbox.focus(function(event) {
            tipstate(false);
        });
        clgselect.focus(function(event) {
            tipstate(false);
        });
        photobox.focus(function(event) {
            tipstate(false);
        });
        $("form").submit(function() {
            tipbox.css('color', '#F63B3B');
            tipstate(false);
            clg = clgselect.find('option:selected').val();
            var name = userbox.val(),
                psd = psdbox.val(),
                cpsd = cpsdbox.val(),
                num = numbox.val(),
                photo = photobox.val(),
                qq = qqbox.val();

            // console.log(name+','+clg+','+psd+','+cpsd+','+qq);

            if (name == ''||name == null||clg == ''||clg == null||psd == ''||psd == null||cpsd == ''||cpsd == null||qq == ''||qq == null) {
                tipbox.text("请完整填写信息!");
                tipstate(true);
                return false;
            }

            // 判断学号是否是纯数字
            if(!$.isNumeric(num)){
                tipbox.text("学号是纯数字!");
                tipstate(true);
                return false;
            }

            // 判断QQ是否是纯数字
            if(!$.isNumeric(qq)){
                tipbox.text("QQ是纯数字!");
                tipstate(true);
                return false;
            }

            //确认两次密码是否相等
            var psd = hex_md5(psd),
                cpsd=hex_md5(cpsd);
            if(psd!=cpsd){
                tipbox.text("两次密码不同,请重新输入!");
                tipstate(true);
                cpsdbox.val('');
                return false;
            }

            //注册按钮设为禁用
            registbtn.addClass('disabled');
            registbtn.attr('disabled', 'disabled');
            //请求注册
            $.post('register.php', {
                    num: num,
                    name: name,
                    qq: qq,
                    psd: psd,
                    college: clg,
                    photo: photo?photo:'0.jpg'
                },
                function(data, textStatus, xhr) {
                    var msg = JSON.parse(data).msg;
                    switch (JSON.parse(data).code) {
                        case "1": //注册成功
                            tipbox.css('color', '#257FD8');
                            tipbox.text(msg);
                            tipstate(true);
                            registbtn.removeClass('disabled');
                            registbtn.removeAttr('disabled');
                            setTimeout(function() {
                                location.href = "basic.html";
                            }, 1000);
                            break;
                        case "0": //学号已被注册
                            tipbox.text(msg);
                            tipstate(true);
                            registbtn.removeClass('disabled');
                            registbtn.removeAttr('disabled');
                            break;
                        case "-1": //连接数据库失败
                            alert(msg);
                            registbtn.removeClass('disabled');
                            registbtn.removeAttr('disabled');
                            break;
                        case "-2": //执行查询语句失败
                            alert(msg);
                            registbtn.removeClass('disabled');
                            registbtn.removeAttr('disabled');
                            break;
                        default:
                            alert("出现未知错误！请联系系统管理员修复！");
                            registbtn.removeClass('disabled');
                            registbtn.removeAttr('disabled');
                            break;
                    }
                });
            //IE浏览器会多弹出一个页面，需要return false，否则表单会自己再提交一次
            return false;
        });
});