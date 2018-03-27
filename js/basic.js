$().ready(function() {  
	var search = $(".btn-search"),
		lgbtn = $("#btn-login"),
		usnbox = $("#username"),
		psdbox = $("#password"),
		tipbox = $(".z-tip"),
		beforelg = $(".m-beforelg"),
		afterlg = $(".m-afterlg"),
		lgbox = $(".z-login"),
		lgoff = $("#z-lgoff"),
		showname = $("#z-user"),
		navbox = $(".ali"),
		spsearch = $(".h-super"),
		sortbox = $(".z-sort");
	var addrs = ["basic.html","information.html","bookstore.html","booksale.html","bookstore1.html","booksearch.html","booksort.html","bookdetail.html"];
		// logincookie = $.cookie('the_cookie');
	var pathname = window.location.pathname;
	var tipstate = function(flag){
		if (flag) {
			tipbox.css('visibility', 'visible');
		}else{
    		tipbox.css('visibility', 'hidden');
		}
	}
	var loginstate = function(flag){
		if (flag) {
			beforelg.css("display","none");
    		afterlg.css("display","inline-block");
		}else{
			beforelg.css("display","inline-block");
    		afterlg.css("display","none");
		}
	}

	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

	var userid = getUrlParam("id")||"",
		usernum = getUrlParam("num")||"";
    // 根据url判断是否登录
	$(function(){
		if ((userid!=null)&&(userid!="")&&(userid!='undefined')) {
		// console.log(userid);
			$.post('getname.php', {userid: userid}, function(data, textStatus, xhr) {
				// console.log(JSON.parse(data)[0].name);
				showname.text("欢迎你，"+JSON.parse(data)[0].name);
				loginstate(true);
			});
		}else{
			loginstate(false);
		}
	});
	lgbox.click(function(event) {
		lgbtn.removeClass('disabled');
		lgbtn.removeAttr('disabled');
	});
    usnbox.focus(function(event) {
    	tipstate(false);
    });
    psdbox.focus(function(event) {
    	tipstate(false);
    });
    lgbtn.click(function() {  
		tipbox.css('color', '#F63B3B');
		tipstate(false);
        if (usnbox.val()==""||usnbox.val()==null||psdbox.val()==""||psdbox.val()==null) {
        	tipstate(true);
        	tipbox.text('请完整填写！');
        }else if(/\W/.test(usnbox.val())){
        	tipstate(true);
        	tipbox.text('用户名不可出现奇怪字符！');
        }else{
        	var username = usnbox.val();
        	var password = hex_md5(psdbox.val());
        	lgbtn.addClass('disabled');
			lgbtn.attr('disabled', 'disabled');
        	console.log(username+','+password);
        	$.post('login.php', {
					//提交工号密码,md5加密密码
					user: username,
					psd: password
				}, 
				function(data, textStatus, xhr) {
					switch (JSON.parse(data).code) {
						case "0":
							//用户名或密码错误
							tipbox.text(JSON.parse(data).msg);
							tipstate(true);
							// showname.text("欢迎你，"+JSON.parse(data).name);
							// loginstate(true);
							// setTimeout(function () {
							// 	loginstate(true);
							// 	location.href=pathname+"?id="+JSON.parse(data).id+"&num="+JSON.parse(data).num;
							// }, 1000);
							//设置1天免登录
							// $.post('set_cookie.php', {name: username,value: password}, function(data, textStatus, xhr) {
							// 	if(data=="0")
							// 		alert("设置免登录时出现错误！请联系系统管理员修复！");
							// });

							lgbtn.removeClass('disabled');
							lgbtn.removeAttr('disabled');
							break;
						case "1":
							//登录成功
							tipbox.css('color', '#257FD8');
							tipbox.text("欢迎，"+JSON.parse(data).name);
							tipstate(true);

							//设置30s免登录
							$.post('set_cookie.php', {name: username,value: password}, function(data, textStatus, xhr) {
								if(data=="0")
									alert("设置免登录时出现错误！请联系系统管理员修复！");
							});
							setTimeout(function () {
								loginstate(true);
								showname.text("欢迎你，"+JSON.parse(data).name);
								location.href=pathname+"?id="+JSON.parse(data).id+"&num="+JSON.parse(data).num;
							}, 500);
							break;
						case "-1":
							//连接数据库出错
							lgbtn.removeClass('disabled');
							lgbtn.removeAttr('disabled');
							alert(JSON.parse(data).msg);
							break;
						default:
							lgbtn.removeClass('disabled');
							lgbtn.removeAttr('disabled');
							alert("出现未知错误！请联系系统管理员修复！");
							break;
					}
			});
        }
    });
    lgoff.click(function(event) {
    	loginstate(false);
    	window.location.href=pathname;
    });
    var changeAddr = function(index){
		if (userid!=""&&usernum!="") {
			window.location.href=addrs[index]+"?id="+userid+"&num="+usernum;
		}else if(userid!=""){
			window.location.href=addrs[index]+"?id="+userid;
		}else{
			window.location.href=addrs[index];
		}
    }
    navbox.click(function(event) {
    	// console.log(navbox[0])
    	// console.log(event.target);
    	navbox.each(function(index, el) {
	    	if (event.target == this) {
	    		changeAddr(index);
	    	}
    	});
    });
    search.click(function(event) {
    	changeAddr(6);
    });
    spsearch.click(function(event) {
    	changeAddr(5);
    });
    sortbox.click(function(event) {
    	changeAddr(6);
    });
    // 购买记录与出售记录的切换
    var tabs = $(".s-tab");
    tabs.click(function(event) {
    	if (event.target == tabs[0]) {
    		changeAddr(2);
    	}else if(event.target == tabs[1]){
    		changeAddr(4);
    	}
    });
});  
$(function() {
    // $("#back_btn").click(function() {  
    //     $("#register_form").css("display", "none");  
    //     $("#login_form").css("display", "block");  
    // });
});  
