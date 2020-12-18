var reviewFileArr = []; // ë¦¬ë·° ì—…ë¡œë“œ íŒŒì¼ ë°°ì—´
$(document).ready(function(){
	var cmt = 0; // ëŒ“ê¸€ í´ë¦­
	// select ë„ˆë¹„ ë³€ê²½
	$("select#widChange").change(function(){
		var len = $(this).val().length;
		$(this).width(len*27.6);
	});
	// viewíŒì—… ìŠ¬ë¼ì´ë“œ
	$(".popslide").slick({
		arrows: true,
		dots: true,
		autoplay:true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	// viewíŒì—… show
	//$(document).on('click', '.open-modal', function(){
//	   ajax ë¡œ layer popup ì—´ê¸°ë¡œ
//		var eq = $(this).closest("li").index();
//		$('.popslide').slick('slickGoTo', eq);
//		$('.popslide').slick('refresh');
//		$("html , body").css({'overflow-y':'hidden'});
//		$(this).closest(".slide-ul").siblings("#popView").show();

//		var idx = $(this).closest(".review-photo").index();
//		$("#popView").eq(idx).show();
//		$("#popView").eq(idx).siblings("#popView").hide();
//		$("#popView").eq(idx).find(".popslide").slick('refresh');	
//	});
	function checkExtension(fileName,fileSize){ // íŒŒì¼ì²´í¬
		var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
		var maxSize = 20971520;  //20MB

		if(fileSize >= maxSize){
			alert('íŒŒì¼ ì‚¬ì´ì¦ˆ ì´ˆê³¼(ìµœëŒ€ 20MB)');
			$(".popWrite input[name='file[]']").val("");  // íŒŒì¼ ì´ˆê¸°í™”
			reviewFileArr = [];
			return false;
		}

		if(regex.test(fileName)){
			alert('ì—…ë¡œë“œ ë¶ˆê°€ëŠ¥í•œ íŒŒì¼ì´ ìžˆìŠµë‹ˆë‹¤.');
			$(".popWrite input[name='file[]']").val("");  // íŒŒì¼ ì´ˆê¸°í™”
			reviewFileArr = [];
			return false;
		}

		return true;
	}

	$(document).on('change','.popWrite input[name="file[]"]',function(e) {
		var obj = $(this).closest('.popWrite');
		var box = obj.find('.review-file-box');
		var files = e.target.files;
		var arr = Array.prototype.slice.call(files);
		var fileCnt = obj.find('.review-file-list .file-box').length + files.length;

		if(fileCnt > 4) { // íŒŒì¼ì€ ì´ 4ê°œê¹Œì§€ë§Œ
			alert('íŒŒì¼ì²¨ë¶€ëŠ” 4ê°œê¹Œì§€ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.');
			return false;
		}

		//ì—…ë¡œë“œ ê°€ëŠ¥ íŒŒì¼ì¸ì§€ ì²´í¬
		for(var i=0;i<files.length;i++){
			if(!checkExtension(files[i].name,files[i].size)){
				return false;
			}
		}

		arr.forEach(function(element) {
			obj.find('.review-file-list').append(box.html());
			readURL(element);
			reviewFileArr.push(element); // ì´ë¯¸ì§€ ë°°ì—´ ì¶”ê°€
		});
	});

	$(document).on('click','.review-file-list .file-box .close-btn',function() { // ì´ë¯¸ì§€ ì‚­ì œ
		var index = $(this).closest('li').index()-1;
		reviewFileArr.splice(index,1); // ì´ë¯¸ì§€ ë°°ì—´ ì‚­ì œ
		$(this).closest('li').remove();
	});

	// viewíŒì—… hide
	$(document).on('click', '#popView .close a', function(){
		$("html , body").css({'overflow-y':'auto'});
		$(this).closest('#popView').hide();

		$('#popView').find('.popslide li').each(function(index,item){
			if($(this).find('.video_review').length > 0){
				$(this).find('.video_review').get(0).pause();	
			}
		});		
	});
//	$("#popView .close a").click(function(){
//		$("html , body").css({'overflow-y':'auto'});
//		$(this).closest('#popView').hide();
//	});
	$(document).on('click', '#popView .bg', function(){
		$("html , body").css({'overflow-y':'auto'});
		$(this).parent("#popView").hide();
	});
//	$("#popView .bg").click(function(e){
//		$("html , body").css({'overflow-y':'auto'});
//		$(this).parent("#popView").hide();
//	});
	// ë”ë³´ê¸°
	$(document).on('click', '.cmt-list .more a', function(){
		var parent = $(this).closest("li");
		$(this).toggleClass('on');
		parent.find(".select").toggle();
		parent.find(".text").toggleClass('off');
	});
	// writeíŒì—… toggle
	$(".pop-write-open").click(function(){
		$("#popWrite").show();
	});
	// writeíŒì—… ë¦¬ë·°ë°•ìŠ¤
	$(document).on('click','.pop-write-head .notice',function() {
		$(this).toggleClass("on");
		$(".pop-write-head .point").toggle();
	});
	$(document).on('click','#popWrite .bg, .pop-write-head .close',function() {
		$("#popWrite , .pop-write-head .point").hide();
		$('#review_write_popup').hide();
		$(".pop-write-head .notice").removeClass('on');
		reviewFileArr = []; // íŒì—… ë‹«ì„ ë•Œ ë¹„ë””ì˜¤ ë°°ì—´ ì´ˆê¸°í™”
	});
	// writeíŒì—… ë³„ì ì²´í¬
	$(document).on('click','#ChkList li',function() {
		var x = 1;
		var idx = $(this).index();
		$this = $('#ChkList li');
		x += idx;
		$this.removeClass('on').eq(idx).addClass('on');
		$this.find('input[type=checkbox]').prop('checked',false);
		$this.find('img').attr('src', $this.find('img').attr('src').replace('active','off') );
		for (var i=0; i<=idx; i++)
		{
			$this.eq(i).find('input[type=checkbox]').prop('checked',true);
			$this.eq(i).find('img').attr('src', $this.eq(i).find('img').attr('src').replace('off','active') );
		}
		if ( x < 3 )
		{
			$("#avarageTit").text('ì–´ë–¤ ì ì´ ì•„ì‰¬ì› ë‚˜ìš”?');
		} else {
			$("#avarageTit").text('ì–´ë–¤ ì ì´ ì¢‹ì•˜ë‚˜ìš”?');
		}
	});
	// writeíŒì—… íŒŒì¼ì‚­ì œ
	$(document).on('click', '#AvarageScore .close', function(){
		$(this).closest("li").remove();
	});
	// í›„ê¸°ë³„ ëŒ“ê¸€ toggle
	$(document).on('click', '.cmtBtn', function(){
		var idx = $(this).closest('li');
		$(this).toggleClass('on');
		if($(this).hasClass('on') == true){
			$(this).find('img').attr("src" , "//img.sonyunara.com/review/pc/review-ico-comment-on.png");
		}else{
			$(this).find('img').attr("src" , "//img.sonyunara.com/review/pc/review-ico-comment-off.png");
		}
		idx.find(".cmt-list , .write").toggle();
	});
	$(".ct-comment .ct-top").scroll(function(){
		if ($(this).scrollTop() > 0)
		{
			$(this).addClass('on');
		} else {
			$(this).removeClass('on');
		}
	});
	// íŒì—… ìˆ˜ì •
	$('.showSlide').on('click',function() {
		$(this).siblings('#popView').show();
		$(this).siblings('#popView').find(".popslide").slick('refresh');
		$("html , body").css({'overflow-y':'hidden'});
	});
	// í‚¤ ìž…ë ¥
	$(".cminput").on("change keyup paste", function() {
		var numLength = $(this).val().length;
		if (numLength < 2) {
			$(this).css({'margin-left':'7px'});
		} else if (numLength > 1 && numLength < 3) {
			$(this).css({'margin-left':'12px'});
		} else if (numLength > 2) {
			$(this).css({'margin-left':'17px'});
		}
	});
	// ëª¸ë¬´ê²Œ ìž…ë ¥
	$(".kginput").on("change keyup paste", function() {
		var numLength = $(this).val().length;
		if (numLength < 2) {
			$(this).css({'margin-left':'0'});
		} else if (numLength > 1 && numLength < 3) {
			$(this).css({'margin-left':'2px'});
		} else if (numLength > 2) {
			$(this).css({'margin-left':'5px'});
		}
	});

	//ìŠ¬ë¼ì´ë“œ ë³€ê²½ í›„ ë¹„ë””ì˜¤ ìž¬ìƒ
	$('#popView').on('afterChange', function (event, slick, currentSlide){ 
		if($(this).find('.popslide li.slick-current').hasClass('video-slide')){
			$(this).find('.popslide li').each(function(index,item){
				if($(this).find('.video_review').length > 0){
					$(this).find('.video_review').get(0).pause();	
				}
			});
			$(this).find('.popslide li.slick-current').find('.video_review').get(0).play();
		}else{
			$(this).find('.popslide li').each(function(index,item){
				if($(this).find('.video_review').length > 0){
					$(this).find('.video_review').get(0).pause();	
				}
			});		
		}
	});
	
	// ì—¬ê¸°ì„œë¶€í„°ëŠ” ë©”ì¸í™”ë©´ì— ë„ìš°ëŠ” ë¦¬ë·°íŒì—…(ìœ„ì™€ ë™ì¼í•œ ìŠ¤í¬ë¦½íŠ¸ì§€ë§Œ idë¥¼ classë¡œ ë³€ê²½ë§Œ í•¨)
	$(document).on('click','.popWrite .bg, .pop-write-head .close',function() {
		$('#review_write_popup').hide();
		var obj = $(this).closest('.popWrite');
		$('.review_frame',parent.document).hide();
		obj.hide();
		obj.find('.pop-write-head .point').hide();
		obj.find('.pop-write-head .notice').removeClass('on');
		reviewFileArr = []; // íŒì—… ë‹«ì„ ë•Œ ë¹„ë””ì˜¤ ë°°ì—´ ì´ˆê¸°í™”
	});
	$(document).on('click','.chkList li',function() {
		var x = 1;
		var idx = $(this).index();
		var obj = $(this).closest('.popWrite');
		$this = obj.find('.chkList li');
		x += idx;
		$this.removeClass('on').eq(idx).addClass('on');
		$this.find('input[type=checkbox]').prop('checked',false);
		$this.find('img').attr('src', $this.find('img').attr('src').replace('active','off'));
		for (var i=0; i<=idx; i++)
		{
			$this.eq(i).find('input[type=checkbox]').prop('checked',true);
			$this.eq(i).find('img').attr('src', $this.eq(i).find('img').attr('src').replace('off','active'));
		}
		if ( x < 3 )
		{
			obj.find(".avarageTit").text('ì–´ë–¤ ì ì´ ì•„ì‰¬ì› ë‚˜ìš”?');
		} else {
			obj.find(".avarageTit").text('ì–´ë–¤ ì ì´ ì¢‹ì•˜ë‚˜ìš”?');
		}
	});
	$(document).on('click', '.avarageScore .close', function(){
		$(this).closest("li").remove();
	});
});

function reviewFrame(basket_idx,loc) { // ë§ˆì´íŽ˜ì´ì§€ > ë¦¬ë·°ê´€ë¦¬ > ë¯¸ìž‘ì„±ë¦¬ë·° > ìƒí’ˆ ë¦¬ë·° ìž‘ì„±í•˜ê¸°
	$('.mp-review.review_frame').attr('src','/review/review_popup_frame.php?basket_idx='+basket_idx+'&loc='+loc);
	$('.mp-review.review_frame').show();
}

function readURL(input) { // ë¦¬ë·° ì´ë¯¸ì§€ ë° ë™ì˜ìƒì´ë¯¸ì§€ ë¯¸ë¦¬ë³´ê¸°
	var li = $('.review-file-list li:last-child');
	var fileReader = new FileReader();
	var file = input;

	if(file.type.match('image')) { // ì´ë¯¸ì§€
		fileReader.onload = function(e) {
			li.find('.photo').attr('src', e.target.result); // ì´ë¯¸ì§€ ë¯¸ë¦¬ë³´ê¸°
		};
		fileReader.readAsDataURL(file);

	} else { // ë™ì˜ìƒ
		fileReader.onload = function(e) {
			var blob = new Blob([fileReader.result], {type: file.type});
			var url = URL.createObjectURL(blob);
			var video = document.createElement('video');
			var timeupdate = function() {
				if(snapImage()) {
					video.removeEventListener('timeupdate', timeupdate);
					video.pause();
				}
			};

			video.addEventListener('loadeddata', function() {
				if(snapImage()) {
					video.removeEventListener('timeupdate', timeupdate);
				}
			});

			var snapImage = function() {
				var canvas = document.createElement('canvas');
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				var image = canvas.toDataURL();
				var success = image.length > 100000;

				if(success) {
					li.find('.photo').attr('src', image); // ë™ì˜ìƒ ë¯¸ë¦¬ë³´ê¸°
					li.find('.photo').attr('data-video',true); // í¼ ë³´ë‚¼ ë•Œ ë™ì˜ìƒì¸ì§€ ì²´í¬í•˜ê¸° ìœ„í•¨
					li.find('.video').removeClass('off');
					URL.revokeObjectURL(url);
				}

				return success;
			};

			video.addEventListener('timeupdate', timeupdate);
			video.preload = 'metadata';
			video.src = url;
			// Load video in Safari / IE11
			video.muted = true;
			video.playsInline = true;
			video.play();
		};
		fileReader.readAsArrayBuffer(file);
	}
}

function writeReview(loc) { // ë¦¬ë·°ìž‘ì„± ìŠ¤í¬ë¦½íŠ¸
	var data = new FormData();
	var obj = $(event.target||event.srcElement).closest('.popWrite');
	var basket_idx = obj.find('[name="basket_idx"]').val();
	var goods_idx = obj.find('[name="goods_idx"]').val();
	var mode = obj.find('[name="mode"]').val();
	var type = obj.find('[name="type"]').val();
	var op1 = obj.find('[name="op1"]').val();
	var op2 = obj.find('[name="op2"]').val();
	var user_height = obj.find('[name="user_height"]').val();
	var user_weight = obj.find('[name="user_weight"]').val();
	var product_color = obj.find('[name="product_color"]:checked').val();
	var product_size = obj.find('[name="product_size"]:checked').val();
	var skin_type = obj.find('[name="skinType"]:checked').val();
	var whereToBuy = obj.find('[name="whereToBuy"]:checked').val();
	var content = obj.find('[name="content"]').val();
	var contentLength = content.replace(/\s/gi,"").length;

	if(contentLength < 50){
		if(!confirm("50ìž ë¯¸ë§Œ ìž‘ì„±ìœ¼ë¡œ í›„ê¸° ì ë¦½ê¸ˆ ì§€ê¸‰ì´ ë˜ì§€ ì•ŠìŠµë‹ˆë‹¤. ë“±ë¡í•˜ì‹œê² ìŠµë‹ˆê¹Œ?")){
			return false;
		}
	}

	var scoreArr = [];
	obj.find('[name="score[]"]:checked').each(function() {
		scoreArr.push($(this).val());
	});
	var score = Math.max.apply(null,scoreArr);

	for(var i=0;i<obj.find('.required').length;i++) { // í‚¤,ëª¸ë¬´ê²Œ,í›„ê¸°ê¸€ ì²´í¬
		if(!obj.find('.required').eq(i).val()) {
			alert(obj.find('.required').eq(i).data('validate'));
			obj.find('.required').eq(i).focus();
			return false;
		}
	}

	if(!obj.find('[name="score[]"]:checked').val()) {
		alert('ìƒí’ˆ ë§Œì¡±ë„ë¥¼ ì„ íƒí•´ì£¼ì„¸ìš”.');
		return false;
	}

	if(type != 'beauty'){
		if(!product_color) {
			alert('ìƒ‰ìƒì´ ì–´ë–¤ì§€ ì„ íƒí•´ì£¼ì„¸ìš”.');
			return false;
		}

		if(!product_size) {
			alert('ì‚¬ì´ì¦ˆê°€ ì–´ë–¤ì§€ ì„ íƒí•´ì£¼ì„¸ìš”.');
			return false;
		}
	}

	if(type == 'beauty'){
		if(!skin_type){
			alert('í”¼ë¶€ íƒ€ìž…ì„ ì„ íƒí•´ì£¼ì„¸ìš”.');
			return false;
		}
	}

	if(contentLength < 10) { // ê³µë°± ì œê±°ëœ ê¸¸ì´ë¡œë§Œ íŒë‹¨
		alert('10ìž ì´ìƒë¶€í„° ë¦¬ë·° ìž‘ì„±ì´ ê°€ëŠ¥í•©ë‹ˆë‹¤.');
		obj.find('[name="content"]').focus();
		return false;
	}

	if(!confirm('í•œë²ˆ ìž‘ì„±ëœ ë¦¬ë·°ëŠ” ìˆ˜ì •ì´ ë¶ˆê°€ëŠ¥í•˜ë©° ì ë¦½ê¸‰ ì§€ê¸‰ì „ê¹Œì§€ ì‚­ì œë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤. ë¦¬ë·° ì‚­ì œì‹œì—ëŠ” ì ë¦½ê¸‰ ì§€ê¸‰ ë° ë¦¬ë·° ìž¬ìž‘ì„±ì´ ë¶ˆê°€ëŠ¥í•œì  ì°¸ê³  ë¶€íƒë“œë¦½ë‹ˆë‹¤.')){
		return false;
	}

	reviewFileArr.forEach(function(e,i) {
		data.append('file'+(i+1),e);
	});

	if(!op1){ op1 = ''; }
	if(!op2){ op2 = ''; }
	if(!product_color){ product_color = ''; }
	if(!product_size){ product_size = ''; }
	if(!skin_type){ skin_type = ''; }
	if(!whereToBuy){ whereToBuy = ''; }
	if(!mode){ mode = ''; }
	if(!type){ type = ''; }

	data.append('basket_idx',basket_idx);
	data.append('goods_idx',goods_idx);
	data.append('op1',op1);
	data.append('op2',op2);
	data.append('user_height',user_height);
	data.append('user_weight',user_weight);
	data.append('score',score);
	data.append('product_color',product_color);
	data.append('product_size',product_size);
	data.append('skin_type',skin_type);
	data.append('whereToBuy',whereToBuy);
	data.append('content',content);
	data.append('mode',mode);
	data.append('type',type);
	data.append('loc',loc); // ë©”ì¸íŒì—…ì—ì„œ ìž‘ì„±í–ˆëŠ”ì§€, ë§ˆì´íŽ˜ì´ì§€ì—ì„œ ìž‘ì„±í–ˆëŠ”ì§€, ìƒì„¸íŽ˜ì´ì§€ì—ì„œ ìž‘ì„±í–ˆëŠ”ì§€ êµ¬ë¶„

	$.ajax({
		url: '/ajax_proc/review_write.php',
		type: 'post',
		enctype: 'multipart/form-data',
		contentType: false,
		processData: false,
		data: data,
		beforeSend: function() {
			parent.loadingOn();
		},
//		async: false,
		success: function(data) {
			eval(data);
		}
	});
}

function review_hidden(basket_idx,loc) { // ë¦¬ë·° íŒì—… ì´ ìƒí’ˆ ë‹¤ì‹œ ë³´ì§€ ì•Šê¸°
	$.ajax({
		url: '/ajax_proc/review_hidden.php',
		type: 'post',
		data: {
			basket_idx: basket_idx,
			loc: loc
		},
		async: false,
		success: function(data) {
			eval(data);
		}
	});
}

function review_day_none() { // ë¦¬ë·° í•˜ë£¨ë™ì•ˆ ë³´ì§€ ì•Šê¸° --> 10ì¼ê°„ ì•ˆë³´ê¸°
	console.log(123);
	setCookie("reviewPopup","1",240);
	$('.review_frame',parent.document).remove();
}

function loadingOn() { // ë¡œë”©íŒì—… ì‹¤í–‰
	$('html,body').css({"overflow":"hidden"});
	$('#loading-popup').show();
}

function loadingOff() { // ë¡œë”©íŒì—… í•´ì œ
	$('html,body').css({"overflow":"inherit"});
	$('#loading-popup').hide();
}