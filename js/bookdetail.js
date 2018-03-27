$().ready(function() {
	var sortlist = $('.s-cl'),
		sorts = sortlist.children(),
		bookinfo = $("#bookinfo"),
		pagelist = $(".z-page");

		$.post('bookdetail.php',{

		},
		function(data) {
			var itemdata = JSON.parse(data);
			bookinfo.children().remove();
			// var date = $.parseJSON(data);
			// console.log(itemdata);

			jQuery.each(itemdata, function(i, val) {  
				var item = new Modal();
				item.show(val);
			});
		});

	var classUtil = {
		addClass: function (node, className){
			var current = node.className || "";
			if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
			node.className = current? ( current + " " + className ) : className;
			}
		},
		delClass: function (node, className){
			var current = node.className || "";
			if (!current) return;
			node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
		}
	}

	function showsort(parent,tag,text){
		var flag = 1;
		if (parent.children!='') {
			for(var i=0;i<parent.children.length;i++){
				if (parent.children[i].innerHTML==text) {
					flag = 0;
				}
			}
		}
		if (flag==1) {
			var item = document.createElement(tag);
			item.innerHTML = text;
			parent.append(item);
		}
	}

	sortlist.click(function(e) {
		// console.log(e.target.tagName)
		var sorts = {'status': 0};
		if (e.target.tagName=="LI") {
			if (e.target.getAttribute('class')=='actived') {
				classUtil.delClass(e.target,'actived');
			}else{

				classUtil.addClass(e.target,'actived');
			}

			$(".actived").each(function(index, el) {
				sorts['status'] = 1;
				var value = [];
				var type = el.parentNode.dataset.type;
			// console.log(type);
				value = sorts[type]||[];
				value.push(el.innerHTML);
				sorts[type] = value;
			});
			// $(".actived").dataset;
			// console.log(sorts);
			if (!sorts['0']&&!sorts[1]&&!sorts[2]&&!sorts[3]) {
				sorts['status'] = 0;
			}
				// console.log(sorts);
			getBooks(1,sorts);
		}
	});

	getBooks(1,'');

	function htmlToNode(str){
		var container = document.createElement('tr');
		container.innerHTML = str;
		return container;
	}

	//复制属性函数
	function extend(o1,o2){
		for(var i in o2){
			if (typeof(o1[i])==='undefined') {
				o1[i] = o2[i];
			}
		}
		return o1;
	}
	//设置tbody内容
	var listitem = 
	'<tr data-id = >\
		<td colspan="4">\
			<div class="col-sm-4">\
				<a style="display:inline-block;" href="bookdetail.html"><img  id="img" class="image" src="images/testbook1.jpg" alt=""></a>\
			</div>\
			<ul class="col-sm-6 c-bookinfo">\
				<li class="name"><a style="display:inline-block;" href="bookdetail.html">红楼梦</a></li>\
				<li>作者：曹雪芹</li>\
				<li>出版社：文学出版社</li>\
				<li>出版时间：2015</li>\
			</ul>\
		</td>\
		<td><span id="seller">sakra</span></td>\
		<td class="z-price" id="price">￥60.00</td>\
		<td>\
		<button type="submit" class="btn btn-spcart"><i class="icon-shopping-cart"></i>加入购物车</button><br>\
		<button type="submit" class="btn btn-addclt"><i class=" icon-star"></i>添加收藏</button>\
		</td>\
	</tr>';
	function Modal(options){
		options = options||{};
		//保证每次创建都具有独一无二的节点
		this.container = this._layout.cloneNode(true);
		// console.log(this.container);
		//取内容节点，用于插入自定义内容
		this.infos = this.container.querySelector('.c-bookinfo');
		this.img = this.container.querySelector('#img');
		this.seller = this.container.querySelector('#seller');
		this.price = this.container.querySelector('#price');

		//把一些自定义的属性方法复制到组件实例上
		extend(this,options);

	}

	extend(Modal.prototype,{
		_layout:htmlToNode(listitem),
		setContent:function(content){
			if (!content) {return;}
			//this.body就是上面取的类名为modal_body的元素节点
			var authors = content.author.split('-');
			authors = authors.join('、');
			this.img.src = 'images/testbook2.jpg';
			this.infos.children[0].children.innerHTML = content.name;
			this.infos.children[1].innerHTML = '作者:'+authors;
			this.infos.children[2].innerHTML = '出版社:'+content.press;
			this.infos.children[3].innerHTML = '出版时间:'+content.date;
			// console.log(typeof iteminfo);

			this.seller.innerHTML = content.seller;
			this.price.innerHTML = '￥'+content.newprice;
		},

		//显示
		show:function(content){
			//将自定义内容加到要显示内容的节点中
			if (content) {
				this.setContent(content);
			}
			//将弹窗的div加到body里
			// console.log(this.container);
			$('#bookinfo').append(this.container);
		},
	})
});
(function(){
	var imgbox = $(".image"),
		namebox = $(".name");
		console.log(imgbox);
	imgbox.click(function(event) {
		changeAddr();
	});
	namebox.click(function(event) {
		changeAddr();
	});
})();