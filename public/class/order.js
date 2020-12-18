function OrderProc(){
	// ì‹¤ì œ ì „ì†¡ìš© í¼
	this.form_obj = '#orderForm';

	// ì£¼ë¬¸ë²ˆí˜¸,ì£¼ë¬¸ìžëª…,ë¹„ë°€ë²ˆí˜¸
	this.ordername_obj = '#ordername_obj';
	this.orderno_obj = '#orderno_obj';
	this.passwd_obj = '#passwd_obj';

	// íŒŒì¼ ê²½ë¡œ
	this.classFileAddr = '/class/order_ajax.php'; // í•´ë‹¹íŒŒì¼ ìœ„ì¹˜

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

	// ê±°ëž˜ëª…ì„¸ì„œ ë°›ì„ ìˆ˜ ìžˆë‚˜ ì²´í¬
	this.getTradeReceipt = function(){
		var data = new Object();
		data.method = 'getTradeReceipt';
		data.string = '';
		data.orderno = $(this.orderno_obj).val();
		data.ordername = $(this.ordername_obj).val();
		data.passwd = $(this.passwd_obj).val();

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	// ê±°ëž˜ëª…ì„¸ì„œ ë³´ëŠ” í™”ë©´ìœ¼ë¡œ submit
	this.getReceiptSubmit = function(){
		window.open('','receipt_frame','width=1200,height=800');

		$(this.form_obj).attr('action','/member/receipt.php');
		$(this.form_obj).attr('target','receipt_frame');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
		$(this.form_obj).attr('target','');
	}

	// ì¶”ê°€ê²°ì œ
	this.pay = function(selector){
		// ê¸°ì¡´ ì¶”ê°€í¼ ì‹¹ë‹¤ ì‚­ì œ
		$('.payForm').remove();

		if( !selector ){
			var obj = $(event.target||event.srcElement);
		}else{
			var obj = $(selector);
		}

		var target_obj = obj.closest('#pgDiv');
		var buymethod = target_obj.find('[name="buymethod"]').val();
		var idx = target_obj.find('#pgId').val();

		if(buymethod == 'B'){
			// ë¬´í†µìž¥ì¼ë•Œ ì²´í¬
			if( $('.bank_obj').val() == '' ){
				$('.bank_obj').focus();
				alert('ì€í–‰ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
				return false;
			}

			if( $('.inname_obj').val() == '' ){
				$('.inname_obj').focus();
				alert('ìž…ê¸ˆìžëª…ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”.');
				return false;
			}

			if( $('.indate_obj').val() == '' ){
				$('.indate_obj').focus();
				alert('ìž…ê¸ˆì˜ˆì •ì¼ì„ ì„ íƒí•´ì£¼ì„¸ìš”.');
				return false;
			}

			if( !confirm('ë¬´í†µìž¥ìž…ê¸ˆìœ¼ë¡œ ì§„í–‰í•˜ì‹œê² ìŠµë‹ˆê¹Œ?') ){
				return false;
			}

			var data = new Object();
			data.method = 'updateAccountInfo';
			data.string = '';
			data.orderno = $(this.orderno_obj).val();
			data.ordername = $(this.ordername_obj).val();
			data.passwd = $(this.passwd_obj).val();
			data.bank = $('.bank_obj').val();
			data.inname = $('.inname_obj').val();
			data.indate = $('.indate_obj').val();
			data.idx = idx;
			data = JSON.stringify(data);

			var returnData = this.ajax(data);
			eval(returnData.js_code);

			return false;
		}else if(buymethod == 'G') {
			var data = new Object();
			data.method = 'galaxiaAccountInfo';
			data.string = '';
			data.orderno = $(this.orderno_obj).val();
			data.idx = idx;
			data = JSON.stringify(data);

			var returnData = this.ajax(data);

			eval(returnData.js_code);

			return false;
		}else if(buymethod == 'K'){
			$.ajax({
				url:'/pg/kakaopay/pay.php',
				type:'get',
				async:false,
				data:{'mode':'ready_part','market_idx':$(this.orderno_obj).val(),'account_idx':idx},
				success:function(code){
					eval(code);
				}
			});
			return false;
		}else if(buymethod == 'D'){
			$.ajax({
				url:'/pg/toss/pay.php',
				type:'get',
				async:false,
				data:{'mode':'part','market_idx':$(this.orderno_obj).val(),'account_idx':idx},
				success:function(code){
					eval(code);
				}
			});
			return false;
		}else if(buymethod == 'U'){
			$.ajax({
				url:'/pg/cultureland/payForm.php',
				type:'post',
				async:false,
				data:{'market_idx':$(this.orderno_obj).val(),'account_idx':idx},
				success:function(payForm){
					target_obj.append(payForm);
				}
			});

			open_culture();
			return false;
		}

		// ê²°ì œí¼ ë¶ˆëŸ¬ì™€ì„œ ë„£ì–´ì¤Œ
		$.ajax({
			url:'/pg/inipay/sample/payForm.php',
			type:'post',
			async:false,
			data:{'index_no':idx,'buymethod':buymethod},
			success:function(payForm){
				target_obj.append(payForm);
			}
		});

		var payFormId = target_obj.find('form').attr('id');
		INIStdPay.pay(payFormId);

		pop.close();
	}


	// êµ¬ë§¤í™•ì • ë¡œì§
	this.orderFix = function(ordername,orderno,passwd){
		if( !confirm("êµ¬ë§¤í™•ì •í•˜ì‹œê² ìŠµë‹ˆê¹Œ? êµ¬ë§¤í™•ì •í•˜ì‹œë©´ ë°˜í’ˆ/êµí™˜ì´ ë¶ˆê°€ëŠ¥í•©ë‹ˆë‹¤.") ){
			return false;
		}

		var data = new Object();
		data.method = 'orderFix';
		data.string = '';

		if( !orderno ){
			data.orderno = $(this.orderno_obj).val();
		}else{
			data.orderno = orderno;
		}

		if( !ordername ){
			data.ordername = $(this.ordername_obj).val();
		}else{
			data.ordername = ordername;
		}

		if( !passwd ){
			data.passwd = $(this.passwd_obj).val();
		}else{
			data.passwd = passwd;
		}

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	// ì·¨ì†Œ/ë³€ê²½ íŽ˜ì´ì§€ë¡œ ì´ë™
	this.orderItemChange = function(ordername,orderno,passwd){
		var form = $(this.form_obj);

		// ê¸°ë³¸í¼ì •ë³´
		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}

		$(this.form_obj).attr('action','/member/order_change.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}

	// êµí™˜ ë°˜í’ˆ íŽ˜ì´ì§€ë¡œ ì´ë™
	this.orderItemReturn = function(ordername,orderno,passwd){
		if( !confirm("êµí™˜,ë°˜í’ˆì‹ ì²­í•´ ì£¼ì‹œë©´ ì €í¬ ì†Œë…€ë‚˜ë¼ì—ì„œ CJëŒ€í•œíƒë°°ë¡œ\nìžë™íšŒìˆ˜ì ‘ìˆ˜ ë˜ë¯€ë¡œ ê³ ê°ë‹˜ê»˜ì„œëŠ” CJëŒ€í•œíƒë°°ë¡œ ë”°ë¡œ\níšŒìˆ˜ì ‘ìˆ˜ ì•ˆí•´ì£¼ì…”ë„ ë©ë‹ˆë‹¤.\n\në°˜í’ˆì‹œ ë°›ìœ¼ì‹  ì‚¬ì€í’ˆì€ ê¼­! ê°™ì´ ë™ë´‰í•´ì£¼ì„¸ìš”:)\nëˆ„ë½ë˜ëŠ” ê²½ìš°, ì‚¬ì€í’ˆ ê¸ˆì•¡ë§Œí¼ ì°¨ê°ë˜ì–´ í™˜ë¶ˆì²˜ë¦¬ ë©ë‹ˆë‹¤.\n\nâ˜… ìƒí’ˆ í¬ìž¥ ì‹œ ë°°ì†¡ë¹„(í˜„ê¸ˆ) ë™ë´‰í•˜ì‹¤ ê²½ìš° ë¶„ì‹¤ìœ„í—˜ ìžˆìœ¼ë©°, \në¶„ì‹¤ ì‹œ íƒë°°ì‚¬ë‚˜ ì €í¬ì¸¡ì—ì„œ ì²˜ë¦¬ ë„ì™€ë“œë¦´ ìˆ˜ ì—†ìœ¼ë‹ˆ \nê¼­ ìž…ê¸ˆìœ¼ë¡œ ë¶€íƒë“œë¦½ë‹ˆë‹¤ â˜…\n\n*ì„ ë°°ì†¡ ë°›ì•„ë³´ì‹œê³  í›„ë°°ì†¡ìƒí’ˆì´ ë‚¨ì•„ìžˆì„ê²½ìš° í›„ë°°ì†¡ìƒí’ˆ\në§ˆì € ë°›ì•„ë³´ì‹ í›„ ì‹ ì²­ ë¶€íƒë“œë¦¬ë©°, ë”°ë¡œ ë°›ìœ¼ì…¨ì–´ë„\nâ˜…ê¼­! í•œìƒìžì— ë‹´ì•„ì„œë³´ë‚´ì£¼ì…”ì•¼ íƒë°°ë¹„ ê³¼ì¤‘ë¶€ë‹´ì´ ì—†ìœ¼ì‹­ë‹ˆë‹¤.\n\nâ˜…â˜…ë¶ˆëŸ‰ êµí™˜/ë°˜í’ˆì‹œ ê¼­ ë¶ˆëŸ‰ì‚¬ìœ (ë¶ˆëŸ‰ì‹œ ë¶ˆëŸ‰ìœ„ì¹˜ ë“±)\në©”ëª¨ ë™ë´‰í•˜ì—¬ ë³´ë‚´ì£¼ì„¸ìš”.\në”ìš± ì‹ ì†í•˜ê²Œ ì²˜ë¦¬ ë°›ìœ¼ì‹¤ ìˆ˜ ìžˆìŠµë‹ˆë‹¤â˜…â˜…") ){
			return false;
		}

		var form = $(this.form_obj);

		// ê¸°ë³¸í¼ì •ë³´
		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}

		$(this.form_obj).attr('action','/member/order_return.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}


	// ë°°ì†¡ë¹„ êµ¬í•˜ê¸°ì „ ë¹ˆê°’ì²´í¬
	this.returnErrorCheck = function(stop){
		var error = false;

		var i = 0;
		$('[name="claim_type[]"]').each(function(){
			if( !$(this).val() ){
				return true;
			}

			i++;

			var reason_obj = $(this).closest('tr').find('select[name="claim_reason[]"]');
			if( reason_obj.val() == '' && $(this).closest('tr').find('select[name="claim_type[]"]').val() != 4 ){
				if( stop ){
					alert('ì‚¬ìœ ë¥¼ ì„ íƒí•´ì£¼ì„¸ìš”');
					reason_obj.focus();
				}
				error = true;
				return false;
			}

			if( $(this).val() == '2' || $(this).val() == '3' ){ // ë°˜í’ˆì´ë‚˜ ì·¨ì†ŒëŠ” ì˜µì…˜ì„ íƒ ì•ˆí•´ë„ ë¨
				return true;
			}

			var op1_obj = $(this).closest('tr').find('select[name="op1[]"]');
			var op2_obj = $(this).closest('tr').find('select[name="op2[]"]');

			if( op1_obj.length > 0 && op1_obj.val() == '' ){
				if( stop ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					op1_obj.focus();
				}
				error = true;
				return false;
			}

			if( op2_obj.length > 0 && op2_obj.val() == '' ){
				if( stop ){
					alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
					op2_obj.focus();
				}
				error = true;
				return false;
			}
		});

		if( i == 0 ){
			if( stop ){
				alert('ì²˜ë¦¬í•  ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.');
			}
			error = true;
		}

		return error;
	}

	// ë°°ì†¡ë¹„ êµ¬í•˜ëŠ” í•¨ìˆ˜
	this.getReturnDelAccount = function(){
		// ì—ëŸ¬ì²´í¬
		if( this.returnErrorCheck(true) ){
			return false;
		}

		var data = $.ajax({
						url:'/class/returnDelAccountApi.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;

		return JSON.parse(data);
	}

	// ë°°ì†¡ë¹„ ì‹¤ì‹œê°„ìœ¼ë¡œ êµ¬í•˜ëŠ” ë¡œì§
	this.getReturnDelAccountLive = function(){
		// ì—ëŸ¬ì²´í¬
		if( this.returnErrorCheck(false) ){
			$('.calcul_delAccount').text(0);
			return false;
		}

		var data = $.ajax({
						url:'/class/returnDelAccountApi.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;

		var returnData =  JSON.parse(data);

		$('.calcul_delAccount').text(this.number_format(Number(returnData.del_account)+Number(returnData.add_del_account)));
	}

	// ìˆ˜ê±°ì§€ ì •ë³´ì™€ ë™ì¼
	this.sameDelInfo = function(){
		var obj = $(event.target||event.srcElement);
		if( obj.prop('checked') ){
			$('#receive_zip').val($('#del_zip').val());
			$('#receive_addr1').val($('#del_addr1').val());
			$('#receive_addr2').val($('#del_addr2').val());
		}
	}

	// ì‹¤ì œ êµí™˜/ë°˜í’ˆ ì ‘ìˆ˜ ë¡œì§
	this.returnOK = function(){
		if( this.returnErrorCheck(true) ){
			$('.calcul_delAccount').text(0);
			return false;
		}

//		if( $('[name="payment_type"]:checked').val() == 2 ){
//			if( $.trim($('[name="payment_inname"]').val()) == '' ){
//				alert('ìž…ê¸ˆìžëª…ì„ ìž…ë ¥í•´ì£¼ì„¸ìš”');
//				$('[name="payment_inname"]').focus();
//				return false;
//			}
//		}

		var error = false;
		$('#exchange_form .required:visible').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert($(this).data('required_msg')+' ìž…ë ¥í•´ì£¼ì„¸ìš”');
				$(this).focus();
				error = true;
				return false;
			}
		});

		// ìƒí’ˆë¶ˆëŸ‰ì€ ì´ë¯¸ì§€ ì²¨ë¶€ í•„ìˆ˜
		var imgError = false;
		$('[name="claim_type[]"]').each(function(){
			if( $(this).val() ){ // êµí™˜ì´ë‚˜ ë°˜í’ˆì„ íƒí›„
				var tr = $(this).closest('tr');
				if( tr.find('[name="claim_reason[]"]').val() == 'ìƒí’ˆë¶ˆëŸ‰' || tr.find('[name="claim_reason[]"]').val() == 'ì˜¤ë°°ì†¡' ){
					imgError = true;
				}
			}
		});

		$('[name="file[]"]').each(function(){
			if($(this).val() != ''){
				console.log($(this).val());
				imgError = false;
			}
		});

		if($('input[name="admin_idx"]').val()){
			imgError = false;
		}

		if( imgError ){
			alert('ìƒí’ˆë¶ˆëŸ‰ì‹œ ì´ë¯¸ì§€ë¥¼ ì²¨ë¶€í•´ì£¼ì„¸ìš”');
			return false;
		}

		if( error ){
			return false;
		}

		if(!confirm("ì´ëŒ€ë¡œ ì£¼ë¬¸ì„œ ë³€ê²½ì„ ì ‘ìˆ˜í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			return false;
		}

        $('#exchange_form').ajaxForm({
            url:"/class/returnProcess.php",
            enctype : "multipart/form-data",
			async:false,
            success : function(jsonData){
				var data = JSON.parse(jsonData);
				eval(data.js_code);
            }
        });

        $('#exchange_form').submit() ;
	}

	// ì‹¤ì œ ì·¨ì†Œ/ë³€ê²½ ì ‘ìˆ˜ ë¡œì§
	this.changeOK = function(){
		if( this.returnErrorCheck(true) ){
			return false;
		}

		var error = false;
		$('#exchange_form .required:visible').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert($(this).data('required_msg')+' ìž…ë ¥í•´ì£¼ì„¸ìš”');
				$(this).focus();
				error = true;
				return false;
			}
		});

		if( error ){
			return false;
		}

		if(!confirm("ì´ëŒ€ë¡œ ì£¼ë¬¸ì„œ ë³€ê²½ì„ ì ‘ìˆ˜í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			return false;
		}

		var data = $.ajax({
						url:'/class/changeProcess.php',
						type:'post',
						data:$('#exchange_form').serialize(),
						async:false,
						success:function(data){
						}
					}).responseText;
		var returnData =  JSON.parse(data);
		eval(returnData.js_code);
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

	// í™˜ë¶ˆê³„ì¢Œë³€ê²½
	this.refundChange = function(){
		var obj = $(event.target||event.srcElement).find('option:selected');

		var bank = obj.data('bank');
		var banknum = obj.data('banknum');
		var name = obj.data('name');

		$('input[name="bank"]').val(bank);
		$('input[name="bank_num"]').val(banknum);
		$('input[name="bank_name"]').val(name);
	}

	// ìˆ˜ì·¨ì¸ì •ë³´ ë³€ê²½
	this.deliChange = function(){
		if( !confirm('ìˆ˜ì·¨ì¸ ì •ë³´ë¥¼ ìˆ˜ì •í•˜ì‹œê² ìŠµë‹ˆê¹Œ?') ){
			return false;
		}

		var obj = $(event.target||event.srcElement);
		var form = obj.closest('form');

		var error = false;

		form.find('.required').each(function(){
			if( $.trim($(this).val()) == '' ){
				alert( $(this).data('msg')+'ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
				$(this).focus();
				error = true;
				return false;
			}
		});

		if( error ){
			return false;
		}

		var data = new Object();
		data.method = 'deliChange';
		data.string = '';
		data.ordername = form.find('[name="ordername"]').val();
		data.orderno = form.find('[name="orderno"]').val();
		data.passwd = form.find('[name="passwd"]').val();

		data.del_name = form.find('[name="del_name"]').val();
		data.del_cp = form.find('[name="del_cp"]').val();
		data.del_zip = form.find('[name="del_zip"]').val();
		data.del_addr1 = form.find('[name="del_addr1"]').val();
		data.del_addr2 = form.find('[name="del_addr2"]').val();
		data.memo = form.find('[name="memo"]').val();
		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	// ìš°íŽ¸ë²ˆí˜¸ ì¡°íšŒ
	this.searchPost = function(tno){
		tno = tno.toString();
		var findStr = "FB";

		if( tno.length == 22 ){
			var url = "https://freshsolutions.kurly.com/app/search/index.html?invoice_no="+tno;
		}else if (tno.indexOf(findStr) != -1) {
			var url = "http://www.fastbox.co.kr/DHUB/tracking.php?fb_invoice_no="+tno+"&lang=US";
		}else if (tno.substr(0,2) == 'MR' || tno.substr(0,2) == 'mr') {
			var url = "https://system.mirglobal.co.kr/Track/Result?mode=0&ids="+tno;
		}else{
			var url = "https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvcNo="+tno;
		}
		window1 = window.open(url,'','width=1300,height=800,status=0,scrollbars=1');
	}

	// ì£¼ë¬¸ì·¨ì†Œ
	this.orderCancel = function(ordername,orderno,passwd){
		if( !confirm('ì£¼ë¬¸ì„ ì·¨ì†Œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?') ){
			return false;
		}

		var returnBasket = confirm('êµ¬ë§¤ ì·¨ì†Œ í›„ ìƒí’ˆëª©ë¡ì„ ìž¥ë°”êµ¬ë‹ˆë¡œ ë‹´ìœ¼ì‹œê² ìŠµë‹ˆê¹Œ?');
		var form = $(this.form_obj);
		var data = new Object();
		data.method = 'orderCancel';

		// ìž¥ë°”êµ¬ë‹ˆ ë¡¤ë°± ì—¬ë¶€
		data.string = returnBasket;

		// ê¸°ë³¸í¼ì •ë³´
		if( !ordername ){
			data.ordername = form.find('[name="ordername"]').val();
		}else{
			data.ordername = ordername;
		}

		if( !orderno ){
			data.orderno = form.find('[name="orderno"]').val();
		}else{
			data.orderno = orderno;
		}

		if( !passwd ){
			data.passwd = form.find('[name="passwd"]').val();
		}else{
			data.passwd = passwd;
		}

		data.admin_idx = form.find('[name="admin_idx"]').val();

		// ì˜ˆê¸ˆì£¼
		data.return_type = form.find('[name="return_type"]:checked').val();
		data.bank = form.find('[name="bank"]').val();
		data.bank_name = form.find('[name="bank_name"]').val();
		data.bank_num = form.find('[name="bank_num"]').val();

		// ê³„ì¢Œë“±ë¡ ì—¬ë¶€
		data.refund_ins = form.find('[name="refund_ins"]').val();

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	// ì£¼ë¬¸ì·¨ì†Œ í”„ë¡œì„¸ìŠ¤
	this.orderCancelProc = function(){
		var error = false;

		if( $('input[name="return_type"]:checked').val() == '2' ){
			$('#orderForm .required').each(function(){
				if( $.trim($(this).val()) == '' ){
					alert($(this).data('required_msg')+' ìž…ë ¥í•´ì£¼ì„¸ìš”');
					$(this).focus();
					error = true;
					return false;
				}
			});
		}

		if( error ){
			return false;
		}

		// ì‹¤ì œ ì·¨ì†Œ
		this.orderCancel();
	}

	// ì£¼ë¬¸ì·¨ì†Œ íŽ˜ì´ì§€( ë¬´í†µìž¥ì¼ ê²½ìš° í™˜ë¶ˆê³„ì¢Œ ë°›ì•„ì•¼í•¨
	this.orderCancelPage = function(ordername,orderno,passwd){
		var form = $(this.form_obj);

		// ê¸°ë³¸í¼ì •ë³´
		if( ordername ){
			form.find('[name="ordername"]').val(ordername);
		}

		if( orderno ){
			form.find('[name="orderno"]').val(orderno);
		}

		if( passwd ){
			form.find('[name="passwd"]').val(passwd);
		}


		$(this.form_obj).attr('action','/member/order_cancel.php');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','');
	}

	// í˜„ê¸ˆì˜ìˆ˜ì¦
	this.cashReceipt = function(){
		window.open('','cashReceipt','width=650,height=450');

		$(this.form_obj).attr('action','/pg/inipay/receipt/sample/INIreceipt_view.php').attr('target','cashReceipt');
		$(this.form_obj).submit();

		$(this.form_obj).attr('action','').attr('target','');
	}

	this.leftsPgShow = function(index_no){
		CookieProc.delCookie('buymethod');

		$('#pgDiv #pgId').val(index_no);
		pop.open('#pgDiv');
//		$('#pgDiv').show();
	}

	this.cartChange = function(){
		var obj = $(event.target||event.srcElement);
		var tr = obj.closest('tr');

		if( tr.find('[name="change_op1"]').length <= 0 ){
			alert('ì˜µì…˜ë³€ê²½ì´ ë¶ˆê°€ëŠ¥í•œ ìƒí’ˆìž…ë‹ˆë‹¤.');
			return false;
		}

		if( tr.find('[name="change_op1"]').length > 0 ){
			if( !tr.find('[name="change_op1"] option:selected').val()){
				alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
				tr.find('[name="change_op1"]').focus();
				return false;
			}
		}

		if( tr.find('[name="change_op2"]').length > 0 ){
			if( !tr.find('[name="change_op2"] option:selected').val()){
				alert('ì˜µì…˜ì„ ì„ íƒí•´ì£¼ì„¸ìš”');
				tr.find('[name="change_op2"]').focus();
				return false;
			}
		}

//		if( !confirm('í•´ë‹¹ ì˜µì…˜ìœ¼ë¡œ ë³€ê²½í•˜ì‹œê² ìŠµë‹ˆê¹Œ?' )){
//			return false;
//		}

		var idx = tr.find('[name="cart_idx"]').val();
		var op1 = tr.find('[name="op1"]').val();
		var op2 = tr.find('[name="op2"]').val();
		var change_op1 = tr.find('[name="change_op1"]').val();
		var change_op2 = tr.find('[name="change_op2"]').val();

		var data = new Object();
		data.method = 'cartChange';
		data.string = '';
		data.idx = idx;
		data.op1 = op1;
		data.op2 = op2;

		data.change_op1 = change_op1;
		data.change_op2 = change_op2;

		data = JSON.stringify(data);

		var returnData = this.ajax(data);
		eval(returnData.js_code);
	}

	// ì˜µì…˜ì—¬ë¶€
	this.changeType = function(){
		var obj = $(event.target||event.srcElement);

		if( obj.val() == 4 || obj.val() == 1 ){ // êµí™˜ì´ë‚˜ ì˜µì…˜ë³€ê²½ë§Œ
			obj.closest('tr').find('[name="op1[]"],[name="op2[]"]').show();
		}else{
			obj.closest('tr').find('[name="op1[]"],[name="op2[]"]').val('').hide();
		}

		if( obj.val() != '' ){
			obj.closest('tr').find('[name="claim_reason[]"]').show();
		}else{
			obj.closest('tr').find('[name="claim_reason[]"]').val('').hide();
		}
	}


	// íŽ¸ì˜ì  ë°”ì½”ë“œ ì¹´ì¹´ì˜¤í†¡ ë°œì†¡
	this.getBarcode = function(index_no) {
		var data = new Object();
		data.method = 'getBarcode';
		data.index_no = index_no;
		data = JSON.stringify(data);

		var returnData = this.ajax(data);

		eval(returnData.js_code);
	}

	// ë‚±ê°œ ì‹ ì²­ìœ¼ë¡œ ë³€ê²½
	this.basketExplode = function(basket_idx){
		if( !confirm('ë‚±ê°œ ì‹ ì²­ìœ¼ë¡œ ë³€ê²½í•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
			return false;
		}

		var data = $(this.form_obj).serializeArray();

		var datas = new Array();
		$.each(data,function(idx,item){
			datas.push('"'+item.name+'":'+'"'+item.value+'"');
		});

		datas.push('"basket_idx":"'+basket_idx+'"');
		datas.push('"method":"basketExplode"');

		datas = '{'+datas.join(',')+'}';

		var returnData = this.ajax(datas);
		eval(returnData.js_code);
	}
}

// ê¸°ë³¸í´ëž˜ìŠ¤ ìƒì„±
var OrderProc = new OrderProc();
