$().ready(function() {
    var saname = $("#saname"),
        saauthor = $("#saauthor"),
        sapress = $("#sapress"),
        sadate = $("#sadate"),
        saISBN = $("#saISBN"),
        sortslt=$("#sortslt"),
        saoldp=$("#saoldp"),
        sapin=$("#sapin"),
        sanewp=$("#sanewp"),
        saimage=$("#saimage"),
        salebtn=$(".btn-sale"),
        saletip = $(".sale-tip");

    var pathname = window.location.pathname,
    	href = window.location.href;

    saletip.hide();
	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
	var userid = getUrlParam("id")||"",
		usernum = getUrlParam("num")||"";
	// console.log(userid);
	$(".sale-info").click(function(event) {
		saletip.hide();
		// console.log(123);
	});
    //form提交
	$(".sale-info").submit(function() {
		if (userid==""||userid=="undefined") {
			alert("请先登录！");
			return false;
		}
		var sorts = [];

		$("#sort-slt :selected").each(function(){
			sorts.push($(this).val()); 
		});
		var sortstr = sorts.join(","),
	    	authors = saauthor.val();
	    // console.log($("#sortslt :selected"));
	    // console.log(sortstr);
		var	name = saname.val(),
    		author = authors,
    		press = sapress.val(),
    		date = sadate.val(),
    		ISBN = saISBN.val(),
    		oldprice = saoldp.val(),
    		pin = sapin.val(),
    		newprice = sanewp.val(),
    		images = saimage.val()||"0.jpg";
    		
		if (name == ''||author == ''||press == ''||date == ''||ISBN == ''||sortstr== ''||oldprice== ''||pin== ''||newprice== '') {
            saletip.text("请完整填写书籍信息!");
            saletip.show();
            return false;
        }
        // 判断书籍编号是否是纯数字
        if(!$.isNumeric(ISBN)){
            saletip.text("请在书籍编号栏填写数字!");
            saletip.show();
            return false;
        }

        // 判断价格是否是纯数字
        if(!$.isNumeric(oldprice)||!$.isNumeric(newprice)){
            tipbox.text("请在价格栏填写数字!");
            tipstate(true);
            return false;
        }

	    // 提交按钮设为禁用
	    salebtn.addClass('disabled');
	    salebtn.attr('disabled', 'disabled');

	    $.post('booksale.php', {
	    		said : userid,
	    		sanum : usernum,
	            saname : name,
	    		saauthor : author,
	    		sapress : press,
	    		sadate : date,
	    		saISBN : ISBN,
	    		sortslt : sortstr,
	    		saoldp : oldprice,
	    		sapin : pin,
	    		sanewp : newprice,
	    		saimg : images,
	    		sastatus : 1
	        },
	        function(data, textStatus, xhr) {
	        	console.log(data);
	            var msg = JSON.parse(data).msg;
	            switch (JSON.parse(data).code) {
	                case "1": //出售成功
	                    saletip.text(msg);
            			saletip.show();
            			salebtn.removeClass('disabled');
	                    salebtn.removeAttr('disabled');
	                    setTimeout(function() {
	                        saletip.hide();
	                        $("input").val(""); 
	                        // location.href = href;
	                    }, 1000);
	                    break;
	                case "-1": //连接数据库失败
	                    saletip.text(msg);
	                    saletip.show();
	                    salebtn.removeClass('disabled');
	                    salebtn.removeAttr('disabled');
	                    break;
	                default:
	                    console.log("出现未知错误！请联系系统管理员修复！");
	                    salebtn.removeClass('disabled');
	                    salebtn.removeAttr('disabled');
	                    break;
	            }
	        });
	    //IE浏览器会多弹出一个页面，需要return false，否则表单会自己再提交一次
	    return false;
	});
});