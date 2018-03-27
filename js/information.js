$().ready(function() { 
	var namebox = $('#u-name'),
		qqbox = $('#u-qq'),
		numbox = $('#u-num'),
		clgbox = $('#u-clg'),
		buybox = $('#u-buy'),
		salebox = $('#u-sale'),
		lgtimebox = $('#u-lgtime'),
		rgtimebox = $('#u-rgtime'),
		photobox = $('#u-photo'),
		signbox = $('#u-sign');
	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

	var userid = parseInt(getUrlParam("id")||""),
		usernum = parseInt(getUrlParam("num")||"");
	console.log(typeof(userid));
	if (typeof(userid)!=="number") {
		location.href="basic.html";
		alert("请先登录！");
		return false;
	}
	// console.log(typeof userid);
	// var pathname = window.location.pathname;

	$.get("getuserinfo.php", { userid: userid, num: usernum },
	function(data){
		// console.log(data);
		var userinfo = JSON.parse(data)[0];
		// console.log(userinfo);
		namebox.text(userinfo.user);
		qqbox.html(userinfo.qq);
		numbox.text(userinfo.num);
		clgbox.text(userinfo.clg);
		buybox.text(userinfo.buy);
		salebox.text(userinfo.sale);
		photobox.text(userinfo.photo);
	});
})