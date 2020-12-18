function give_coupon(coupon_code, member_index, sudo, msg_chk){
	if( !coupon_code ){
		alert('ì¿ í°ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ì£¼ì„¸ìš”');
		return;
	}

	if(!msg_chk){ msg_chk = 'N'; }

	$.ajax({
		url:'/ajax_proc/coupon.php',
		type:'POST',
		data:{'coupon_code':coupon_code,'member_index':member_index,'sudo':sudo},
		async:false,
		success:function(msg){
			var data = JSON.parse(msg);

			if(msg_chk != 'Y'){
				alert(data.msg);
			}
		}
	});
}


function resize_iframe(obj){
	var height = $(obj).contents().find('body').height();

	$(obj).css('height', height);
	$(obj).css('height', height).css('visibility','visible');
}


function MM_openBrWindow(theURL,winName,features) { //v2.0 
  window.open(theURL,winName,features); 
} 


/* íƒ­ë·° */
function tabover(name, no, type) {

	var tabs = $('.tab_'+name+'').find('a');

	tabs.each(function(idx) {
		var detail = $('.tabcnt_'+name+idx);
		//var link = $(this).find('a');
		if(no == idx) {
			detail.show();
			//link.addClass('on');
			$(this).addClass('on');
		} else {
			detail.hide();
			$(this).removeClass('on');
		}
	});

	if(type == 'Y' && no == '1'){
		$('.tabcnt_find1').hide();
		$('.link-box').hide();
		$('.login-type').hide();
	}

	if(type == 'Y' && no == '0'){
		$('.link-box').show();
		$('.login-type').show();		
	}

//	var obj = $(event.target||event.srcElement);
//	var eq = obj.closest('li').data('eq');
//	if( eq < 4 ){
//		$('.necklineBox').show();
//	}else{
//		$('.necklineBox').hide();
//		$('.necklineBox li').removeClass('on');
//		$('input[name="search_neck"]').val('');
//	}
}

function file_delete(fileName,type,index_no,file_num){
	var obj = $(event.target||event.srcElement);

	if(type=='wm'){
		obj.closest('li').find('.file_name').text('');
	}else if(type=='m'){
		$.ajax({
			url: '/ajax_proc/file_delete.php',
			type: 'post',
			data: {
				fname: fileName,
				index_no: index_no,
				file_num: file_num
			},
			async: false,
			success: function(data) {
				//console.log(data);
				obj.closest('li').find('.file_name2').text('');
			}
		});		
	}
}

$(function(){
	$('.orderDatepicker').datepicker({
		dateFormat: "yy-mm-dd",
		closeText: 'ë‹«ê¸°',
		prevText: 'ì´ì „ë‹¬',
		nextText: 'ë‹¤ìŒë‹¬',
		currentText: 'ì˜¤ëŠ˜',
		monthNames: ['1ì›”','2ì›”','3ì›”','4ì›”','5ì›”','6ì›”','7ì›”','8ì›”','9ì›”','10ì›”','11ì›”','12ì›”'],
		monthNamesShort: ['1ì›”','2ì›”','3ì›”','4ì›”','5ì›”','6ì›”','7ì›”','8ì›”','9ì›”','10ì›”','11ì›”','12ì›”'],
		dayNames: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		dayNamesShort: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		dayNamesMin: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		showMonthAfterYear: true,
		changeYear:false,
		changeMonth:false,
		//showButtonPanel:true,
		minDate:'0D',
		maxDate:'7D'
	});

	$('.datepicker').datepicker({
		dateFormat: "yy-mm-dd",
		closeText: 'ë‹«ê¸°',
		prevText: 'ì´ì „ë‹¬',
		nextText: 'ë‹¤ìŒë‹¬',
		currentText: 'ì˜¤ëŠ˜',
		monthNames: ['.01','.02','.03','.04','.05','.06','.07','.08','.09','.10','.11','.12'],
		monthNamesShort: ['.01','.02','.03','.04','.05','.06','.07','.08','.09','10','.11','.12'],
		dayNames: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		dayNamesShort: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		dayNamesMin: ['ì¼','ì›”','í™”','ìˆ˜','ëª©','ê¸ˆ','í† '],
		showMonthAfterYear: true,
		//showButtonPanel:true
	});

	var btns = document.querySelectorAll('.clipboard');
	var clipboard = new Clipboard(btns);

	clipboard.on('success', function(e) {
		alert('ë³µì‚¬ë˜ì—ˆìŠµë‹ˆë‹¤.');
	});
});