$().ready(function() {
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
	'<tr>\
		<td colspan="4">\
			<div class="col-sm-4">\
				<img  id="img" src="images/testbook1.jpg" alt="">\
			</div>\
			<ul class="col-sm-6 c-bookinfo">\
				<li>红楼梦</li>\
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
			this.infos.children[0].innerHTML = content.name;
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