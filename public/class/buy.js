function BuyProc(){
	// ì„¤ì •ê°’
	this.country_weight = 30000; // í•´ì™¸ë°°ì†¡ ê¸°ì¤€ê°’ 3kg
	this.addGoods = true; // ì¶”ê°€êµ¬ë§¤ íŒë‹¨ì—¬ë¶€

	//ê²°ì œ
	// í•„ìˆ˜ ì„ íƒìž
	this.basket_idxs_obj = '.basket_idxs_obj'; // ë°”ìŠ¤ì¼“ ë²ˆí˜¸ ì„ íƒìž
	this.member_point_obj = '.member_point_obj'; // ì ë¦½ê¸ˆ ì„ íƒìž
	this.member_deposit_obj = '.member_deposit_obj'; // ì˜ˆì¹˜ê¸ˆ ì„ íƒìž
	this.coupon_account_obj = '.coupon_account_obj'; // ì¿ í°ê¸ˆì•¡ ì„ íƒìž
	this.coupon_obj = '.coupon_obj'; // ì¿ í° ì„ íƒìž
	this.zip_obj = '.zip_obj'; // ìš°íŽ¸ë²ˆí˜¸ ì„ íƒìž( ì‚°ê°„ë¹„ êµ¬í• ë•Œ ì”€)
	this.del_loc_obj = '.del_loc_obj'; // êµ­ë‚´ë°°ì†¡,í•´ì™¸ë°°ì†¡ êµ¬ë¶„ ì„ íƒìž
	this.area_code_obj = '.area_code_obj'; // í•´ì™¸ë°°ì†¡ì¼ í•´ë‹¹ area_codeê°’
	this.use_account_obj = '.use_account_obj'; // ì´ê²°ì œê¸ˆì•¡ ì„ íƒìž
	this.buymethod_obj = '.buymethod_obj'; // ê²°ì œë°©ë²• ì„ íƒìž
	this.form_obj = '.form_obj'; // ê²°ì œ ì„ íƒìž
	this.bank_obj = '.bank_obj'; // ì€í–‰ ì„ íƒìž
	this.inname_obj = '.inname_obj'; // ìž…ê¸ˆìžëª… ì„ íƒìž
	this.indate_obj = '.indate_obj'; // ìž…ê¸ˆì¼ ì„ íƒìž
	this.goods_form_obj = '.goods-form'; // ë¦¬ìŠ¤íŠ¸ í¼

	// ë¹„í•„ìˆ˜ ì„ íƒìž
	this.point1_discount_obj = '.point1_discount_obj'; // ì´ ì ë¦½ê¸ˆì•¡ ì„ íƒìž
	this.point2_discount_obj = '.point2_discount_obj'; // ì´ ì ë¦½ê¸ˆì•¡ ì„ íƒìž
	this.total_discount_obj = '.total_discount_obj'; // ì´í• ì¸ì•¡ ì„ íƒìž
	this.is_th_del_obj = '.is_th_del_obj'; // ë²ˆê°œì¶œê³  ì—¬ë¶€ ì„ íƒìž
	this.total_delaccount_obj = '.total_delaccount_obj'; // ì´ë°°ì†¡ë£Œ ì„ íƒìž
	this.discount_member_obj = '.discount_member_obj'; // ë“±ê¸‰í• ì¸ê¸ˆì•¡ ì„ íƒìž
	this.delaccount_obj = '.delaccount_obj'; // ë°°ì†¡ë¹„ ì„ íƒìž
	this.delaccount_th_obj = '.delaccount_th_obj'; //  ë²ˆê°œë°°ì†¡ë£Œ ì„ íƒìž
	this.delaccount_out_obj = '.delaccount_out_obj'; // ì‚°ê°„ë¹„ ì„ íƒìž
	this.coupon1_discount_obj = '.coupon2_discount_obj'; // ìƒí’ˆí• ì¸ì¿ í° ì„ íƒìž
	this.coupon2_discount_obj = '.coupon1_discount_obj'; // ë°°ì†¡ì¿ í° ì„ íƒìž
	this.isplus_discount_obj = '.isplus_discount_obj'; // í•˜ë‚˜ë”í• ì¸ ê¸ˆì•¡ ì„ íƒìž
	this.memberDelZone_obj = '.memberDelZone_obj'; // íšŒì› ì €ìž¥ ë°°ì†¡ì§€ ì„ íƒìž
	this.save_point_obj = '.save_point_obj'; // êµ¬ë§¤í•˜ë©´ ì ë¦½ë  ì ë¦½ê¸ˆ
	this.coupon_name_obj = '.coupon_name_obj'; // ì¿ í°ëª…ì¹­ ì„ íƒìž
	this.mileage_obj = '.mileage_obj'; // ìƒí’ˆë¦¬ìŠ¤íŠ¸ ë§ˆì¼ë¦¬ì§€ ì„ íƒìž

	// ê°’ë³€ê²½ìš© ìž„ì˜ ì„ íƒìž
	this.totalGoods = '.total_goods_price_obj'; // ìƒí’ˆí•©ê³„

	// íŒŒì¼ ê²½ë¡œ
	this.classFileAddr = '/class/buy_ajax.php'; // í•´ë‹¹íŒŒì¼ ìœ„ì¹˜

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

	this.calcul = function(type){
		// ìƒˆë²½ë°°ì†¡ ì²´í¬
		if( $('input[name="is_dawn"]').prop('checked') && !$('input[name="del_zip"]').val() ){
			$('input[name="is_dawn"]').prop('checked',false);
			alert('ë°°ì†¡ì§€ë¥¼ ì„ íƒí•´ì£¼ì„¸ìš”.');
			return false;
		}

		if( $('input[name="is_dawn"]').prop('checked') ){
			$('#dawnDeliBox').show();
		}else{
			$('#dawnDeliBox').hide();
		}

		// í•´ì™¸ë°°ì†¡ì¸ë° ë²ˆê°œì¶œê³  í• ë ¤ëŠ”ì§€{
			if( $(this.is_th_del_obj).filter(':checked').val() == 'Y' && $(this.del_loc_obj).filter(':checked').val() == '2' ){
				alert('í•´ì™¸ë°°ì†¡ì€ ë²ˆê°œì¶œê³ ê°€ ë¶ˆê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$(this.is_th_del_obj).eq(1).prop('checked',true);
				this.calcul();
				return false;
			}

		// }

		// ì ë¦½ê¸ˆ ìž…ë ¥ ë° ê²€ì¦ {
			var max_member_point = $.trim($(this.member_point_obj).data('max'))-0;
			var member_point = $.trim($(this.member_point_obj).val())-0;
			if( !member_point ){
				member_point = 0;
				$(this.member_point_obj).val(0);
			}

			// ìˆ«ìžê²€ì¦
			if( !$.isNumeric(member_point) ){
				alert('ìˆ«ìžë§Œ ìž…ë ¥ ê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$(this.member_point_obj).val(0).focus();
				BuyProc.calcul();
				return false;
			}

			// ìµœëŒ€ì¹˜ ë„˜ì–´ ê°”ëŠ”ì§€
			if( member_point > max_member_point ){
				alert('ì ë¦½ê¸ˆì€ ìµœëŒ€ '+this.number_format(max_member_point)+'ì›ê¹Œì§€ ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$(this.member_point_obj).val(0).focus();
				BuyProc.calcul();
				return false;
			}

			// ì•ž 0 ì‚­ì œ
			$(this.member_point_obj).val($(this.member_point_obj).val()-0);

			//ì ë¦½ê¸ˆ ì›ë‹¨ìœ„ ì ˆì‚¬
//			if(String(member_point).charAt(String(member_point).length-1) > 0)
//			{
//				re_point = String(member_point).slice(0,-1);
//				re_point = re_point+'0';
//				$(this.member_point_obj).val(re_point).focus();
//
//				// ê¸ˆì•¡ ë‹¤ì‹œê³„ì‚°
//				this.calcul();
//				return;
//			}
		// }


		// ì˜ˆì¹˜ê¸ˆ ìž…ë ¥ ë° ê²€ì¦ {
			var max_member_deposit = $.trim($(this.member_deposit_obj).data('max'))-0;
			var member_deposit = $.trim($(this.member_deposit_obj).val())-0;
			if( !member_deposit ){
				member_deposit = 0;
				$(this.member_deposit_obj).val(0);
			}

			// ìˆ«ìžê²€ì¦
			if( !$.isNumeric(member_deposit) ){
				alert('ìˆ«ìžë§Œ ìž…ë ¥ ê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$(this.member_deposit_obj).val(0).focus();
				return false;
			}

			// ìµœëŒ€ì¹˜ ë„˜ì–´ ê°”ëŠ”ì§€
			if( member_deposit > max_member_deposit ){
				alert('ì˜ˆì¹˜ê¸ˆì€ ìµœëŒ€ '+this.number_format(max_member_deposit)+'ì›ê¹Œì§€ ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$(this.member_deposit_obj).val(0).focus();
				return false;
			}

			// ì•ž 0 ì‚­ì œ
			$(this.member_deposit_obj).val($(this.member_deposit_obj).val()-0);


			//ì˜ˆì¹˜ê¸ˆ ì›ë‹¨ìœ„ ì ˆì‚¬
//			if(String(member_deposit).charAt(String(member_deposit).length-1) > 0)
//			{
//				re_deposit = String(member_deposit).slice(0,-1);
//				re_deposit = re_deposit+'0';
//				$(this.member_deposit_obj).val(re_deposit);
//
//				// ê¸ˆì•¡ ë‹¤ì‹œê³„ì‚°
//				this.calcul();
//				return;
//			}
		// }


		// í•´ì™¸ë°°ì†¡ì¼ ê²½ìš° ë¬´ê²Œ ì²´í¬
		if( $(this.del_loc_obj).filter(':checked').val() == 2 ){
			var data = new Object();
			data.method = 'getTotalWeight';
			data.string = $(this.basket_idxs_obj).val();
			data = JSON.stringify(data);

			var returnData = this.ajax(data);
			if( returnData.total_weight > this.country_weight ){
				// ë°°ì†¡íƒ€ìž… êµ­ë‚´ë¡œ ë‹¤ì‹œë³€ê²½
				$(this.del_loc_obj).filter(':first').prop('checked',true);
				$('.delTypeBox').hide().eq(0).show();

				// ê¸ˆì•¡ ë‹¤ì‹œê³„ì‚°
				this.calcul();

				// ì•Œë ¤ì¤Œ
				alert("í•´ì™¸ ë°°ì†¡ ê¸°ì¤€ë¬´ê²Œë¥¼ ì´ˆê³¼í•˜ì˜€ìŠµë‹ˆë‹¤.\n\nê³ ê°ì„¼í„°ë¡œ ë¬¸ì˜ ë¶€íƒë“œë¦½ë‹ˆë‹¤.");
				return false;
			}
		}

		// ë°ì´í„° ë„˜ê²¨ì¤Œ ë©”ì†Œë“œì™€ ê¸°íƒ€ ì •ë³´ë¥¼
		var data = new Object();
		data.method = 'getSellPrice';

		// ì¶”ê°€ì •ë³´
		var stringData = {};
		stringData['basket_idxs'] = $(this.basket_idxs_obj).val();
		stringData['coupon1'] = $(this.coupon_obj).filter(':checked').val();
		stringData['coupon2'] = '';
		stringData['point1'] = member_point;
		stringData['point2'] = member_deposit;
		stringData['thDel'] = $(this.is_th_del_obj).filter(':checked').val();
		stringData['zip'] = $(this.zip_obj).val();
		stringData['del_loc'] = $(this.del_loc_obj).filter(':checked').val();
		stringData['area_code'] = $(this.area_code_obj).val();
		stringData['dawn'] = $('input[name="is_dawn"]:checked').val();

		data.string = stringData;

		data = JSON.stringify(data);

		// viewClass.get_price()ì˜ ë¦¬í„´ë°ì´í„° ëª©ë¡ ë°›ì•„ì˜´
		var returnData = this.ajax(data);

		// ë¹„ì •ìƒì ì¸ ì ‘ê·¼ì€ ë¦¬í„´ë°ì´í„°ê°€ ì—†ìŒ
		if( !returnData ){
			location.reload();
			return false;
		}

		// ìƒˆë²½ë°°ì†¡ ì˜¤í›„ 9ì‹œ ì´í›„ ì£¼ë¬¸ê±´ì€ íŒì—…  ë…¸ì¶œ
		var dawnChk = $('input[name="is_dawn"]').data('dawnchk');
		if(dawnChk == 'no-dawn'){
			// ë²ˆê°œë°°ì†¡ ìœ íš¨ì§€ì—­ì¼ë•Œë§Œ íŒì—… ëœ¨ê²Œ
			if( $('input[name="is_dawn"]:checked').val() == 'A' && returnData.del_account_dawn != -1 ){
				$('#dawnpopup').show();
			}
		}

		// ë²ˆê°œë°°ì†¡ ìœ íš¨ì§€ì—­ ì•„ë‹ˆë©´ ë„˜ê¹€
		if( $('input[name="is_dawn"]:checked').val() == 'A' && returnData.del_account_dawn == -1 ){
			alert('ìƒˆë²½ë°°ì†¡ì´ ë¶ˆê°€ëŠ¥í•œ ì§€ì—­ìž…ë‹ˆë‹¤.');
			$('input[name="is_dawn"]').prop('checked',false);
			this.calcul();
			return false;
		}

		// ì‹¤ê²°ì œê¸ˆìœ¼ë¡œ ìœ íš¨ì„± ê²€ì¦
		if( returnData.use_account < 0 ){
			alert('ë‚¨ì€ ê²°ì œ ê¸ˆì•¡ì„ í™•ì¸í•´ì£¼ì„¸ìš”.');
			$(this.member_point_obj).val(0);
			$(this.member_deposit_obj).val(0);
			$(this.coupon_obj).filter(':first').prop('checked',true).focus(); // ì¿ í° ì´ˆê¸°í™”
			this.calcul();
			return false;
		}

		// ì¿ í°ì¼ëŠ”ë° í• ì¸ ê¸ˆì•¡ì´ ì—†ë‹¤ë©´
		if( stringData['coupon1'] > 0 && (Number(returnData.coupon1_discount)+Number(returnData.coupon2_discount)) <= 0 ){
			alert('ì„ íƒí•˜ì‹  ì¿ í°ì€ ì ìš©ì´ ë¶ˆê°€ëŠ¥í•©ë‹ˆë‹¤.');
			$(this.coupon_obj).filter(':first').prop('checked',true).focus(); // ì¿ í° ì´ˆê¸°í™”
			this.calcul(); // ê¸ˆì•¡ë‹¤ì‹œê³„ì‚°
			return false;
		}

		// ì¿ í° ì ìš© ìƒí’ˆ í…ìŠ¤íŠ¸ ë…¸ì¶œ
		$('.cp_goods').text('');
		if(returnData.total_gen_goods.length > 0){
			$.each(returnData.total_gen_goods,function(index,item){
				$('.cp_goods_'+item).text('ì¿ í°ì ìš©ìƒí’ˆ');
			});
		}

		// ì ë¦½ì•¡
		$(this.save_point_obj).text(this.number_format(returnData.save_point));

		// ìƒí’ˆêµ¬ë§¤ê¸ˆì•¡
		$(this.totalGoods).text(this.number_format(returnData.total_price+returnData.discount_member));

		// ì´ê¸ˆì•¡
		$(this.use_account_obj).text(this.number_format(returnData.use_account)).data('account',returnData.use_account); // ì „ì•¡ ì‚¬ìš©ë•Œë¬¸ì— dataì— ìž„ì‹œì €ìž¥

		// ë°°ì†¡ì¿ í° í• ì¸ë‚´ì—­
		$(this.coupon1_discount_obj).text(this.number_format(returnData.coupon1_discount));

		// ìƒí’ˆì¿ í° í• ì¸ë‚´ì—­
		$(this.coupon2_discount_obj).text(this.number_format(returnData.coupon2_discount));

		// ì ë¦½ê¸ˆ í• ì¸ë‚´ì—­
		$(this.point1_discount_obj).text(this.number_format(returnData.point1_discount));
		if( returnData.point1_discount > 0 ){
			$(this.point1_discount_obj).closest('tr').show();
		}else{
			$(this.point1_discount_obj).closest('tr').hide();
		}

		// ì˜ˆì¹˜ê¸ˆ í• ì¸ë‚´ì—­
		$(this.point2_discount_obj).text(this.number_format(returnData.point2_discount));
		if( returnData.point2_discount > 0 ){
			$(this.point2_discount_obj).closest('tr').show();
		}else{
			$(this.point2_discount_obj).closest('tr').hide();
		}

		// í•˜ë‚˜ë” í• ì¸ í• ì¸ë‚´ì—­
		$(this.isplus_discount_obj).text(this.number_format(returnData.isplus_discount));

		// ì´ ë°°ì†¡ë¹„ ì„ íƒìž
		$(this.total_delaccount_obj).text(this.number_format(returnData.del_account));

		// ê¸°ë³¸ë°°ì†¡ë¹„ ì„ íƒìž
		var del_account_ori = returnData.del_account-returnData.del_account_th-returnData.del_account_out; // ë°°ì†¡ë£Œ-ë²ˆê°œë°°ì†¡ë¹„-ì‚°ê°„ë¹„
		if( del_account_ori < 0 ){
			del_account_ori = 0;
		}
		$(this.delaccount_obj).text(this.number_format(del_account_ori));

		// ë²ˆê°œë°°ì†¡ë£Œ ì„ íƒìž
		$(this.delaccount_th_obj).text(this.number_format(returnData.del_account_th));

		// ì‚°ê°„ë¹„ ì„ íƒìž
		$(this.delaccount_out_obj).text(this.number_format(returnData.del_account_out));

		// ì´ í• ì¸ë‚´ì—­
		$(this.total_discount_obj).text(this.number_format(returnData.total_discount+returnData.discount_member));
		//$(this.total_discount_obj2).text(this.number_format(returnData.total_discount));

		// ë“±ê¸‰í• ì¸ê¸ˆì•¡
		$(this.discount_member_obj).val(this.number_format(returnData.discount_member));

		if( returnData.total_discount2 > 0 ){
			$(this.total_discount_obj).closest('tr').show();
		}else{
			$(this.total_discount_obj).closest('tr').hide();
		}


		// ì‹¤ê²°ì œê¸ˆì´ ì—†ìœ¼ë©´ ë¬´í†µìž¥ìž…ê¸ˆìœ¼ë¡œ ë³€ê²½í•´ë²„ë¦¼
		if( returnData.use_account == 0 ){
			if( $(this.buymethod_obj).val() != 'B' && CookieProc.getCookie('buymethod') != 'K'){
				this.chooseMethod('B');
			}
		}

		// ì¿ í°ëª…ì¹­
		$(this.coupon_account_obj).val(returnData.coupon_discount);

		// ì¿ í°ì“°ë©´ ìƒí’ˆë¦¬ìŠ¤íŠ¸ ì˜ˆìƒì ë¦½ê¸ˆ 0ì›
		if( (returnData.total_discount) > 0 ){
			$(this.mileage_obj).each(function(){
				$(this).data('default',$(this).text());
				$(this).text(0);
			});
		}else{
			$(this.mileage_obj).each(function(){
				$(this).text($(this).data('default'));
			});
		}

		// ë¬´ë£Œë°°ì†¡ ì¶”ê°€ ê³„ì‚°
		var addPrice = returnData.delaccount_member_std - (returnData.use_account-returnData.del_account);
		var minPrice = 10000;
		//var minPrice = returnData.delaccount_member_std*0.6;

		// ì¶”ê°€ êµ¬ë§¤ ê¸ˆì•¡ ë³€ê²½
		if(addPrice > 0) {
			$('.add_price').text(this.number_format(addPrice));
		} else {
			$('.add_price').text(0);
		}

		// ì¶”ê°€ êµ¬ë§¤ ìµœì´ˆ í•œ ë²ˆë§Œ í™•ì¸
		if(this.addGoods) {
			if( (returnData.use_account >= minPrice && returnData.del_account > 0) || sessionStorage.getItem('delFreeShow') == 'Y') {
				//$('.add_price').closest('.free').show();
				$('.free').show();
				sessionStorage.setItem('delFreeShow','Y');
			}
		}
		this.addGoods = false;
	}

	// 1000ì›ë‹¨ìœ„ ì²´í¬
	this.pointCheck = function(obj){
		var obj = $(obj);
		var num = obj.val();

		if( num < 1000 && num != 0 ){
			obj.focus();
			obj.val(0);
			alert('ì ë¦½ê¸ˆì€ 1,000ì› ì´ìƒë¶€í„° ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.');
		}

		/*
		if( num%100 > 0 ){
			obj.val( obj.val()-num%100 );
			alert('ì ë¦½ê¸ˆ ë° ì˜ˆì¹˜ê¸ˆì€ 100ì› ë‹¨ìœ„ë¡œ ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.');
			obj.focus();
		}
		*/

		this.calcul();
	}

	// 100ì›ë‹¨ìœ„ ì ë¦½ê¸ˆ ì²´í¬
	this.depositCheck = function(obj){
		var obj = $(obj);
		var num = obj.val();

		/*
		if( num%100 > 0 ){
			obj.val( obj.val()-num%100 );
			alert('ì ë¦½ê¸ˆ ë° ì˜ˆì¹˜ê¸ˆì€ 100ì› ë‹¨ìœ„ë¡œ ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.');
			obj.focus();
		}
		*/

		this.calcul();
	}

	this.onlyNum = function(){
		var obj = $(event.target||event.srcElement);
		var num = $.trim($(obj).val())-0;
		if( !$.isNumeric(num) ){
			alert('ìˆ«ìžë§Œ ìž…ë ¥í•´ì£¼ì„¸ìš”');
			obj.val('');
			$(obj).focus();
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

	this.delZoneSelect = function(){ // ì£¼ë¬¸ìž ë°°ì†¡ì§€ ì„ íƒ

		var obj = $(event.target||event.srcElement);
		var zip1 = obj.data('zip1');
		var addr1 = obj.data('addr1');
		var addr2 = obj.data('addr2');
		var del_cp = obj.data('del_cp').split('-');
		var del_phone = obj.data('del_phone').split('-');
		var del_name = obj.data('del_name');
		var del_index = obj.val();

		if( del_name ){
			$('[name="del_name"]').val(del_name);
		}

		if( del_index ){
			$('#add1-'+del_index).prop('checked',true);
		}

		//$('[name="del_name"]').val();
		$('[name="del_zip"]').val(zip1);
		$('[name="del_addr1"]').val(addr1);
		$('[name="del_addr2"]').val(addr2);

		for(i=0; i<del_cp.length; i++){
			$('[name="del_cp[]"]').eq(i).val($.trim(del_cp[i]));
		}

		for(i=0; i<del_phone.length; i++){
			$('[name="del_phone[]"]').eq(i).val($.trim(del_phone[i]));
		}

		// êµ­ë‚´ë°°ì†¡ì§€ë¡œ, ê³„ì‚°ë¡œì§ì€ í´ë¦­ì‹œ ë‹¤ì‹œ ëŒì•„ê°.
		$(this.del_loc_obj).eq(0).prop('checked',true);
		$('.delTypeBox').hide().eq(0).show();

		this.calcul();

		$(this.memberDelZone_obj).find('option:first').prop('selected',true);
	}

	this.deliOptCopy = function(){ // ì£¼ë¬¸ìž ì •ë³´ì™€ ë™ì¼
		var obj = $(event.target||event.srcElement);

		if( !obj.prop('checked') ){
			return false;
		}

		if(obj.val() == '1') { // ì£¼ë¬¸ìž ì •ë³´ì™€ ë™ì¼
			// ì£¼ë¬¸ìž ì´ë¦„
			var name = $('[name="name"]').val();
			$('[name="del_name"]').val(name);

			// ì£¼ë¬¸ìž ì „í™”ë²ˆí˜¸
			var idx = 0;
			$('[name="phone[]"]').each(function(){
				$('[name="del_phone[]"]').eq(idx).val($(this).val());
				idx++;
			});

			// ì£¼ë¬¸ìž íœ´ëŒ€ì „í™”
			var idx = 0;
			$('[name="cp[]"]').each(function(){
				$('[name="del_cp[]"]').eq(idx).val($(this).val());
				idx++;
			});
		} else if(obj.val() == '2'){
			//ì§ì ‘ìž…ë ¥
			$('[name="del_name"]').val('');

			$('[name="del_zip"]').val('');

			$('[name="del_addr1"]').val('');
			$('[name="del_addr2"]').val('');

			var idx = 0;
			$('[name="phone[]"]').each(function(){
				$('[name="del_phone[]"]').eq(idx).val('');
				idx++;
			});

			var idx = 0;
			$('[name="cp[]"]').each(function(){
				$('[name="del_cp[]"]').eq(idx).val('');
				idx++;
			});
		}else {
			// ë°°ì†¡ì§€ ì„ íƒí•œ ê°’ìœ¼ë¡œ ì…‹íŒ…
			var zip1 = obj.data('zip1');
			var addr1 = obj.data('addr1');
			var addr2 = obj.data('addr2');
			var del_cp = obj.data('del_cp').split('-');
			var del_phone = obj.data('del_phone').split('-');
			var del_name = obj.data('del_name');

			$('[name="del_name"]').val(del_name);

			$('[name="del_zip"]').val(zip1);

			$('[name="del_addr1"]').val(addr1);
			$('[name="del_addr2"]').val(addr2);

			for(i=0; i<del_cp.length; i++){
				$('[name="del_cp[]"]').eq(i).val($.trim(del_cp[i]));
			}

			for(i=0; i<del_phone.length; i++){
				$('[name="del_phone[]"]').eq(i).val($.trim(del_phone[i]));
			}
		}

		this.calcul();
	}

	this.deliChange = function(consign){ // ì£¼ì†Œì§€ ë³€ê²½ì‹œ ê¸°ë³¸ì£¼ì†Œ ë‹¤ë‚ ë¦¬ê³  í•´ì™¸ë°°ì†¡ì¼ ê²½ìš° ì¶”ê°€ê¸ˆì•¡ selectBox ë‚˜íƒ€ëƒ„
		var obj = $(event.target||event.srcElement);

		// í•´ì™¸ë°°ì†¡ì¼ê²½ìš° ì•ˆë‚´ë¬¸êµ¬ íŒì—…
		if(obj.val() == 2){
			var overseasDeliText = "í•´ì™¸ë°°ì†¡ ì‹œ ìš°ì²´êµ­ EMSë¥¼ í†µí•´ ë°œì†¡ë˜ê³  ìžˆìœ¼ë©° \në°°ì†¡ê¸°ê°„ì€ 5-10ì¼ ë‚´ì™¸ë¡œ ì†Œìš”ë©ë‹ˆë‹¤.\në‚˜ë¼ ë° ì œí’ˆ ë¬´ê²Œì— ë”°ë¼ ë°°ì†¡ë¹„ëŠ” ê°œë³„ ì•ˆë‚´ë“œë¦¬ê³  ìžˆìŠµë‹ˆë‹¤.\në°°ì†¡ë¹„ ì•ˆë‚´ í›„ 7ì¼ ì´ë‚´ë¡œ ìž…ê¸ˆ ë˜ëŠ” íšŒì‹  ì—†ì„ ê²½ìš° ìž„ì˜ ì·¨ì†Œë©ë‹ˆë‹¤.\nìœ„ ë‚´ìš© ë™ì˜í•˜ì‹ ë‹¤ë©´ ì£¼ë¬¸ ì§„í–‰ ë¶€íƒ ë“œë¦½ë‹ˆë‹¤ ^^";
			if(consign) var overseasDeliText = "íœ ë¼ì œí’ˆì€ í•´ì™¸ë°°ì†¡ì´ ë¶ˆê°€í•©ë‹ˆë‹¤."; // ìœ„íƒë°°ì†¡ ìƒí’ˆì´ ìžˆëŠ”ë° í•´ì™¸ë°°ì†¡ì„ ì£¼ë¬¸í•˜ë©´ ì•ˆë‚´ë¬¸êµ¬ ì¶”ê°€ 2020-06-24 ë°•ì†Œë¼ ê³¼ìž¥ë‹˜ ìš”ì²­
			if( !confirm(overseasDeliText) ){
				event.preventDefault();
				return false;
			}
		}

		$('.delTypeBox').hide().eq(obj.val()-1).show();
		$('.delTypeBox_cp').hide().eq(obj.val()-1).show();

		$('[name="del_addr2"]').prop('readonly',false);

		this.calcul();
	}


	this.setAllPoint = function(){ // í¬ì¸íŠ¸ ì „ì•¡ì‚¬ìš©
		var use_account = $(this.use_account_obj).data('account')-0;
		var member_point = $(this.member_point_obj).data('max')-0;

		var point = $(this.member_point_obj).val()-0;
		use_account += point;
		$(this.member_point_obj).val(0);

		if( use_account <= 0 ){
			alert('ë‚¨ì€ ê²°ì œê¸ˆì•¡ì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		if( member_point >= use_account ){
			$(this.member_point_obj).val(use_account);
		}else{
			$(this.member_point_obj).val(member_point);
		}

		this.pointCheck($(this.member_point_obj));
	}

	this.setAllAccount = function(){ // í¬ì¸íŠ¸ ì „ì•¡ì‚¬ìš©
		var use_account = $(this.use_account_obj).data('account')-0;
		var member_account = $(this.member_deposit_obj).data('max')-0;

		var point = $(this.member_deposit_obj).val()-0;
		use_account += point;
		$(this.member_deposit_obj).val(0);

		if( use_account <= 0 ){
			alert('ë‚¨ì€ ê²°ì œê¸ˆì•¡ì´ ì—†ìŠµë‹ˆë‹¤.');
			return false;
		}

		if( member_account >= use_account ){
			$(this.member_deposit_obj).val(use_account);
		}else{
			$(this.member_deposit_obj).val(member_account);
		}

		this.depositCheck($(this.member_deposit_obj));
	}

	// ì—¬ê¸°ì„œë¶€í„° ì»¤ìŠ¤í…€ í•¨ìˆ˜ ì´ ì•ˆì—ë§Œ ì½”ë”©í•˜ê³  ë‚˜ë¨¸ì§€ ìœ—ë¶€ë¶„ì€ ì •ë§ ì‹ ì¤‘í•˜ê²Œ ê±´ë“œë¦´ê²ƒ{
		this.chooseMethod = function(method,restrict){ // ê²°ì œë°©ë²• ì„ íƒ
			var cookieMethod = CookieProc.getCookie('buymethod');
			if( cookieMethod && method != cookieMethod ){
				alert("ì¹´ì¹´ì˜¤ë¡œë§Œ ê²°ì œê°€ ê°€ëŠ¥í•©ë‹ˆë‹¤.\në‹¤ë¥¸ ë°©ë²•ì„ ì›í•˜ì‹¤ ê²½ìš° ìƒì„¸íŽ˜ì´ì§€ì—ì„œ êµ¬ë§¤ë²„íŠ¼ì„ ëˆŒëŸ¬ì£¼ì„¸ìš”.");
				return false;
			}

			var obj = $('[onclick="BuyProc.chooseMethod(\''+method+'\')"]');

			$('[onclick^="BuyProc.chooseMethod"]').closest('li').removeClass('on');
			obj.closest('li').addClass('on');

			$('input[name="buymethod"]').val(method);
			$('.choice strong').text("'"+obj.text()+"'");

			if( method == 'B' ){
				$('.methodB').show();
			}else{
				$('.methodB').hide();
			}

			if( method == 'N' ){
				$('.subpage .cart .buymethod-choice .smilepay-text').show();
			}else{
				$('.subpage .cart .buymethod-choice .smilepay-text').hide();
			}

			if( method == 'G' ){
				$('.GtypeCheckbox').show();
			}else{
				$('.GtypeCheckbox').hide();
			}
		}

		this.buy = function(){
			// ë²ˆê°œë°°ì†¡ ë³´ëŠ”ìƒíƒœ
			sessionStorage.setItem('delFreeShow','N');

			// ìœ íš¨ì„± ê²€ì¦

			// ìƒˆë²½ë°°ì†¡ì´ ì²´í¬ë˜ì—ˆë‹¤ë©´
			if( $('#is_dawn').prop('checked') ){
				var obj = $('input[name="dawnMemo"]:checked');
				if( obj.length < 1 ){
					alert('ìˆ˜ë ¹ë°©ë²•ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					return false;
				}

				var passObj = obj.closest('div').find('.dawnMemoPasswd');

				if( passObj.length > 0 && passObj.val() == '' ){
					alert('ë¹„ë°€ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					passObj.focus();
					return false;
				}
			}

			//ë¹„íšŒì› ì£¼ë¬¸ì‹œ ê°œì¸ì •ë³´ ì²˜ë¦¬ë°©ì¹¨ ë™ì˜ ì²´í¬
			if(!$("#agree2-1").is(":checked") && $("#agree2-1").length){
				alert('ë¹„íšŒì› êµ¬ë§¤ ë° ê²°ì œ ê°œì¸ì •ë³´ ì²˜ë¦¬ë°©ì¹¨ì— ë™ì˜ í›„ êµ¬ë§¤ê°€ëŠ¥í•©ë‹ˆë‹¤.');
				$('#agree2-1').focus();
				return false;
			}

			var use_account = $(this.use_account_obj).data('account')-0;
			if( $(this.buymethod_obj).val() == 'B' && use_account > 0  ){
				if( $(this.bank_obj).find('option:selected').val() == '' ){
					alert('ìž…ê¸ˆì€í–‰ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					$(this.bank_obj).focus();
					return false;
				}

				if( $.trim($(this.inname_obj).val()) == ''){
					alert('ìž…ê¸ˆìžëª…ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$(this.inname_obj).focus();
					return false;
				}
			}

			// ê¸°ë³¸ í•„ìˆ˜ê°’ ê²€ì¦
			var error = false;
			$('.require:visible').each(function(){
				if( !$(this).val()){
					alert($(this).data('require_msg')+' ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$(this).focus();
					error = true;
					return false;
				}
			});

			if( error ){
				return false;
			}


			// ì£¼ì†Œ ê²€ì¦
			if( $(this.del_loc_obj).filter(':checked').val() == '1' ){ // êµ­ë‚´ë°°ì†¡
				if( !$('#del_zip').val() ){
					alert('ìš°íŽ¸ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$('#del_zip').focus();
					return false;
				}

				if( !$('#del_addr1').val() ){
					alert('ì£¼ì†Œë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$('#del_addr1').focus();
					return false;
				}

				if( !$('#del_addr2').val() ){
					alert('ì£¼ì†Œë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$('#del_addr2').focus();
					return false;
				}
			}else{ // í•´ì™¸ë°°ì†¡
				if( !$(this.area_code_obj).val() ){
					$(this.area_code_obj).focus();
					alert('í•´ì™¸ë°°ì†¡ êµ­ê°€ë¥¼ ì„ íƒí•´ì£¼ì„¸ìš”');
					return false;
				}

//				if( !$('#ozip1').val() ){
//					alert('ìš°íŽ¸ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
//					$('#ozip1').focus();
//					return false;
//				}

				if( !$('#oaddr1').val() ){
					alert('ì£¼ì†Œë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$('#oaddr1').focus();
					return false;
				}

				if( !$('#oaddr2').val() ){
					alert('ì£¼ì†Œë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$('#oaddr2').focus();
					return false;
				}
			}

			// í•œë²ˆë” í™•ì¸
			if( !confirm("ì£¼ë¬¸ì •ë³´ê°€ ë§žìœ¼ë©°,\nì£¼ë¬¸í•˜ì‹œê² ìŠµë‹ˆê¹Œ?") ){
				return false;
			}

			// ê²€ì¦ì´ ëë‚¬ìœ¼ë‹ˆ ë„˜ê¹€
			$(this.form_obj).submit();
		}

		this.setShowRoom = function(){ // ì£¼ì†Œì§€ ì‡¼ë£¸
			$('.delTypeBox').hide().eq(0).show();

			$('[name="del_zip"]').val('04072');
			$('[name="del_addr1"]').val('ì„œìš¸ ì„±ë™êµ¬ ì²­ê³„ì²œë¡œ 474 (í•˜ì™•ì‹­ë¦¬ë™, ëª¨ë…¸í¼ìŠ¤ ì£¼ìƒë³µí•©)');
			$('[name="del_addr2"]').val('1ì¸µ ì•„ëœ¨ëž‘ìŠ¤ ì‡¼ë£¸').prop('readonly',true);

			this.calcul();
		}

		this.testSetting = function(){ // í…ŒìŠ¤íŠ¸ì„¸íŒ…
			$('input[name="name"]').val('ì•„ëœ¨ìž¬ì˜');
			$('input[name="passwds"]').val('1234');
			$('input[name="phone[]"]').val('123');
			$('input[name="cp[]"]').eq(0).val('8501');
			$('input[name="cp[]"]').eq(1).val('3073');
			$('input[name="email"]').val('tfed1214@naver.com');

			$('#name_same').trigger('click');

			$('input[name="del_zip"]').val('04702');
			$('input[name="del_addr1"]').val('ì„œìš¸ ì„±ë™êµ¬ ì²­ê³„ì²œë¡œ 474 (í•˜ì™•ì‹­ë¦¬ë™, ì™•ì‹­ë¦¬ ëª¨ë…¸í¼ìŠ¤ ì£¼ìƒë³µí•©)');
			$('input[name="del_addr2"]').val('2ì¸µ ì†Œë…€ë‚˜ë¼(201í˜¸)');
		}

		this.testSetting2 = function(){ // í…ŒìŠ¤íŠ¸ì„¸íŒ…
			$('input[name="name"]').val('ì•„ëœ¨ëž‘ìŠ¤');
			$('input[name="passwds"]').val('1234');
			$('input[name="phone[]"]').val('123');
			$('input[name="cp[]"]').eq(0).val('3737');
			$('input[name="cp[]"]').eq(1).val('4385');
			$('input[name="email"]').val('attrangs@naver.com');

			$('#name_same').trigger('click');

			$('input[name="del_zip"]').val('04702');
			$('input[name="del_addr1"]').val('ì„œìš¸ ì„±ë™êµ¬ ì²­ê³„ì²œë¡œ 474 (í•˜ì™•ì‹­ë¦¬ë™, ì™•ì‹­ë¦¬ ëª¨ë…¸í¼ìŠ¤ ì£¼ìƒë³µí•©)');
			$('input[name="del_addr2"]').val('2ì¸µ ì†Œë…€ë‚˜ë¼(202í˜¸)');
		}

		// ìˆ˜ëŸ‰ ë³€ê²½
		this.change_ea = function(num){
			var obj = $(event.target||event.srcElement);
			var tr = obj.closest(this.goods_form_obj);
			var cartIdx = tr.find('input[name="cart_idx"]').val();
			var goods_idx = tr.find('input[name="goods_idx"]').val();
			var set = tr.find('input[name="set"]').val();
			var ea = tr.find('input[name="ea"]').val();
			var is_plus = tr.find('input[name="is_plus"]').val();
			var newEA = Number(ea)+Number(num);

//			if(is_plus == 'Y'){
//				alert('í•˜ë‚˜ë”í• ì¸ ìƒí’ˆì€ ìˆ˜ëŸ‰ë³€ê²½ì´ ë¶ˆê°€ëŠ¥í•©ë‹ˆë‹¤.');
//				return false;
//			}

			if( newEA <= 0 ){
				//MemberProc.cart_del(cartIdx); // ìž¥ë°”êµ¬ë‹ˆ ì‚­ì œ í•¨ìˆ˜
				return false;
			}

			// ì†Œë‚˜ íŽ˜ìŠ¤íƒ€ ëžœë¤ë°•ìŠ¤ ìƒí’ˆ ìˆ˜ëŸ‰ë³€ê²½ ë¶ˆê°€ 2020.12.04
			if(goods_idx == '67408'){
				alert('í•´ë‹¹ìƒí’ˆì€ ìˆ˜ëŸ‰ì„ ë³€ê²½í•˜ì‹¤ ìˆ˜ ì—†ìŠµë‹ˆë‹¤.');
				return false;
			}

			var data = {};
			data.method = 'buyChangeEA';

			var stringData = {};
			stringData.index_no = cartIdx;
			stringData.set = set;
			stringData.ea = newEA;
			data.string = stringData;
			data = JSON.stringify(data);

			this.ajax(data); // ìˆ˜ëŸ‰ë³€ê²½ ë¡œì§

			location.reload();
			tr.find('input[name="ea"]').val(newEA); // í™”ë©´ì— ê·¸ë ¤ì¤Œ

			this.calcul('ea');
		}
	// ì»¤ìŠ¤í„° í•¨ìˆ˜ ë.
}

// ê¸°ë³¸í´ëž˜ìŠ¤ ìƒì„±
var BuyProc = new BuyProc();
