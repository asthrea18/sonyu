(function($){
	$.fn.jwSelect = function(opt){

		return this.each(function() {

			opt = $.extend({
				defaultSelect : true
			}, opt);

			var $this = $(this),
				  keyIdx = 0,
				  oldIdx = 0,
				  length = $this.find('option').length;

			var selectList = {
				init : function(){
					$this.append("<div class='cs_list'><a href='javascript:'></a><ul class='list'></ul></div>");
					selectList.render();
				},
				render : function(){
					var $select = $this.children("select"),
						  $list  = $this.find(".cs_list .list");
					if(opt.defaultSelect){ // ê¸°ë³¸ ì„ íƒì„¤ì • true : ì²«ë²ˆì§¸ ì˜µì…˜, false : ì…€ë ‰íŠ¸ì˜ íƒ€ì´í‹€ë¬¸êµ¬
						var $defaultTxt = $select.children("option:selected").text();
					}else{
						var $defaultTxt = $select.attr('title');
					}
					$this.find('.cs_list > a').text($defaultTxt);
					$select.children("option").each(function() {
						$list.append("<li><a href='javascript:'>" + $(this).text() + "</a></li>");
					});
					selectList.controls($select, $list);
				},
				controls : function($select, $list){
					function listOpen(){ // ë¦¬ìŠ¤íŠ¸ ì—´ê¸°
						keyIdx = 0; // í‚¤ìˆœì„œê°’ì„ ì´ˆê¸°í™”
						$this.addClass('on');
						$list.show();
						$list.find('li').eq(oldIdx).find('a').focus()
					}
					function listClose(){ // ë¦¬ìŠ¤íŠ¸ ë‹«ê¸°
						$list.hide();
						$this.removeClass('on');
					}
					function selectChange(idx){ // ì…€ë ‰íŠ¸ ë³€ê²½í•˜ê¸°
						var txt = $list.find('li').eq(idx).find('a').text();
						$this.find('.cs_list > a').text(txt).focus();
						$select.find('option').eq(idx).prop('selected', true).trigger('change');
						console.log('value :' + $select.find('option:selected').val());
						oldIdx = idx;
					}
					$list.find('a').on('click', function(e){ //ì…€ë ‰íŠ¸ ë¦¬ìŠ¤íŠ¸ í´ë¦­
						var idx = $(this).parent().index();
						keyIdx = idx + 1;
						selectChange(idx);
						listClose();
						e.preventDefault();
					});

					$this.find('.cs_list > a').on("click", function(e) {
						if($this.hasClass('on')){
							listClose();
						}else{
							listOpen();
						}
						e.preventDefault();
					});

					$this.find('.cs_list > a').on("focus", function() { //ì…€ë ‰íŠ¸ ì œëª©ì„ í¬ì»¤ìŠ¤ í–ˆì„ ê²½ìš° ì—´ë ¤ì§„ ë‹¤ë¥¸ ì…€ë ‰íŠ¸ ë‹«ê¸°
						$('.cs_select').not($this).removeClass('on').find('ul').hide();

					});

					$this.find('.cs_list > a').on("focus change keydown", function(e) {
						if (e.shiftKey && e.keyCode == 9 && $this.hasClass('on')){ //íŽ¼ì³ì ¸ ìžˆì„ë•Œ shift + tabí‚¤
							listClose();
						}
					});

					$list.on("focusin", 'a', function() { //ë¦¬ìŠ¤íŠ¸ì— í¬ì»¤ìŠ¤ì¸ ëì„ ê²½ìš° í‚¤ìˆœì„œê°’ ë„˜ê¸°ê¸°
						var idx = $(this).parent().index() + 1;
						keyIdx = idx;
					})

					$this.on("focus change keydown", function(e) { // í‚¤ë³´ë“œë¥¼ ì´ìš©í•œ í¬ì»¤ìŠ¤ ì´ë™
						if (e.keyCode == 32 && !$this.hasClass('on')){ // ìŠ¤íŽ˜ì´ìŠ¤í‚¤  ì™€ thisì— í´ëž˜ìŠ¤ onì´ ì—†ëŠ” ê²½ìš°
							listOpen();
						}
						if($this.hasClass('on')){ //ì…€ë ‰íŠ¸ë¥¼ í´ë¦­í•˜ì—¬  ë¦¬ìŠ¤íŠ¸ë¥¼ íŽ¼ì³¤ì„ ê²½ìš°
							if (e.keyCode == 40 && keyIdx < length){ //ë°©í–¥í‚¤ ì•„ëž˜
								keyIdx++;
								$list.find('li').eq(keyIdx-1).find('a').focus()
							}else if(e.keyCode == 38 && keyIdx > 1){ // ë°©í–¥í‚¤ ìœ„
								keyIdx--;
								$list.find('li').eq(keyIdx-1).find('a').focus()
							}

							if(e.keyCode == 9 && keyIdx == length){ //íŽ¼ì³ì ¸ ìžˆì„ë•Œ ë§ˆì§€ë§‰ ë¦¬ìŠ¤íŠ¸ì—ì„œ íƒ­í‚¤
								listClose();
							}

						}else{  //ì…€ë ‰íŠ¸ë¥¼ í´ë¦­í•˜ì§€ ì•Šê³  ë°©í–¥í‚¤ë¥¼ ì´ìš©í•œ ê²½ìš°
							if (e.keyCode == 40 && keyIdx < length){ //ë°©í–¥í‚¤ ì•„ëž˜
								$list.show();
								keyIdx++;
								selectChange(keyIdx-1);
							}else if(e.keyCode == 38 && keyIdx > 1){ // ë°©í–¥í‚¤ ìœ„
								keyIdx--;
								selectChange(keyIdx-1);
							}
							if(e.keyCode == 9){ //íƒ­í‚¤ë¥¼ ëˆŒë €ì„ ê²½ìš° ë¦¬ìŠ¤íŠ¸ ë‹«ê¸°
								listClose();
							}
						}
					});

					$('body').on('click', function(e){// ì…€ë ‰íŠ¸ë°•ìŠ¤ ì˜ì—­ì™¸ë¥¼ í´ë¦­í•˜ë©´ ë‹«ê¸°
						if(this == e.target){
							listClose();
						}
					});

				}
			}
			selectList.init();
		})
	}
})(jQuery);



var brandSliders = new Array();
var brandConfig;
var basicConfig = {
	auto: false,
	autoControls:false,
	autoHover:false,
	pager:true,
	speed:1200,
	slideMargin: 0
};
var detailSlider;

//ì¿ í‚¤ ì œì–´
var Cookie = {
	set : function(cname, cvalue, exdays){
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + '; Path=/;';
	},
	get : function(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++){
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
}

// ê¸°ë³¸ íŒì—…
var pop = {
	box : '#popBox',
	today : null,
	cookieName : null,
	open : function(item, today){
		$('.slickLoad').slick('resize');

		$('html').addClass('hidden');
		if(today != undefined){
			this.today = today;
			this.cookieName = this.today.replace('#','');
		}
		if(Cookie.get(this.cookieName) != 'N'){
			$(this.box).show();
			$(item).show().siblings().hide();
		}

		//ìƒí’ˆ ìƒì„¸ íŒì—…ì¸ ê²½ìš° ìŠ¬ë¼ì´ë” ë¦¬ë¡œë“œ
		if(item == '#popNewDetail'){
			detailSlider.reloadSlider(basicConfig);
		}
	},
	close : function(item){
		if(this.today != null && $(this.today).is(":checked")){
			Cookie.set(this.cookieName, "N", 1);
		}
		if(item != undefined){
			$(item).show().siblings().hide();
			return;
		}
		$(this.box).hide().find('.pop').hide();
		$('html').removeClass('hidden');
	}
}

// ìƒë‹¨ ë°°ë„ˆ
var topBanner = {
	box : '#topBanner',
	cookieName : 'notTodayTop',
	open : function(){
		if(Cookie.get(this.cookieName) != 'N'){
			var h = $(this.box).find('.inner').innerHeight();
			$(this.box).show().css({'height':h}, 400);
		}
	},
	close : function(){
		if($('#notTodayTop').is(":checked")){
			Cookie.set(this.cookieName, "N", 1);
		}
		$(this.box).animate({'height':'0'}, 400, function(){
			$(this).hide();
		});
	}
}

// ì „ì²´ ë©”ë‰´
var allMenu = {
	open : function(){
		$('#allMenu').show();
		$('html').addClass('hidden');
	},
	close : function(){
		$('#allMenu').hide();
		$('html').removeClass('hidden');
	}
}

//íƒ­ë©”ë‰´
var tabmenu = function(tab, content, slide){
	$(tab).on('click', '.tab', function(e){
		var $this = $(this);
		var tab = $this.attr('href');
		$this.parent().addClass('on').siblings('li').removeClass('on');
		$(tab).addClass('on').siblings('div').removeClass('on');

		if(slide){
			$.each(brandSliders, function(i, slider) {
				slider.reloadSlider(brandConfig);
			});
		}

		e.preventDefault();
	});
}

//ìŠ¤ë§ˆíŠ¸ì„œì¹˜
var smartSearch = {
	pop : null,
	open : function(){
		$('html').addClass('hidden');
		this.pop = $('#sideArea');
		this.pop.show();
		this.pop.children('.inner').stop().delay(100).animate({'right':'0'}, 400);
		this.pop.children('.btn-area').stop().fadeIn(400);

	},
	close : function(){
		$('html').removeClass('hidden');
		this.pop.children('.inner').stop().animate({'right':'-700'}, 300);
		this.pop.children('.btn-area').stop().fadeOut(300, function(){
			smartSearch.pop.hide();
		});
	}
}



function payFloat(){
	var $pay,payScrTop,payScrLeft,payTop,scrHeight,footHeight;
	$(window).on('scroll', function(e){
		$pay = $('#paybox');
		payScrTop = $(document).scrollTop();
		payScrLeft = $(document).scrollLeft();
		payTop = $pay.parents('.cart-con').offset().top;
		scrHeight = document.body.scrollHeight;
		footHeight = $('#footer').innerHeight()+$pay.innerHeight()+130;
		if(payScrTop >= payTop){
			if(payScrTop >= (scrHeight-footHeight)){
				$pay.css({'position':'absolute','top':'auto', 'bottom':'0', 'margin-left':'0'});
			}else{
				$pay.css({'position':'fixed', 'bottom':'initial', 'top':'0'});
				if($(window).width() < 1600){
					$pay.css({'margin-left':-payScrLeft});
				}
			}
		}else{
			$pay.css({'position':'relative', 'margin-left':'0'});

		}
	});
}




$(function(){
	// ì˜µì…˜ í† ê¸€ì—´ê¸°
	$(document).on('click', '*[data-ui-toggle="box"] .btn-toggle', function(){
		$('*[data-ui-toggle="box"] .btn-toggle').not($(this)).removeClass('active');
		$(this).toggleClass('active').parent().parent().toggleClass('on');
	});

	$(document).on('click', '*[data-ui-toggle="box"] .btn-toggle-close', function(){
		$(this).parent().prev('.btn-toggle').removeClass('active');
		$(this).parent().parent().removeClass('on');
	});


	//ì‚¬ì´ë“œí€µ ì´ë™
	//var moveScr = 0;
	var moveSpeed = 0;
	$('#rightQuick').on('click', '.nav-bottom, .nav-top', function(e){
		var screenHeight = $(window).height();
		var scrTop = $(document).scrollTop();
		var scrollHeight = document.body.scrollHeight - screenHeight;
		if($(this).hasClass('nav-top')){
			moveSpeed = Math.floor(scrTop/2);
		}else{
			moveSpeed = Math.floor((scrollHeight - scrTop)/2);
		}
		//moveSpeed = moveSpeed > 3000 ? 3000 : moveSpeed;
		moveSpeed = 200;
		console.log(moveSpeed);
		/*
		if($(this).hasClass('nav-top')){
			moveScr = scrTop-screenHeight;
		}else{
			moveScr = scrTop+screenHeight;
		}
		*/

		var moveTop = $(this).hasClass('nav-top') ? 0 : scrollHeight;
		$('html,body').stop().animate({'scrollTop':moveTop}, moveSpeed, 'easeOutSine');
		e.preventDefault();
	});


	// íƒ­ë©”ë‰´ ì•„ì´ë””
	$(document).on('click', '*[data-ui-tabmenu="btn"] a', function(e){
		var tabName = $(this).attr('href');
		var $tabCon = $(this).parent().parent().siblings('.tab-con');
		$(this).parent().addClass('on').siblings().removeClass('on');
		$tabCon.removeClass('on');
		$(tabName).addClass('on');
		e.preventDefault();
	});


	// ìŠ¤ë§ˆíŠ¸ì„œì¹˜ ìŠ¬ë¼ì´ë”
	if($('.rangeSlide').length > 0){
		$('.rangeSlide').ionRangeSlider({
			type: 'double',
			hide_min_max: false,
			keyboard: true,
			prettify_separator: ',',
			values_separator: ' - ',
			onChange: function(e) {
				/*
				var id = this.extra_classes;
				if( id ){
					var price = [e.from,e.to];
					$('#'+id).val(price);
				}
				*/
			}
		});
	}

	//íŒŒì¼ì²¨ë¶€ ì»¤ìŠ¤í…€
	$('input[type="file"]').each(function(){
		$(this).on( "change", function() {
			 var fileName = $(this).val(); // íŒŒì¼ê²½ë¡œ
			 var fileReName = fileName.split("\\")[fileName.split("\\").length - 1]; // íŒŒì¼ëª…ë§Œ ë‚¨ê¹€
			 fileReName_final = fileReName+"<img src='https://img.sonyunara.com/2019/asset/pc/img/button/delete_s.png' style='cursor: pointer; margin-left:5px;' onclick=file_delete('"+fileReName+"','wm')>";
			 $(this).siblings('.file_name').html(fileReName_final); // ì¶œë ¥
			 //$(this).siblings('.file_name').text(fileReName); // ì¶œë ¥

//            var fileInput = document.getElementById("file");
//            var files = fileInput.files;
//			var file ='';
//
//			console.log(files);
//
//            for (var i = 0; i < files.length; i++) {
//                file += files[i].name+' / ';
//				console.log(file);
//			}
//
//			$(this).siblings('.file_name').text(file); // ì¶œë ¥
		});
	});

	// ìƒí’ˆ ì¢‹ì•„ìš” í† ê¸€
	$('.products-list').on('click', '.btn-like', function(){
//		$(this).toggleClass('on');
	});

	//íŒì—… ë”¤ ì˜ì—­ í´ë¦­
	$('#popBox').on('click', function(e){
		if(e.target.className == 'align-middle'){
			pop.close();
		};
	});

	//ì‹¤ì¸¡ ì‚¬ì´ì¦ˆ íƒ­
	$('.actualsize').each(function(){
		var $this = $(this);
//		$this.find('.size-list li').on('click', 'button', function(){
//			var idx = $(this).parent().index();
//			$(this).parent().addClass('on').siblings().removeClass('on');
//			$this.find('.size-table li').removeClass('on').eq(idx).addClass('on');
//		});
	});

	//ëª¨ë¸ ì „ì²´ë³´ê¸°
	$('#modelInfo').on('click', '.btn-more', function(){
		$('#modelInfo').find('.model-list').addClass('all');
	});
	$('#modelInfo').on('click', '.btn-close', function(){
		$('#modelInfo').find('.model-list').removeClass('all');
	});

	//í† ê¸€ í…Œì´ë¸”
	$('.toggle-table').on('click', '.btn-toggle', function(e){
		var $tr = $(this).parent().parent();
		$tr.toggleClass('on');
		e.preventDefault();
	});

	//faq-box
	$('.faq-box').on('click', '.tit a', function(e){
		$('.faq-box .list li').removeClass('on');
		$(this).parents('li').toggleClass('on');
		e.preventDefault();
	});


	//ì „ì²´ë©”ë‰´
	$('#btnAll').on('click', function(){
		if($('html').hasClass('open')){
			$('html').removeClass('open');
			$('body').css({'overflow':'auto','height':'auto'});
			$('#allMenu').fadeOut(300);

		}else{
			//alert( );
			var height = $(window).innerHeight();
			if( height < 1600 ){
				height = 1600;
			}
			$('html').addClass('open');
			$('body').css({'overflow':'hidden','height':height+'px'});
			$('#allMenu').fadeIn(400);
		}
	});

	//íƒ‘ë©”ë‰´ ì˜¤ë²„íš¨ê³¼
	$('#gnb .menu > li').each(function(){
		$(this).children('a').append('<span class="over">'+$(this).children('a').text()+'</span>');
		$(this).on({
			'mouseenter' : function(){
				$(this).find('.over').stop().fadeIn(300);
				$(this).find('.sub').stop().fadeIn(300);
			},
			'mouseleave' : function(){
				$(this).find('.sub').stop().fadeOut(200);
				$(this).find('.over').stop().fadeOut(200);
			}
		});
	});

	//ìƒë‹¨ ì˜¤ë¥¸ìª½ ì¹´í…Œê³ ë¦¬ ë©”ë‰´ ì˜¤ë²„ íš¨ê³¼
	$('#gnb .cateogry > li').each(function(){
		$(this).find('span').css({'opacity':'0'});
		$(this).on({
			'mouseenter' : function(){
				$(this).find('span').stop().animate({'opacity':'1'}, 300);
			},
			'mouseleave' : function(){
				$(this).find('span').stop().animate({'opacity':'0'}, 200);
			}
		});
	});

	//ë§ˆì´ë©”ë‰´ ì˜¤ë²„ íš¨ê³¼
	$('#header .mymenu li').each(function(){
		var loopLock = true;
		$(this).on({
			'mouseenter' : function(){
				var $this = $(this);
				loopLock = true;
				$this.siblings().find('.icon').stop().animate({'top':'0', 'height':'33px', 'width':'35px'}, 300);
				function up(){
					$this.find('.icon').stop().animate({'top':'6px', 'height':'31px', 'width':'35px'}, 200, 'easeInOutBounce').animate({'top':'-6px', 'height':'33px', 'width':'35px'}, 350, 'easeInOutBounce').animate({'top':'0'}, 200, function(){
						if(loopLock){
							setTimeout(function(){
								up();
							}, 100);
						}
					});
				}
				up();
			},
			'mouseleave' : function(){
				loopLock = false;
				$(this).find('.icon').stop(true, true).animate({'top':'0', 'height':'33px', 'width':'35px'}, 300);
			}
		});
	});

	var quickLock = true;

	function rightQuickMove(){
		if($(window).width() < 1440){
			$("#rightQuick").css('margin-left','550px');
			//$("#rightQuick").addClass('sQuick');	
		}else{
			$("#rightQuick").css('margin-left','760px');
			//$("#rightQuick").removeClass('sQuick');
		}		
	}

	rightQuickMove();

	$(window).on({
		'scroll' : function(e){
			var scrTop = $(this).scrollTop();
			var conTop = $('#container').offset().top;
			//var pointHeight = ($('html').height() * 12) / 100; // ì „ì²´ ë†’ì´ì˜ 12% ìœ„ì¹˜ ì˜¤ë©´ ë³´ì´ë„ë¡
			if(scrTop >= conTop-50 && quickLock){
				quickLock = false;
				$('#rightQuick').addClass('fixed');	
				
//				if($(window).width() < 1440){
//					$("#rightQuick").addClass('sQuick');	
//				}else{
//					$("#rightQuick").removeClass('sQuick');
//				}
			}else if(scrTop <  conTop && !quickLock){
				quickLock = true;
				$('#rightQuick').removeClass('fixed');
			}
		},
		'resize' : function(e){
			rightQuickMove();
		},
	});

	$(".placeholder").on('input keyup paste', function(){
		if($(this).val().length > 0){
			$(this).parent().addClass('insert');
		} else {
			$(this).parent().removeClass('insert');
		}
	});

	// ìˆ˜ëŸ‰
//	$('.ea').on('click', 'button', function(){
//		var $num = $(this).siblings('input');
//		var val = Number($num.val());
//		if($(this).hasClass('plus')){
//			$num.val(val+1);
//		}else{
//			if(val > 0){
//				$num.val(val-1);
//			}
//		}
//	});
});

$(document).ready(function() {
	var height = $(".table").height();
	var num = $(".table > .wrap > div").length;
	var max = height * num;
	var move = 0;

	function popularRolling() {
		if (move >= max)
		{
			move = height;
			$(".table > .wrap").css({'top':'0'});
		} else {
			move;
			move += height;
		}
		$(".table > .wrap").animate({'top': -move});
	};
	popularRollingOff = setInterval(popularRolling,1500);
	$(".table > .wrap").append($(".table > .wrap > div").first().clone());
	$(".table > .wrap > div").on({
		mouseover: function(){
		  clearInterval(popularRollingOff);
		},  
		mouseout: function(){
		  popularRollingOff = setInterval(popularRolling,1500);
		}
	});
	$("#header .top .mymenu li button , .table > .wrap > div").click(function(e) {
		$("#header .top .mymenu li .table").toggleClass('on');
		$(".popular-search-ward").toggle();
	});
	$(document).mouseup(function(e) {
		var container = $(".popular-search-ward");
		if (container.has(e.target).length == 0)
		{
			$("#header .top .mymenu li .table").removeClass('on');
			container.hide();
		}
	});
});