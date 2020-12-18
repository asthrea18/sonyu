function MemberProc(){
	this.goods_form_obj = '.goods-form'; // ë¦¬ìŠ¤íŠ¸ í¼

	// íŒŒì¼ ê²½ë¡œ
	this.classFileAddr = '/class/member_ajax.php'; // í•´ë‹¹íŒŒì¼ ìœ„ì¹˜

	// ê¸°ë³¸ ajax í•¨ìˆ˜
	this.ajax = function(SendData){
		SendData = JSON.parse(SendData);

		var data = $.ajax({
						url:this.classFileAddr,
						type:'post',
						data:SendData,
						async:false,
						success:function(data){}
					}).responseText;
		if( data ){
			data = JSON.parse(data);
			return data;
		}
	}

	// ì„ íƒëœí¼ ë¬¸ìžì—´ ìƒì„±
	this.str_enc = function(type){
		var string = new Array();
		var obj = $(this.goods_form_obj).filter(":gt(0)");

		obj.each(function(e){
			// ì½”ë”” ìƒí’ˆ ì²´í¬í•´ì œë˜ì–´ ìžˆìœ¼ë©´ ë„˜ê¹€
			if( $(this).find('input[name="cart_idxs[]"]').length > 0 && !$(this).find('input[name="cart_idxs[]"]').prop('checked') ){
				return true;
			}

			var tmp = new Array();
			var goods_idx = $(this).find('[name="goods_idx"]').val();
			var op1 = $(this).find('[name="op1"]').val();
			var op2 = $(this).find('[name="op2"]').val();
			var ea = $(this).find('[name="ea"]').val();

			if( !ea ){
				ea = 1;
			}

			if( !goods_idx ){
				return true;
			}

			tmp.push( goods_idx );

			if( op1 ){
				tmp.push(op1);
			}

			if( op2 ){
				tmp.push(op2);
			}

			tmp = tmp.join('_')+'/'+ea;
			string.push(tmp);
		});

		return string;
	}

	// ìž¥ë°”êµ¬ë‹ˆ ì‚­ì œ
	this.cart_del = function(index_no){
//		if( !confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
//			return false;
//		}

		var data = {};
		data.method = 'cartDel';
		data.string = index_no;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	// ì£¼ë¬¸íŽ˜ì´ì§€ ì„¸íŠ¸ìƒí’ˆ ìƒí’ˆ ì‚­ì œ
	this.cart_del_set = function(set_idx) {
		var data = {};
		data.method = 'cartDelSet';
		data.string = set_idx;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	// ì„ íƒìƒí’ˆ ì£¼ë¬¸
	this.choose_buy = function(memindex){
		if ( $('[name="cart_idxs[]"]:checked').length <= 0 ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		var string = this.str_enc();
		var thCheck = GoodsProc.ajax('thCheck',string);
		if( thCheck ){
			if( !confirm(thCheck.msg) ){
				return false;
			}
		}

		CookieProc.delCookie('buymethod');
		var idxs = new Array();
		$('[name="cart_idxs[]"]:checked').each(function(){
			idxs.push($(this).val());
		});

		sessionStorage.setItem('delFreeShow','N');

		// êµ¬ë§¤ì‹œ 2ê°œ ì´ìƒ êµ¬ë§¤ í• ì¸ ìˆ˜ëŸ‰ ì²´í¬
		var data = GoodsProc.ajax('basketIsplusLimitCheck',idxs);
		if( data ){
			eval(data.code);
			return false;
		}

		if(memindex) {
			location.href = "/order/buy.php?basketindex="+idxs.join('-');
		} else {
			location.href = "/member/login.php?url=/order/buy.php?basketindex="+idxs.join('-')+"&nmb=Y";
		}
	}

	// ì „ì²´ ì„ íƒ êµ¬ë§¤
	this.all_buy = function(memindex){
		$('#allCheck').prop('checked',true);
		$('input[name="cart_idxs[]"]').prop('checked',true);

		this.choose_buy(memindex);
	}

	// ì„ íƒìƒí’ˆ ì‚­ì œ
	this.choose_del = function(){
		var obj = $(this.goods_form_obj).filter(":gt(0)");

		var data = new Array();
		obj.each(function(){
			var checkObj = $(this).find('input[name="cart_idxs[]"]');

			if( !checkObj.prop('checked') ){
				return true;
			}

			data.push(checkObj.val());
		});

		if( data.length <= 0 ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

//		if( !confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
//			return false;
//		}
		var idxs = data.join(',');
		var data = {};
		data.method = 'cartDelAll';
		data.string = idxs;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	// ì„ íƒìƒí’ˆ ì¢‹ì•„ìš”
	this.cart_all_like = function(){
		var data = {};
		data.method = 'cart_all_like';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	// ìž¥ë°”êµ¬ë‹ˆ ì „ë¶€ ë¹„ìš°ê¸°
	this.cart_all_del = function(){

		if( confirm('ì „ì²´ ìƒí’ˆì„ ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?') ){
			$('#allCheck').prop('checked',true);
			$('input[name="cart_idxs[]"]').prop('checked',true);

			this.choose_del();
		}
	}

	// ìž¥ë°”êµ¬ë‹ˆ ìˆ˜ëŸ‰ ë³€ê²½
	this.change_ea = function(num){
		var obj = $(event.target||event.srcElement);
		var tr = obj.closest(this.goods_form_obj);
		var cartIdx = tr.find('input[name="cart_idx"]').val();
		var goods_idx = tr.find('input[name="goods_idx"]').val();
		var ea = tr.find('input[name="ea"]').val();
		var newEA = Number(ea)+Number(num);

		if( newEA <= 0 ){
			//this.cart_del(cartIdx); // ìž¥ë°”êµ¬ë‹ˆ ì‚­ì œ í•¨ìˆ˜
			return false;
		}

		// ì†Œë‚˜ íŽ˜ìŠ¤íƒ€ ëžœë¤ë°•ìŠ¤ ìƒí’ˆ ìˆ˜ëŸ‰ë³€ê²½ ë¶ˆê°€ 2020.12.04
		if(goods_idx == '67408'){
			alert('í•´ë‹¹ìƒí’ˆì€ ìˆ˜ëŸ‰ì„ ë³€ê²½í•˜ì‹¤ ìˆ˜ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		var data = {};
		data.method = 'cartChangeEA';

		var stringData = {};
		stringData.index_no = cartIdx;
		stringData.ea = newEA;
		data.string = stringData;
		data = JSON.stringify(data);

		this.ajax(data); // ìˆ˜ëŸ‰ë³€ê²½ ë¡œì§
		tr.find('input[name="ea"]').val(newEA); // í™”ë©´ì— ê·¸ë ¤ì¤Œ

		var data = GoodsProc.get_price(); // ì´ ê²°ì œê¸ˆì•¡

		$('#total_price').text(BuyProc.number_format(data.total_price+data.discount_member));
		$('#total_discount').text(BuyProc.number_format(data.total_discount+data.discount_member));
		$('#del_account').text(BuyProc.number_format(data.del_account));
		$('#use_account').text(BuyProc.number_format(data.use_account));
	}

	// ë‚´ê°€ ì²´í¬í•œê²ƒ í•¨ê»˜ ì²´í¬ë˜ëŠ” input
	this.with_check = function(selector){
		var obj = $(event.target||event.srcElement);
		var checked = obj.prop('checked');
		$(selector).prop('checked',checked);
	}

	// ë¡œê·¸ì¸ ë°ì´í„° ì²´í¬
	this.loginDataCheck = function(){
		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');

		if( $.trim(form.find('[name="userID"]').val()) == '' ){
			form.find('[name="userID"]').focus();
			alert('ì•„ì´ë””ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
			return false;
		}

		if( $.trim(form.find('[name="userPW"]').val()) == '' ){
			form.find('[name="userPW"]').focus();
			alert('ë¹„ë°€ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
			return false;
		}
	}

	// ì¦ê²¨ì°¾ê¸°
	this.addFavor = function(){
		var data = {};
		data.method = 'addFavor';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);

		if( returnData ){
			if( returnData.js_code ){
				eval( returnData.js_code );
				return false;
			}
		}

        var bookmarkURL = "https://attrangs.co.kr";
        var bookmarkTitle = "ì•„ëœ¨ëž‘ìŠ¤";
        var triggerDefault = false;

        if (window.sidebar && window.sidebar.addPanel) {
            // Firefox version < 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
            // Firefox version >= 23 and Opera Hotlist
            var $this = $(this);
            $this.attr('href', bookmarkURL);
            $this.attr('title', bookmarkTitle);
            $this.attr('rel', 'sidebar');
            $this.off(e);
            triggerDefault = true;
        } else if (window.external && ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // WebKit - Safari/Chrome
            alert(returnData.msg+"\n"+(navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D í‚¤ë¥¼ ëˆŒëŸ¬ ì¦ê²¨ì°¾ê¸°ì— ë“±ë¡í•˜ì‹¤ ìˆ˜ ìžˆìŠµë‹ˆë‹¤.');
        }

		location.reload();

        return triggerDefault;
	}

	this.getGradeCoupon = function(){ // ë“±ê¸‰ë³„ ì¿ í° ë°›ê¸°
		var data = {};
		data.method = 'getGradeCoupon';
		data.string = '';
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	this.getTypeCoupon = function(type){
		var data = {};
		data.method = 'getTypeCoupon';
		data.string = type;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval( returnData.js_code );
	}

	// ìƒì„¸íŽ˜ì´ì§€ì—ì„œ ìž¥ë°”êµ¬ë‹ˆ íŒì—…ì—ì„œ ì‚­ì œí•  ë•Œ íŽ˜ì´ì§€ ë¡œë”©ë˜ì§€ ì•Šê¸° ìœ„í•´ ë”°ë¡œ ë§Œë“¬
	this.view_cart_del = function(index_no){
		var data = {};
		data.method = 'cartDel';
		data.string = index_no;
		data = JSON.stringify(data);
		this.ajax(data);

		// ì‚­ì œ í›„ ë¦¬ìŠ¤íŠ¸ ajax
		$.ajax({
			url: '/shop/cartList.php',
			async: false,
			success: function(result) {
				$('#cartPopup .cart-product-list').html(result);
				$('#cartSlider').css('visibility','visible');
				$('#cartSlider').slick({
					lazyLoad: 'ondemand',
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					dots: true,
					swipe:false
				});
			}
		});
	}

	// ìƒì„¸íŽ˜ì´ì§€ì—ì„œ ìž¥ë°”êµ¬ë‹ˆ íŒì—…ì—ì„œ ì‚­ì œí•  ë•Œ íŽ˜ì´ì§€ ë¡œë”©ë˜ì§€ ì•Šê¸° ìœ„í•´ ë”°ë¡œ ë§Œë“¬ ( ì„¸íŠ¸ìƒí’ˆ ì‚­ì œ )
	this.view_cart_del_set = function(set_idx){
		var data = {};
		data.method = 'cartDelSet';
		data.string = set_idx;
		data = JSON.stringify(data);
		this.ajax(data);

		// ì‚­ì œ í›„ ë¦¬ìŠ¤íŠ¸ ajax
		$.ajax({
			url: '/shop/cartList.php',
			async: false,
			success: function(result) {
				$('#cartPopup .cart-product-list').html(result);
				$('#cartSlider').css('visibility','visible');
				$('#cartSlider').slick({
					lazyLoad: 'ondemand',
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					dots: true,
					swipe:false
				});
			}
		});
	}
}

// ê¸°ë³¸í´ëž˜ìŠ¤ ìƒì„±
var MemberProc = new MemberProc();
