function GoodsProc(){
	// í•¨ìˆ˜ ëŒë¦¬ê¸° ìœ„í•œ í¼
	this.goods_form_obj = '.goods-form'; // ë¦¬ìŠ¤íŠ¸ í¼
	this.goods_form_gname = '.gname'; // ìƒí’ˆëª…
	this.goods_form_opname = '.opname'; // ìƒí’ˆëª…
	this.goods_form_account = '.account'; // ìƒí’ˆê¸ˆì•¡
	this.goods_codi_form_obj = '.goods-codi-form';
	this.goods_ori_form = '.select-form'; // ì´ˆê¸°í™”ë¥¼ ìœ„í•œ í¼
	this.goods_form_info = '.goods-form-info'; // ì´ˆê¸°ì„ íƒì—†ì„ë•Œì˜ ìƒìž

	// ë‹¤ì¤‘ì˜µì…˜ì¼ì‹œ ì´ˆê¸°í™”í•˜ëŠ” ê°ì²´ì™€ í´ëž˜ìŠ¤ëª…
	this.removeClassObj = '.optSelect a';
	this.removeClassName = 'active';

	// ê¸ˆì•¡ì„¤ì •
	this.total_price_obj = '#total-price'; // ì´ ê¸ˆì•¡ ì„ íƒìž
	this.total_ea_obj = '#total-count'; // ì´ìˆ˜ëŸ‰ ì„ íƒìž

	// ì½”ë””ìƒí’ˆ
	this.total_codi_price_obj = '#total-codi-price'; // ì´ ê¸ˆì•¡ ì„ íƒìž
	this.total_codi_ea_obj = '#total-codi-count'; // ì´ìˆ˜ëŸ‰ ì„ íƒìž
	this.total_codi_price_dis_obj = '#total-codi-price-dis'; // ê¸°ê°„í• ì¸ê¸ˆì•¡ì´ ë”í•´ì§„ ì´ì•¡

	this.more_dis_obj = '.moreDiscountArea'; // í•˜ë‚˜ ë” í• ì¸ ì˜ì—­

	// íŒŒì¼ ê²½ë¡œ
	this.classFileAddr = '/class/goods_ajax.php'; // í•´ë‹¹íŒŒì¼ ìœ„ì¹˜

	// ê¸°ë³¸ ajax í•¨ìˆ˜
	this.ajax = function(method,string){
		var data = $.ajax({
						url:this.classFileAddr,
						type:'post',
						data:{'method':method,'string':string},
						async:false,
						success:function(data){}
					}).responseText;
		if( data ){
			data = JSON.parse(data);
			return data;
		}
	}

	// ì„ íƒëœ ìƒí’ˆëª©ë¡ì¤‘ ë¹ˆê°’ì´ ìžˆëŠ”ì§€
	this.null_check = function(type){
		var nullCnt = 0;

		var obj = $(this.goods_form_obj).filter(':gt(0)');

		if( type == 'codi' ){
			obj = $(this.goods_codi_form_obj).filter(':visible');
		}

		if( obj.length <= 0 ){
			alert('ìƒí’ˆì„ ì„ íƒí•´ì£¼ì„¸ìš”');
			nullCnt++;
			return false;
		}

		obj.each(function(e){
			// ì½”ë”” ìƒí’ˆ ì²´í¬í•´ì œë˜ì–´ ìžˆìœ¼ë©´ ë„˜ê¹€
			if( $(this).find('.codiIsCheck').length > 0 && !$(this).find('.codiIsCheck').prop('checked') ){
				return true;
			}

			if(type != 'set'){
				if( $(this).find('[name="op1"]').length && $(this).find('[name="op1"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="op2"]').length && $(this).find('[name="op2"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}
			}else{
				if( $(this).find('[name="op1_0"]').length && $(this).find('[name="op1_0"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="op2_0"]').length && $(this).find('[name="op2_0"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="op1_1"]').length && $(this).find('[name="op1_1"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}

				if( $(this).find('[name="op2_1"]').length && $(this).find('[name="op2_1"]').val() == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					nullCnt++;
					return false;
				}
			}

			if( $(this).find('[name="ea"]').length && $(this).find('[name="op2"]').val() == '' ){
				alert('ìˆ˜ëŸ‰ì„ ì„¤ì •í•´ì£¼ì„¸ìš”');
				nullCnt++;
				return false;
			}
		});

		if( nullCnt > 0 ){
			return false;
		}else{
			return true;
		}
	}

	// ì˜µì…˜ì„ íƒ ì²´í¬
	this.select_check = function(){
		var obj = $(event.target||event.srcElement).closest('form');

		if( !obj ){
			return true;
		}

		if( obj.find('[name="op1"]').length && obj.find('[name="op1"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="op2"]').length && obj.find('[name="op2"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="ea"]').length && obj.find('[name="ea"]').val() == '' ){
			return true;
		}

		return false;
	}

	// ì˜µì…˜ì„ íƒ ì²´í¬ - ì„¸íŠ¸ìƒí’ˆ
	this.select_check_set = function(){

		var obj = $(event.target||event.srcElement).closest('form');

		if( !obj ){
			return true;
		}

		if( obj.find('[name="op1_0"]').length && obj.find('[name="op1_0"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="op1_1"]').length && obj.find('[name="op1_1"]').val() == '' ){
			return true;
		}

		if( obj.find('[name="op2_0"]').length && ( obj.find('[name="op2_0"]').val() == '' || !obj.find('[name="op2_0"]').val() ) ){
			return true;
		}

		if( obj.find('[name="op2_1"]').length && ( obj.find('[name="op2_1"]').val() == '' || !obj.find('[name="op2_1"]').val() )){
			return true;
		}

		if( obj.find('[name="ea"]').length && obj.find('[name="ea"]').val() == '' ){
			return true;
		}

		return false;
	}

	// ì´ë¯¸ì„ íƒí•œ ì˜µì…˜ì¸ì§€
	this.opt_already = function(string) {
		var cnt = $(this.goods_form_obj).filter("[string-code='"+string+"']").length;
		if( cnt > 0 ){
			return true;
		}else{
			return false;
		}
	}

	// ì˜µì…˜ë³µì‚¬
	this.opt_copy = function(string){
		// ê¸°ë³¸ ë³µì‚¬ì˜ì—­
		var html = $(this.goods_form_obj).filter(':first').clone();

		// ì„¸íŒ…í•  ê°’
		var goods_obj = $(event.target||event.srcElement).closest('form').find('[name="goods_idx"]');
		var goods_idx = goods_obj.val();
		var gname = goods_obj.data('gname');
		var data = this.ajax('get_price',string);

		var op1_obj = $(event.target||event.srcElement).closest('form').find('[name="op1"] option:selected');
		var op2_obj = $(event.target||event.srcElement).closest('form').find('[name="op2"] option:selected');

		// í•˜ë‚˜ë”í• ì¸ ì œí•œ ìžˆìœ¼ë©´ ê²½ê³ ì°½ ë„ì›€ 2020-07-08
		var copyOk = false;
		if($(this.goods_form_obj).length % 2 != 0){
			copyOk = true;
		}

		if(op1_obj.data('ispluslimit') > 0 && copyOk ){ // í™€ìˆ˜ ê°¯ìˆ˜ ê³¨ëžì„ë•Œ ê²½ê³ ì°½ ë„ì›€
			alert("í•´ë‹¹ ì œí’ˆì€ 1+1 ê¸°íš ìƒí’ˆìž…ë‹ˆë‹¤.\ní•˜ë‚˜ ë” ê³¨ë¼ì£¼ì…”ì•¼ êµ¬ë§¤ê°€ ê°€ëŠ¥í•´ìš”~");
		}

		var op1 = op1_obj.val();
		var op2 = op2_obj.val();

		var op1name = op1_obj.data('opname');
		var op2name = op2_obj.data('opname');
		var expect = op2_obj.data('rdate'); // ìž…ê³ ì˜ˆì •ì¼ ì¶”ê°€

		var quickData = this.ajax('getQuickData',goods_idx+'/'+op1+'/'+op2); // ë²ˆê°œë°°ì†¡ ì•„ì´ì½˜ ì¶œë ¥ìš©

		var tmp_opname = new Array();

		if( $('select[name="gCode"]').length > 0 ){
			var tmp_code = gname.split(' ');
			tmp_opname.push(tmp_code[0]);
		}

		if( op1name ){
			tmp_opname.push(op1name);
		}
		if( op2name ){
			tmp_opname.push(op2name);
		}

		tmp_opname = tmp_opname.join(' / ');

		html.find(this.goods_form_gname).text(gname);
		if(expect) {
			html.find(this.goods_form_opname).html(tmp_opname + quickData + expect);
		} else {
			html.find(this.goods_form_opname).html(tmp_opname + quickData);
		}

		html.find(this.goods_form_account).html(this.number_format(data.total_price));
		html.show();

		// ê°’ì„ ë¶™ì—¬ë„£ìŒ
		html.find('[name="goods_idx"]').val(goods_idx);
		html.find('[name="op1"]').val(op1);
		html.find('[name="op2"]').val(op2);
		html.attr('string-code',string);
		$(this.goods_form_obj).filter(':last').after(html);

		// ì´ì•¡ ë‹¤ì‹œ ê³„ì‚°
		this.get_price();

		// ì„ íƒì´ˆê¸°í™”
		if( this.removeClassObj != '' ){
			//$(this.removeClassObj).removeClass( this.removeClassName );
		}

		/*
		// ë‘ë²ˆì§¸ì˜µì…˜ ì•ˆë¹„ìš°ê³  ê¹”ë³„ë¡œ ì‚¬ê²Œí•¨ 2019-05-13
		$(this.goods_ori_form).find('[name="op1"]').val('');
		$(this.goods_ori_form).find('[name="op2"] option:gt(0)').remove();
		$('.size.optSelect').empty().append("<li style='padding-top:10px'>ìƒ‰ìƒì„ ë¨¼ì € ì„ íƒí•´ ì£¼ì„¸ìš”</li>");
		*/
	}

	// ì˜µì…˜ë³µì‚¬ ( ì„¸íŠ¸ìƒí’ˆìš© )
	this.opt_copy_set = function(string){
		// ê¸°ë³¸ ë³µì‚¬ì˜ì—­
		var html = $(this.goods_form_obj).filter(':first').clone();

		// ì„¸íŒ…í•  ê°’
		var goods_obj = $(event.target||event.srcElement).closest('form').find('[name="goods_idx"]'); // í•©ì³ì§„ ì„¸íŠ¸ìƒí’ˆ
		var goods_obj0 = $(event.target||event.srcElement).closest('form').find('[name="set_goods_idx0"]'); // ì„¸íŠ¸ìƒí’ˆ 1
		var goods_obj1 = $(event.target||event.srcElement).closest('form').find('[name="set_goods_idx1"]'); // ì„¸íŠ¸ìƒí’ˆ 2

		var gname = goods_obj.data('gname');
		var goods_idx = goods_obj.val();
		var goods_idx0 = goods_obj0.val();
		var goods_idx1 = goods_obj1.val();

		var goods_gname1 = goods_obj0.data('gname');
		var goods_gname2 = goods_obj1.data('gname');

		//var data = this.ajax('get_price',string);
		var account = goods_obj.data('account');

		var op1_0_obj = $(event.target||event.srcElement).closest('form').find('[name="op1_0"] option:selected');
		var op2_0_obj = $(event.target||event.srcElement).closest('form').find('[name="op2_0"] option:selected');
		var op1_1_obj = $(event.target||event.srcElement).closest('form').find('[name="op1_1"] option:selected');
		var op2_1_obj = $(event.target||event.srcElement).closest('form').find('[name="op2_1"] option:selected');

		var set_group = $('.add-list .list li').length;

		var op1_0 = op1_0_obj.val();
		var op2_0 = op2_0_obj.val();
		var op1_1 = op1_1_obj.val();
		var op2_1 = op2_1_obj.val();

		var op1name_0 = op1_0_obj.data('opname');
		var op2name_0 = op2_0_obj.data('opname');
		var op1name_1 = op1_1_obj.data('opname');
		var op2name_1 = op2_1_obj.data('opname');
		//var expect = op2_0_obj.data('rdate'); // ìž…ê³ ì˜ˆì •ì¼ ì¶”ê°€
		//var expect2 = op2_1_obj.data('rdate'); // ìž…ê³ ì˜ˆì •ì¼ ì¶”ê°€

		//var quickData = this.ajax('getQuickData',goods_idx+'/'+op1+'/'+op2); // ë²ˆê°œë°°ì†¡ ì•„ì´ì½˜ ì¶œë ¥ìš©
		var quickData = '';

		var tmp_opname = new Array();
		var tmp_opname2 = new Array();

//		if( $('select[name="gCode"]').length > 0 ){
//			var tmp_code = gname.split(' ');
//			tmp_opname.push(tmp_code[0]);
//		}

		if( op1name_0 ){ tmp_opname.push(op1name_0); }
		if( op2name_0 ){ tmp_opname.push(op2name_0); }
		if( op1name_1 ){ tmp_opname2.push(op1name_1); }
		if( op2name_1 ){ tmp_opname2.push(op2name_1); }

		tmp_opname = tmp_opname.join('_');
		tmp_opname2 = tmp_opname2.join('_');

		tmp_opname = '<div style="display:inline-block; font-weight:bold;">ì„ íƒ1+ì„ íƒ2</div> '+goods_gname1+'_'+tmp_opname+' / '+goods_gname2+'_'+tmp_opname2;

		tmp_opname = this.str_cut(tmp_opname);

		html.find(this.goods_form_gname).text(gname);
//		if(expect) {
//			html.find(this.goods_form_opname).html(tmp_opname + quickData + expect);
//		} else {
			html.find(this.goods_form_opname).html(tmp_opname + quickData);
		//}

		html.find(this.goods_form_account).html(this.number_format(account));
		html.show();

		// ê°’ì„ ë¶™ì—¬ë„£ìŒ
		html.find('[name="goods_idx"]').val(goods_idx);
		html.find('[name="set_goods_idx0"]').val(goods_idx0);
		html.find('[name="set_goods_idx1"]').val(goods_idx1);
		html.find('[name="op1_0"]').val(op1_0);
		html.find('[name="op2_0"]').val(op2_0);
		html.find('[name="op1_1"]').val(op1_1);
		html.find('[name="op2_1"]').val(op2_1);
		html.find('[name="set_group"]').val(set_group);
		html.attr('string-code',string);
		$(this.goods_form_obj).filter(':last').after(html);

		// ì´ì•¡ ë‹¤ì‹œ ê³„ì‚°
		this.get_price();
	}

	this.str_cut = function(str){
		var len = 120;
		var s = 0;
		for(var i=0;i<str.length;i++){
			s += (str.charCodeAt(i) > 128) ? 2 : 1;
			if (s > len) return str.substring(0,i) + "...";
		}
		return str;
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ
	this.set_opt = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');

		if( obj.attr('name') == 'op1' && $(this.goods_ori_form).find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();

			var data = this.ajax('getOp2List',string);

			$(this.goods_ori_form).find('[name="op2"]').find('option:gt(0)').remove();
			$(this.goods_ori_form).find('[name="op2"]').append(data.html);
		}

		// ì˜µì…˜ ë‹¤ ì„ íƒí–ˆëŠ”ì§€
		if( this.select_check() ){
			return false;
		}

		// ì„ íƒì˜µì…˜ ë¬¸ìžì—´
		var string = this.str_enc('select');

		// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
		if( this.get_soldout(string) ){
			return false;
		}

		// ì´ë¯¸ì„ íƒí•œ ì˜µì…˜ì´ë¼ë©´ ë„˜ê¹€
		if( this.opt_already(string) ){
			alert('ì´ë¯¸ ì„ íƒí•œ ì˜µì…˜ìž…ë‹ˆë‹¤.');

			// ì„ íƒì´ˆê¸°í™”
			obj.removeClass( this.removeClassName );

			$(this.goods_ori_form).find('[name="op2"]').val('');

			$(event.target||event.srcElement).val('');
			return false;
		}

		// ì˜µì…˜ ì„¤ëª… ì§€ì›€
		$(this.goods_form_info).hide();

		// ì˜µì…˜ ë³µì‚¬
		this.opt_copy(string);

		// í´ëž˜ìŠ¤ ì§€ì›€
		//obj.removeClass( this.removeClassName );
		//$(this.goods_ori_form).find('[name="op2"]').val('');
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ
	this.set_opt2 = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');

		if( obj.attr('name') == 'op1' && $(this.goods_ori_form).find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();

			var data = this.ajax('getOp2List3',string);

			$(this.goods_ori_form).find('[name="op2"]').find('option:gt(0)').remove();
			$(this.goods_ori_form).find('[name="op2"]').append(data.html);
		}

		// ì˜µì…˜ ë‹¤ ì„ íƒí–ˆëŠ”ì§€
		if( this.select_check() ){
			return false;
		}

		// ì„ íƒì˜µì…˜ ë¬¸ìžì—´
		var string = this.str_enc('select');

		// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
		if( this.get_soldout(string) ){
			return false;
		}

		// ì´ë¯¸ì„ íƒí•œ ì˜µì…˜ì´ë¼ë©´ ë„˜ê¹€
		if( this.opt_already(string) ){
			alert('ì´ë¯¸ ì„ íƒí•œ ì˜µì…˜ìž…ë‹ˆë‹¤.');

			// ì„ íƒì´ˆê¸°í™”
			obj.removeClass( this.removeClassName );

			$(this.goods_ori_form).find('[name="op2"]').val('');

			$(event.target||event.srcElement).val('');
			return false;
		}

		// ì˜µì…˜ ì„¤ëª… ì§€ì›€
		$(this.goods_form_info).hide();

		// ì‚¬ì´ì¦ˆ ì„ íƒí‘œì‹œë¥¼ ìœ„í•¨(ì‚¬ì´ì¦ˆê°€ ì²´í¬ë°•ìŠ¤ë¡œ ë˜ì–´ìžˆê¸° ë•Œë¬¸ì—)
		var radioObj = obj.closest('li').find('input[type="radio"]');
		radioObj.prop('checked',true);

		// ì˜µì…˜ ë³µì‚¬
		this.opt_copy(string);

		// í´ëž˜ìŠ¤ ì§€ì›€
		//obj.removeClass( this.removeClassName );
		//$(this.goods_ori_form).find('[name="op2"]').val('');
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ - ì„¸íŠ¸ìƒí’ˆ
	this.set_opt_set = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var set_key = obj.closest('li').data('set_key');
		var type = obj.closest('li').data('type');
		var viewType = obj.closest('li').data('viewtype');
		var goods_idx = obj.data('goods_idx');

		if(set_key == 0){set_key == '0';}
		if(viewType == 2){ set_key = set_key.toString(); }
		if(!set_key){ set_key = obj.data('set_key'); }

		// ì˜µì…˜1,2ê¹Œì§€ ìžˆê³  select ë°•ìŠ¤ ì˜µì…˜ì¼ë•Œ
		if( obj.attr('name') == 'op1_0' && $(this.goods_ori_form).find('[name="op2_0"]').length > 0 ){
			var string = goods_idx+'/'+obj.val()+'/'+'0';
			var data = this.ajax('getOp2List3_set',string);
			$(this.goods_ori_form).find('[name="op2_0"]').find('option:gt(0)').remove();
			$(this.goods_ori_form).find('[name="op2_0"]').append(data.html);
		}

		if( obj.attr('name') == 'op1_1' && $(this.goods_ori_form).find('[name="op2_1"]').length > 0 ){
			var string = goods_idx+'/'+obj.val()+'/'+'1';
			var data = this.ajax('getOp2List3_set',string);
			$(this.goods_ori_form).find('[name="op2_1"]').find('option:gt(0)').remove();
			$(this.goods_ori_form).find('[name="op2_1"]').append(data.html);
		}

		// ì‚¬ì´ì¦ˆ ì„ íƒí‘œì‹œë¥¼ ìœ„í•¨(ì‚¬ì´ì¦ˆê°€ ì²´í¬ë°•ìŠ¤ë¡œ ë˜ì–´ìžˆê¸° ë•Œë¬¸ì—)
		var radioObj = obj.closest('li').find('input[type="radio"]');
		radioObj.prop('checked',true);

		// ì„ íƒì˜µì…˜ ë¬¸ìžì—´
		var string = this.str_enc_set(set_key,'soldoutChk');

		// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
		if( this.get_soldout(string) ){
			return false;
		}

		// ëª¨ë“  ì˜µì…˜ ë‹¤ ì„ íƒí–ˆëŠ”ì§€
		if( this.select_check_set() ){
			return false;
		}

		var string = this.str_enc_set(set_key,'alreadyChk');

		// ì´ë¯¸ì„ íƒí•œ ì˜µì…˜ì´ë¼ë©´ ë„˜ê¹€
		if( this.opt_already(string) ){
			alert('ì´ë¯¸ ì„ íƒí•œ ì˜µì…˜ìž…ë‹ˆë‹¤.');

			// ì„ íƒì´ˆê¸°í™”
			obj.removeClass( this.removeClassName );
			$(this.goods_ori_form).find('[name="op2_'+set_key+'"]').val('');

			$(event.target||event.srcElement).val('');
			return false;
		}

		// ì˜µì…˜ ì„¤ëª… ì§€ì›€
		$(this.goods_form_info).hide();

		// ì˜µì…˜ ë³µì‚¬
		this.opt_copy_set(string);
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ
	this.set_opt3 = function(){ // ì„¸íŠ¸ìš©
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var li = obj.closest('li');

		if( obj.attr('name') == 'op1' && li.next('li').find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();

			var data = this.ajax('getOp2List3',string);

			li.next('li').find('[name="op2"]').find('option:gt(0)').remove();
			li.next('li').find('[name="op2"]').append(data.html);
		}

		if( obj.find(':selected').text().indexOf('[í’ˆì ˆ]') != -1 ){
			alert('í’ˆì ˆëœ ìƒí’ˆìž…ë‹ˆë‹¤.');
			obj.find('option:first').prop('selected',true);
			return false;
		}

		// ì˜µì…˜ ë‹¤ ì„ íƒí–ˆë‹ˆ
		var err = 0;
		$(this.goods_ori_form).find('select').each(function(){
			if( $(this).val() == '' ){
				err++;
			}
		});

		// ì˜µì…˜ ë‹¤ ê³¨ëžë‹¤ë©´
		if( err == 0 ){
			//var string = this.str_enc('select');
			//alert(string);
			//var string = {};

			$('.setGoodsForm').each(function(){
			});
		}

		/*

		// ì„ íƒì˜µì…˜ ë¬¸ìžì—´
		var string = this.str_enc('select');

		// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
		if( this.get_soldout(string) ){
			return false;
		}

		// ì´ë¯¸ì„ íƒí•œ ì˜µì…˜ì´ë¼ë©´ ë„˜ê¹€
		if( this.opt_already(string) ){
			alert('ì´ë¯¸ ì„ íƒí•œ ì˜µì…˜ìž…ë‹ˆë‹¤.');

			// ì„ íƒì´ˆê¸°í™”
			obj.removeClass( this.removeClassName );

			$(this.goods_ori_form).find('[name="op2"]').val('');

			$(event.target||event.srcElement).val('');
			return false;
		}

		// ì˜µì…˜ ì„¤ëª… ì§€ì›€
		$(this.goods_form_info).hide();

		// ì‚¬ì´ì¦ˆ ì„ íƒí‘œì‹œë¥¼ ìœ„í•¨(ì‚¬ì´ì¦ˆê°€ ì²´í¬ë°•ìŠ¤ë¡œ ë˜ì–´ìžˆê¸° ë•Œë¬¸ì—)
		var radioObj = obj.closest('li').find('input[type="radio"]');
		radioObj.prop('checked',true);

		// ì˜µì…˜ ë³µì‚¬
		this.opt_copy(string);

		// í´ëž˜ìŠ¤ ì§€ì›€
		//obj.removeClass( this.removeClassName );
		//$(this.goods_ori_form).find('[name="op2"]').val('');
		*/
	}

	this.set_opt_cart = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var tr = obj.closest('tr');

		if( obj.attr('name') == 'change_op1' && tr.find('[name="change_op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();
			var data = this.ajax('getOp2List',string);
			tr.find('[name="change_op2"]').find('option:gt(0)').remove();
			tr.find('[name="change_op2"]').append(data.html);
		}
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ
	this.codi_set_opt = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var form = obj.closest('.opt_layer');

		if( obj.attr('name') == 'op1' && form.find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();
			var data = this.ajax('getOp2List',string);

			form.find('[name="op2"]').find('option:gt(0)').remove();
			form.find('[name="op2"]').append(data.html);
		}

		// ì˜µì…˜ ë‹¤ ì„ íƒí–ˆëŠ”ì§€
		if( this.select_check() ){
			return false;
		}
	}

	// ì˜µì…˜ì„ íƒì‹œ ìƒí’ˆhtml ë„£ì–´ì¤Œ
	this.codi_set_opt2 = function(){
		// ë‘ë²ˆì§¸ ìƒìžì— ì˜µì…˜ ë„£ì–´ì¤Œ
		var obj = $(event.target||event.srcElement);
		var goods_idx = obj.data('goods_idx');
		var form = obj.closest('.opt_layer');

		if( obj.attr('name') == 'op1' && form.find('[name="op2"]').length > 0 ){
			var string = goods_idx+'/'+obj.val();
			var data = this.ajax('getOp2List3',string);

			form.find('[name="op2"]').find('option:gt(0)').remove();
			form.find('[name="op2"]').append(data.html);
		}

		// ì˜µì…˜ ë‹¤ ì„ íƒí–ˆëŠ”ì§€
		if( this.select_check() ){
			return false;
		}
	}

	// ì½”ë”” ì˜µì…˜ í™•ì¸
	this.codi_confirm = function(){
		var obj = $(event.target||event.srcElement);

		var form = obj.closest('.goods-codi-form');

		var error = false;
		form.find('select').each(function(){
			if( $(this).val() == '' ){
				error = true;
			}
		});

		if( error ){
			alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
			return false;
		}

		form.find('input[type="checkbox"]').prop('checked',true);

		// í’ˆì ˆ ì²´í¬ ë¡œì§ codi_set_optì— ìžˆì—ˆëŠ”ë° í™•ì¸ë²„íŠ¼ ëˆŒë €ì„ ë•Œ ì‹¤í–‰ë˜ë„ë¡ ìˆ˜ì • (ì˜µì…˜ ì„ íƒì‹œ ì²´í¬ë°•ìŠ¤ ì„ íƒë„ ì•ˆë˜ì—ˆëŠ”ë° í’ˆì ˆì²´í¬í•˜ë ¤ë‹ˆê¹Œ ì˜¤ë¥˜ìƒê¹€) 2019-09-25 ì¡°ì˜ìž¬
		// ì²´í¬ë°•ìŠ¤ ì‹¤í–‰ í›„ ë‹¤ì‹œ ì²´í¬ë°•ìŠ¤ ì²´í¬í• ì§€ ì—¬ë¶€ ê²°ì •
		// ì„ íƒì˜µì…˜ ë¬¸ìžì—´
		var string = this.str_enc('codi');

		// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
		if( this.get_soldout(string) ){
			// ì²´í¬ë°•ìŠ¤ í’€ì–´ì¤Œ
			form.find('input[type="checkbox"]').prop('checked',false);
			return false;
		}else{
			form.find('input[type="checkbox"]').prop('checked',true);
		}

		//form.find('.view').hide();

		$('*[data-ui-toggle="box"] .btn-toggle').not($(this)).removeClass('active');
		$(this).closest('.btn-toggle').toggleClass('active').parent().parent().toggleClass('on');

		this.codi_get_price();
	}

	// ì½”ë”” ìž¥ë°”êµ¬ë‹ˆ ë‹´ê¸°
	this.codi_set_cart = function(quickType){
		// ì½”ë””ìƒí’ˆ null check
		if( !this.null_check('codi') ){
			return false;
		}

		var string = this.str_enc('codi');

		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		this.ajax('set_cart',string);

		if( confirm("ìž¥ë°”êµ¬ë‹ˆì— ë‹´ì•˜ìŠµë‹ˆë‹¤.\n\nìž¥ë°”êµ¬ë‹ˆë¡œ ì´ë™í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			if( quickType != 'parent' ){
				location.href = '/member/cart.php';
			}else{
				parent.location.href = '/member/cart.php';
			}
		}
	}

	// ì„ íƒì˜µì…˜ ì‚­ì œ
	this.del_opt = function(){
		$(event.target||event.srcElement).closest(this.goods_form_obj).remove();

		// ì„ íƒëœ ì˜µì…˜ì—†ìœ¼ë©´ ë‹¤ì‹œ ê¸°ë³¸ì„¤ì • info ë³´ì—¬ì¤Œ
		if( $(this.goods_form_obj).length < 2 ){
			$(this.goods_form_info).show();
		}

		this.get_price();
	}

	// ì„ íƒëœí¼ ë¬¸ìžì—´ ìƒì„±
	this.str_enc = function(type){
		var string = new Array();

		var obj = $(this.goods_form_obj).filter(":gt(0)");
		if( type == 'select' ){
			obj = $(event.target||event.srcElement).closest('form');
		}else if( type == 'codi' ){
			obj = $(this.goods_codi_form_obj).filter(':visible');
		}else if( type == 'cart' ){
			obj = $(this.goods_form_obj).filter(':visible');
		}

		obj.each(function(e){
			// ì½”ë”” ìƒí’ˆ ì²´í¬í•´ì œë˜ì–´ ìžˆìœ¼ë©´ ë„˜ê¹€
			if( $(this).find('.codiIsCheck').length > 0 && !$(this).find('.codiIsCheck').prop('checked') ){
				return true;
			}

			// ìž¥ë°”êµ¬ë‹ˆ ìƒí’ˆ ì²´í¬í•´ì œë˜ì–´ ìžˆìœ¼ë©´ ë„˜ê¹€
			if( $(this).find('.cartIdxs').length > 0 && !$(this).find('.cartIdxs').prop('checked') ){
				return true;
			}

			var tmp = new Array();
			var goods_idx = $(this).find('[name="goods_idx"]').val();
			var set_idx = $(this).find('[name="set_idx"]').val();
			var op1 = $(this).find('[name="op1"]').val();
			var op2 = $(this).find('[name="op2"]').val();
			var ea = $(this).find('[name="ea"]').val();
			var soldout = $(this).find('[name="soldout"]').val();

			if( !ea ){
				ea = 1;
			}

			if( !set_idx ){
				set_idx = 0;
			}

			if( !goods_idx ){
				return true;
			}

			// í’ˆì ˆì´ë©´ ìƒí’ˆ ë„˜ê¹€
			if( soldout == 'Y' ){
				return true;
			}

			tmp.push( goods_idx );

			if( op1 ){
				tmp.push(op1);
			}

			if( op2 ){
				tmp.push(op2);
			}

			tmp = tmp.join('_')+'/'+ea+'/'+set_idx;
			string.push(tmp);
		});

		return string;
	}

	// ì„ íƒëœí¼ ë¬¸ìžì—´ ìƒì„± (ì„¸íŠ¸ìƒí’ˆìš©)
	this.str_enc_set = function(set_key,type){
		var string = new Array();

		var obj = $(event.target||event.srcElement).closest('form');

		if(type == 'buy'){
			obj = $(this.goods_form_obj).filter(":gt(0)");
		}

		if(type == 'soldoutChk'){
			obj.each(function(e){
				var tmp = new Array();
				var goods_idx = $(this).find('[name="set_goods_idx'+set_key+'"]').val();
				var op1 = $(this).find('[name="op1_'+set_key+'"]').val();
				var op2 = $(this).find('[name="op2_'+set_key+'"]').val();
				var ea = $(this).find('[name="ea"]').val();

				if( !ea ){
					ea = 1;
				}

				if( !goods_idx ){
					return true;
				}

				tmp.push( goods_idx );
				if( op1 ){ tmp.push(op1); }
				if( op2 ){ tmp.push(op2); }

				tmp = tmp.join('_')+'/'+ea;
				string.push(tmp);
			});
		}else{
			obj.each(function(e){
				var tmp = new Array();
				var tmp2 = new Array();
				var goods_idx = $(this).find('[name="goods_idx"]').val();
				var goods_idx1 = $(this).find('[name="set_goods_idx0"]').val();
				var goods_idx2 = $(this).find('[name="set_goods_idx1"]').val();
				var op1_0 = $(this).find('[name="op1_0"]').val();
				var op2_0 = $(this).find('[name="op2_0"]').val();
				var op1_1 = $(this).find('[name="op1_1"]').val();
				var op2_1 = $(this).find('[name="op2_1"]').val();
				var ea = $(this).find('[name="ea"]').val();
				var set_group = $(this).find('[name="set_group"]').val();

				if( !ea ){ ea = 1; }
				if( !set_group ){ set_group = 1; }

				if( !goods_idx1 || !goods_idx2 ){
					return true;
				}

				tmp.push( goods_idx1 );
				if( op1_0 ){ tmp.push(op1_0); }
				if( op2_0 ){ tmp.push(op2_0); }

				tmp2.push( goods_idx2 );
				if( op1_1 ){ tmp2.push(op1_1); }
				if( op2_1 ){ tmp2.push(op2_1); }

				tmp = tmp.join('_');
				tmp2 = tmp2.join('_');
				//tmp = tmp+'/'+tmp2+'/'+ea;
				tmp = goods_idx+'/'+tmp+'/'+tmp2+'/'+ea+'/'+set_group;
				string.push(tmp);
			});
		}
		return string;
	}

	// í’ˆì ˆì²´í¬
	this.get_soldout = function(string){
		var data = this.ajax('get_soldout',string);

		if( data.soldout == 'Y' ){
			alert('í’ˆì ˆëœ ìƒí’ˆìž…ë‹ˆë‹¤.');
			$(event.target||event.srcElement).val('').removeClass('active');
			return true;
		}else{
			return false;
		}
	}

	// ì´ê°€ê²© êµ¬í•˜ê¸°
	this.get_price = function(){
		var string = this.str_enc();

		this.moreDiscount(); // í•˜ë‚˜ ë” í• ì¸ í‘œì‹œìš©

		if( string != '' ){
			var data = this.ajax('get_price',string);

			if( data.isplus_error != 'Y' ){
				$(this.total_price_obj).text( this.number_format(data.total_price) );
			}else{
				$(this.total_price_obj).text( '0' );
			}

			//$(this.total_price_obj).text( this.number_format(data.total_price) );
			$(this.total_ea_obj).text( this.number_format(data.total_ea) );

			return data;
		}else{
			$(this.total_price_obj).text( this.number_format($(this.total_price_obj).data('account')));
		}
	}

	// ì½”ë””ìƒí’ˆ ì´ì•¡
	this.codi_get_price = function(){
		var string = this.str_enc('codi');
		if( string != '' ){
			var data = this.ajax('get_price',string);
			$(this.total_codi_price_obj).text( this.number_format(data.total_price) );
			$(this.total_codi_ea_obj).text( this.number_format(data.total_ea) );

			if( data.period_sale_total > 0 ){
				$(this.total_codi_price_dis_obj).text(this.number_format(data.period_sale_total+data.total_price)).show();
			}else{
				$(this.total_codi_price_dis_obj).hide();
			}
		}else{
			$(this.total_codi_price_obj).text( '0' );
			$(this.total_codi_ea_obj).text( '0' );

			// ê¸°ê°„í• ì¸ ì´ì•¡ ê·¸ë ¤ì¤€ê²ƒ ê°€ë¦¬ê¸°
			$(this.total_codi_price_dis_obj).hide();
		}
	}

	// ìž¥ë°”êµ¬ë‹ˆ ì´ì•¡(ì²´í¬ëœê²ƒë§Œ)
	this.cart_get_price = function(){

		if($('[name="cart_idxs[]"]').length == $('[name="cart_idxs[]"]:checked').length){
			$("#allCheck").prop('checked',true);
		}else{
			$("#allCheck").prop('checked',false);
		}

		var string = this.str_enc('cart');

		this.moreDiscount(); // í•˜ë‚˜ ë” í• ì¸ í‘œì‹œìš©

		if( string != '' ){
			var data = this.ajax('get_price',string);

			$('#total_price').text(BuyProc.number_format(data.total_price+data.discount_member));
			$('#total_discount').text(BuyProc.number_format(data.total_discount+data.discount_member));
			$('#del_account').text(BuyProc.number_format(data.del_account));
			$('#use_account').text(BuyProc.number_format(data.use_account));
		}else{
			$('#total_price').text(0);
			$('#total_discount').text(0);
			$('#del_account').text(0);
			$('#use_account').text(0);
		}
	}

	// ìž¥ë°”êµ¬ë‹ˆ ì´ì•¡ ALL
	this.cart_get_price_all = function(selector){
		var obj = $(event.target||event.srcElement);
		var checked = obj.prop('checked');
		$(selector).prop('checked',checked);

		var string = this.str_enc('cart');

		this.moreDiscount(); // í•˜ë‚˜ ë” í• ì¸ í‘œì‹œìš©

		if( string != '' ){
			var data = this.ajax('get_price',string);

			$('#total_price').text(BuyProc.number_format(data.total_price+data.discount_member));
			$('#total_discount').text(BuyProc.number_format(data.total_discount+data.discount_member));
			$('#del_account').text(BuyProc.number_format(data.del_account));
			$('#use_account').text(BuyProc.number_format(data.use_account));
		}else{
			$('#total_price').text(0);
			$('#total_discount').text(0);
			$('#del_account').text(0);
			$('#use_account').text(0);
		}
	}

	// ìž¥ë°”êµ¬ë‹ˆ ìˆ˜ëŸ‰ ë³€ê²½
	this.set_ea = function(num){
		var obj = $(event.target||event.srcElement);
		var ea_obj = obj.closest(this.goods_form_obj).find('[name="ea"]');
		var ea = ea_obj.val()-0;

		// ìµœëŒ€
		var string  = $(event.target||event.srcElement).closest('.goods-form').attr('string-code');
		var data = this.ajax('goodsCntCheck',string);

		ea += num-0;

		if( ea < 1 ){
			if( confirm('í•´ë‹¹ ìƒí’ˆì„ ì·¨ì†Œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?') ){
				this.del_opt();
			}else{
				ea = 1;
			}
		}

		if( ea > data.max_ea ){
			alert('í•´ë‹¹ ì˜µì…˜ì˜ ìµœëŒ€ êµ¬ë§¤ìˆ˜ëŸ‰ì€ '+data.max_ea+'ê°œ ìž…ë‹ˆë‹¤.');
			return;
		}

		ea_obj.val(ea);

		this.get_price();
	}

	// ì½”ë”” ìˆ˜ëŸ‰ ë³€ê²½
	this.codi_set_ea = function(num){
		var obj = $(event.target||event.srcElement);
		var ea_obj = obj.closest(this.goods_codi_form_obj).find('[name="ea"]');
		var ea = ea_obj.val()-0;
		ea += num-0;

		if( ea < 1 ){
			ea = 1;
		}

		ea_obj.val(ea);

		this.codi_get_price();
	}

	// ìž¥ë°”êµ¬ë‹ˆ ë“±ë¡
	this.set_cart = function(quickType){
		if( !this.null_check() ){
			return false;
		}

		var string = this.str_enc();
		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}
		this.ajax('set_cart',string);

		if( confirm("ìž¥ë°”êµ¬ë‹ˆì— ë‹´ì•˜ìŠµë‹ˆë‹¤.\n\nìž¥ë°”êµ¬ë‹ˆë¡œ ì´ë™í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			if( quickType != 'parent'){
				location.href = '/member/cart.php';
			}else{
				parent.location.href = '/member/cart.php';
			}
		}
	}

	// ë¦¬ìŠ¤íŠ¸ì—ì„œ ìž¥ë°”êµ¬ë‹ˆ ë‹´ê¸°
	this.set_cart_list = function(){
		var obj = $(event.target||eventSrcElement);
		var form = obj.closest(this.goods_form_obj);
		var string = new Array();

		var goods_idx = form.find('[name="goods_idx"]').val();
		var op1 = form.find('[name="op1"]').val();
		var op2 = form.find('[name="op2"]').val();
		var ea = form.find('[name="ea"]').val();
		string.push(goods_idx+'_'+op1+'_'+op2+'/'+ea);


		if( form.find('[name="op1"]').length > 0 && op1 == '' ){
			alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
			form.find('[name="op1"]').focus();
			return false;
		}

		if( form.find('[name="op2"]').length > 0 && op2 == '' ){
			alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
			form.find('[name="op2"]').focus();
			return false;
		}

		this.ajax('set_cart',string);

		if( confirm("ìž¥ë°”êµ¬ë‹ˆì— ë‹´ì•˜ìŠµë‹ˆë‹¤.\n\nìž¥ë°”êµ¬ë‹ˆë¡œ ì´ë™í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			location.href = '/member/cart.php';
		}
	}

	// ìœ„ì‹œë¦¬ìŠ¤íŠ¸ ë“±ë¡/ì‚­ì œ ( ëª©ë¡ )
	this.set_wish = function(){
		var string = this.str_enc();

		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}
		this.ajax('set_wish',string);
	}

	// ë‹¨ì¼í’ˆëª© ì¢‹ì•„ìš” ë“±ë¡
	this.set_wish_single = function(goods_idx){
		var data = this.ajax('set_wish_single', goods_idx);
		eval( data.js_code );
	}

	// ë¦¬ë‰´ì–¼ ë‹¨ì¼í’ˆëª© ì¢‹ì•„ìš” ë“±ë¡ 2020-04-29
	this.new_set_wish_single = function(goods_idx){
		var data = this.ajax('new_set_wish_single', goods_idx);
		eval( data.js_code );
	}

	// ì„¸íŠ¸ìƒí’ˆ ì ìš©í•¨ìˆ˜ - ì •ì€ìˆ˜ì • 2020.06
	this.buy = function(quickType){
		// ë²ˆê°œë°°ì†¡ ë³´ëŠ”ìƒíƒœ
		sessionStorage.setItem('delFreeShow','N');

		var gType = '';
		var nullChkType = '';
		var setIdx = $('input[name=set_goods_idx0]').val();

		if(setIdx != ''){
			gType = 2;
			nullChkType = 'set';
		}

		if( !this.null_check(nullChkType) ){
			return false;
		}

		CookieProc.delCookie('buymethod');

		if(gType != 2){
			var string = this.str_enc();
		}else{
			var string = this.str_enc_set('','buy');
		}

		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		if(gType != 2){
			var thCheck = this.ajax('thCheck',string);
			if( thCheck ){
				if( !confirm(thCheck.msg) ){
					return false;
				}
			}
		}

		if(gType != 2){
			var data = this.ajax('buy',string);
		}else{
			var data = this.ajax('buy_set',string);
		}

		if( data.code ){
			eval( data.code );
			return false;
		}

		if( data.url != '' ){
			if( quickType != 'parent'){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('ì£¼ë¬¸ì— ì‹¤íŒ¨í•˜ì˜€ìŠµë‹ˆë‹¤.');
		}
	}

	this.kakao_buy = function(quickType){
		CookieProc.setCookie('buymethod','K',24);

		var string = this.str_enc();
		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		var data = GoodsProc.ajax('buy',string);

		if( data.url != '' ){
			if( quickType != 'parent'){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('ì£¼ë¬¸ì— ì‹¤íŒ¨í•˜ì˜€ìŠµë‹ˆë‹¤.');
		}
	}

	this.get_default_coupon = function(){
		var data = this.ajax('get_default_coupon');
		eval( data.js_code );
	}

	this.codi_buy = function(quickType){
		if( !this.null_check('codi') ){
			return false;
		}

		var string = this.str_enc('codi');
		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}
		var data = this.ajax('buy',string);

		if( data.url != '' ){
			if( quickType != 'parent' ){
				location.href = data.url;
			}else{
				parent.location.href = data.url;
			}
		}else{
			alert('ì£¼ë¬¸ì— ì‹¤íŒ¨í•˜ì˜€ìŠµë‹ˆë‹¤.');
		}
	}

	this.naver_buy = function(){
		if( !this.null_check() ){
			return false;
		}

		var string = this.str_enc();

		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		// ì˜µì…˜ë³„ í’ˆì ˆì²´í¬
		string.forEach(function(item){
			// í’ˆì ˆì´ë¼ë©´ ë„˜ê¹€
			var data = GoodsProc.ajax('get_soldout',item);
			if( data.soldout == 'Y' ){
				var del_idx = string.indexOf(item);
				string.splice(del_idx,1);
			}
		});

		if( string == '' ){
			alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		var data = this.ajax('naver_buy',string);

		if( data.url != '' ){
			window.open(data.url);
		}else{
			alert('ì£¼ë¬¸ì— ì‹¤íŒ¨í•˜ì˜€ìŠµë‹ˆë‹¤.');
		}
	}

	// ìˆ«ìž ì‰¼í‘œ í¬ë©§ë³€ê²½
	this.number_format = function(number, decimals, dec_point, thousands_sep){
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
				.toFixed(prec);
		};

		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}

		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}

	// ì—¬ê¸°ì„œë¶€í„° ì»¤ìŠ¤í…€ ì˜ì—­ ì‹œìž‘ {
		// ì‚¬ì´ì¦ˆ ë³€ê²½ì‹œ ë³´ì—¬ì£¼ëŠ” ìˆ˜ì¹˜
			this.sizeChange = function(){
				var obj = $(event.target||event.srcElement);
				if( obj.hasClass('active') ){
					return false;
				}
				obj.closest('.size-list').find('li').removeClass('active');
				obj.closest('li').addClass('active');

				var eq = obj.closest('li').index();
				obj.closest('.size').find('.eleNum').hide().eq(eq).fadeIn('fast');
			}

			// qna ê´€ë ¨
			this.toggleQna = function(){
				var obj = $(event.target||event.srcElement);
				obj.closest('tr').next('tr').toggle();
			}

			this.deleteQna = function(num){
				if(!confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
					return false;
				}

				var data = this.ajax('deleteQna',num);
				eval(data.code);
			}

			// ìƒí’ˆë¦¬ìŠ¤íŠ¸ ì¸ë„¤ì¼ ì¢‹ì•„ìš” ë“±ë¡/í•´ì œ (2019-04-09 ì¡°ì˜ìž¬)
			this.set_thumb_wish = function(goods_idx){
				var data = this.ajax('set_thumb_wish', goods_idx);
				eval( data.js_code );
			}

			// ì£¼ë¬¸íŽ˜ì´ì§€ ìƒí’ˆ ì‚­ì œ 2019-04-23 ì¡°ì˜ìž¬
			this.cart_del = function(cart_idx,basket_str) {
				if(!confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
					return false;
				}

				var couponindex = $('input[name="coupon_idx"]:checked').val(); // ì„ íƒëœ ì¿ í°
				var string = cart_idx+'/'+basket_str+'/'+couponindex;
				var data = this.ajax('cart_del',string);

				eval(data.code);
			}

			// ì£¼ë¬¸íŽ˜ì´ì§€ ì„¸íŠ¸ìƒí’ˆ ìƒí’ˆ ì‚­ì œ 2020.06 ì •ì€ìˆ˜ì •
			this.cart_del_set = function(set_idx,basket_str) {
				if(!confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
					return false;
				}

				var couponindex = $('input[name="coupon_idx"]:checked').val(); // ì„ íƒëœ ì¿ í°
				var string = set_idx+'/'+basket_str+'/'+couponindex;
				var data = this.ajax('cart_del_set',string);

				eval(data.code);
			}

			// ì£¼ë¬¸íŽ˜ì´ì§€ ì„ íƒìƒí’ˆ ì‚­ì œ 2019-04-23 ì¡°ì˜ìž¬
			this.choose_del = function(basketIdxs) {
				var obj = $(this.goods_form_obj);
//				var obj = $(this.goods_form_obj).filter(":gt(0)");

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

				if( !confirm('ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
					return false;
				}

				var idxs = data.join(',');
				var couponindex = $('input[name="coupon_idx"]:checked').val(); // ì„ íƒëœ ì¿ í°
				var string = idxs+'/'+basketIdxs+'/'+couponindex;
				var returnData = this.ajax('choose_del',string);

				eval( returnData.code );
			}

			// ì£¼ë¬¸íŽ˜ì´ì§€ ìƒí’ˆ ì¶”ê°€
			this.order_set_cart = function(basket_idx){
				var couponindex = $('input[name="coupon_idx"]:checked').val(); // ì„ íƒëœ ì¿ í°
				var obj = $(event.target||eventSrcElement);
				var form = obj.closest(this.goods_form_obj);
				var string = new Array();
				var tmp = new Array();

				var goods_idx = form.find('[name="goods_idx"]').val();
				var op1 = form.find('[name="op1"]').val();
				var op2 = form.find('[name="op2"]').val();
				var ea = form.find('[name="ea"]').val();

				tmp.push( goods_idx );
				if( op1 ) tmp.push(op1);
				if( op2 ) tmp.push(op2);

				tmp = tmp.join('_')+'/'+ea;
				string.push(tmp);

				if( form.find('[name="op1"]').length > 0 && op1 == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					form.find('[name="op1"]').focus();
					return false;
				}

				if( form.find('[name="op2"]').length > 0 && op2 == '' ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					form.find('[name="op2"]').focus();
					return false;
				}

				var returnIndex = this.ajax('order_set_cart',string);

				location.href = '/order/buy.php?basketindex='+basket_idx+'-'+returnIndex+'&couponindex='+couponindex;
			}

			// í€µë·° ì˜ì—­
			this.quickView = function(goods_idx){
				$('#quickViewFrame iframe').attr('src','/shop/view_quick.php?index_no='+goods_idx);
				$('#quickViewFrame').show();

				$('html,body').css('overflow','hidden');
			}

			this.quickViewClose = function(){
				$('#quickViewFrame iframe').attr('src','');
				$('#quickViewFrame').hide();
				$('html,body').css('overflow','auto');
			}

			// ì·¨ì†Œë³€ê²½, êµí™˜ë°˜í’ˆíŽ˜ì´ì§€ ì˜µì…˜ì„ íƒ
			this.getOp2 = function(){
				var obj = $(event.target||event.srcElement);
				var tr = obj.closest('tr');
				var goods_idx = tr.find('[name="goods_idx[]"]').val();

				var string = goods_idx+'/'+obj.val();
				var data = this.ajax('getOp2List2',string);

				tr.find('[name="op2[]"]').find('option:gt(0)').remove();
				tr.find('[name="op2[]"]').append(data.html);
			}

			// ìƒí’ˆìƒì„¸íŽ˜ì´ì§€ QA
			this.set_qna = function() {
				var obj = $(event.target||event.srcElement);
				var form = obj.closest('form');
				var subject = form.find('[name="subject"]:checked').val();
				var sms = form.find('[name="cp_ok"]:checked').val();
				var goods_idx = form.find('[name="goods_idx"]').val();
				var memo = form.find('[name="memo"]').val();
				var string = subject + '/' + goods_idx + '/' + memo + '/' + sms;

				var data = this.ajax('set_qna',string);

				eval(data.code);
			}

			this.cartBuy = function(quickType){
				// ë²ˆê°œë°°ì†¡ ë³´ëŠ”ìƒíƒœ
				sessionStorage.setItem('delFreeShow','N');

				CookieProc.delCookie('buymethod');

				var string = new Array();
				var obj = $('#cartSlider .slick-slide');
				obj.each(function(e){
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

				if( string == '' ){
					alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
					return false;
				}

				var data = this.ajax('buy',string);

				if( data.url != '' ){
					if( quickType != 'parent'){
						location.href = data.url;
					}else{
						parent.location.href = data.url;
					}
				}else{
					alert('ì£¼ë¬¸ì— ì‹¤íŒ¨í•˜ì˜€ìŠµë‹ˆë‹¤.');
				}
			}

			this.set_cart_layer = function(quickType){
				if( !this.null_check() ){
					return false;
				}

				//ì„¸íŠ¸ìƒí’ˆì¸ì§€ ì²´í¬
				var setIdx = $('input[name=set_goods_idx0]').val();
				var gType = '';
				if(setIdx != ''){ gType = 2; }

				if(gType != 2){
					var string = this.str_enc();
				}else{
					var string = this.str_enc_set('','buy');
				}



				if( string == '' ){
					alert('ì„ íƒëœ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
					return false;
				}

				if(gType != 2){
					var check = this.ajax('set_cart_check',string);
				}else{
					var check = this.ajax('set_cart_check_set',string);
				}

				var on = false;
				if(check == 2) { // ìžˆëŠ”ìƒí’ˆì€ ì•Œë¦¼ì°½
					var goods_idx = $('input[name=goods_idx]').val();

					// ì†Œë‚˜ íŽ˜ìŠ¤íƒ€ ëžœë¤ë°•ìŠ¤ ìƒí’ˆ ìˆ˜ëŸ‰ë³€ê²½ ë¶ˆê°€ 2020.12.04
					if(goods_idx == '67408'){
						alert('í•´ë‹¹ìƒí’ˆì€ 1ê°œì´ìƒ ë‹´ì„ ìˆ˜ ì—†ìŠµë‹ˆë‹¤.');
						return false;
					}

					if(confirm('ìž¥ë°”êµ¬ë‹ˆì— ë™ì¼í•œ ìƒí’ˆì´ ìžˆìŠµë‹ˆë‹¤.\nìž¥ë°”êµ¬ë‹ˆì— ì¶”ê°€í•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
						on = true;
					}
				} else {
					on = true;
				}

				if(on) {
					if(gType != 2){
						this.ajax('set_cart_layer',string); // ì¶”ê°€í•˜ê² ë‹¤ê³  í•˜ë©´ ê·¸ ë•Œ ìž¥ë°”êµ¬ë‹ˆì— ì¶”ê°€
					}else{
						this.ajax('set_cart_layer_set',string); // ì¶”ê°€í•˜ê² ë‹¤ê³  í•˜ë©´ ê·¸ ë•Œ ìž¥ë°”êµ¬ë‹ˆì— ì¶”ê°€
					}

					$.ajax({
						url: '/shop/cartList.php',
						async: false,
						success: function(result) {
							$('#cartPopup .cart-product-list').html(result);
							pop.open('#cartPopup');
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

			// í•˜ë‚˜ ë” í• ì¸ í‘œì‹œìš©
			this.moreDiscount = function(){
				var isplus = $(this.more_dis_obj).find('[name="isplus"]').val();
				var daccount = $(this.more_dis_obj).find('[name="isplus_daccount"]').val();
				var ea = 0;

				$(this.goods_form_obj).filter(':visible').find('[name="ea"]').each(function() {
					ea += parseInt($(this).val());
				});

				if(isplus == 'Y') {
					if(ea == 0) {
						$(this.more_dis_obj).find('.moreDiscount').html("<span>2ê°œë¥¼ êµ¬ë§¤í•˜ì‹œë©´ ì´ <span class='moreAccount'>"+this.number_format(daccount*2)+"</span>ì›ì´ í• ì¸ë©ë‹ˆë‹¤.</span>");
					} else if(ea == 1) {
						$(this.more_dis_obj).find('.moreDiscount').html("<span>í•˜ë‚˜ ë” êµ¬ë§¤í•˜ì‹œë©´ ì´ <span class='moreAccount'>"+this.number_format(daccount*2)+"</span>ì›ì´ í• ì¸ë©ë‹ˆë‹¤.</span>");
					} else {
						$(this.more_dis_obj).find('.moreDiscount').html("<span>"+ea+"ê°œë¥¼ êµ¬ë§¤í•˜ì‹œë©´ ì´ <span class='moreAccount'>"+this.number_format(daccount*ea)+"</span>ì›ì´ í• ì¸ë©ë‹ˆë‹¤.</span>");
					}
				}
			}

			this.set_reserve = function(index_no,op1,op2) {
				var string = index_no+'/'+op1+'/'+op2;
				var returnData = this.ajax('set_reserve',string);

				eval( returnData.js_code );
			}
	// }
}

// ê¸°ë³¸í´ëž˜ìŠ¤ ìƒì„±
var GoodsProc = new GoodsProc();
