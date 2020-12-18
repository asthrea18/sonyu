/**
 * rollingBanner 0.2
 * http://www.yamah.co.kr
 *
 * Copyright (C) 2017 yamah.co.kr
 */

(function($){
	$.fn.rollingBanner = function(opt){

		var $this = this,
              $listBox = $this.find('.in_list'),
              $list = $listBox.children('li'),
              thisWidth = $this.width(),
              listWidth = $listBox.width(),
			  move = 0,
              listHalf,
			  listmove;
		
		// ç¥ë‡ë¦° ï¿½ëª…ë˜¿
		opt = $.extend({
			speed : 50,
			direction : 'left',
			left : $this.children('.btn_left'),
			right : $this.children('.btn_right')
		}, opt);
		
		var direction = opt.direction;
		
		var slide = {
			init : function(){
				$list.each(function(i){
					$listBox.append($list.eq(i).clone()) //ç”±ÑŠë’ªï¿½ï¿½ æ´¹ëªƒï¿½æ¿¡ï¿½ è¹‚ë“­ê¶—ï¿½ëŒê½Œ ï¿½ã…¼ë¿‰ éºìˆˆì”¤ï¿½ï¿½
				});
				listHalf = $listBox.innerWidth() / 2; //è¹‚ë“­ê¶—æ¿¡ï¿½ ï¿½ëª…ë¹ ç”±ÑŠë’ªï¿½ëª„ì“½ ï¿½ÑŠì” ï§ë‡ï¿½ ï¿½ë¨®ê°™æ¿¡ï¿½ ï¿½ì„ë¿€æ¹²ï¿½ ï¿½ëš®Ð¦ï¿½ï¿½ ï¿½ì„ŽëŠ»æ¹²ê³•ï¿½ ï¿½ëŒï¿½ï¿½ï¿½
				slide.play();
				slide.controls();
			},
			controls : function(){
				$this.children('.hidden').on({
					'mouseenter' : function(){
						slide.pause();	
					},
					'mouseleave' : function(){
						slide.play();
					}
				});
				opt.left.on('mouseenter', function(){
					direction = 'left';
					slide.play();
				});
				opt.right.on('mouseenter', function(){
					direction = 'right';
					slide.play();
				});
			},
			move : function(){
				if(direction == 'left'){
					$listBox.css({'left':move--});
					if (Math.abs(move) >= listHalf) { // ï¿½ê¾©ì˜± åª›ë¯ªì”  ç”±ÑŠë’ªï¿½ëª„ì“½ ï¿½ëˆì»²åª›ï¿½ è¹‚ëŒ€ë–Ž ï¿½Ñˆêµ…ï¿½ï¿½ åª›ìˆˆï¿½ å¯ƒâ‘¥ìŠ¦ 0ï¿½ì‡°ì¤ˆ ç¥ë‡ë¦°ï¿½ï¿½
						move = 0
					}
				}else if(direction == 'right'){
					$listBox.css({'left':move++}); 
                    if (move >= 0) {//ï¿½ê¾©ì˜± åª›ë¯ªì”  0è¹‚ëŒ€ë–Ž ï¿½Ñˆêµ…ï¿½ï¿½ åª›ìˆˆï¿½ å¯ƒìŽŒìŠ¦ ç”±ÑŠë’ªï¿½ï¿½ ï¿½ÑŠì” ï§ë‰ì“½ è«›ì„ì»ª ï§ëš°ê²® ï¿½ë°´êº¼ä»¥ï¿½ï¿½ï¿½
                       move = -listHalf
                    }
				}
			},
			play : function(){
				slide.pause();
                listmove = setInterval(slide.move, opt.speed)
			},
			pause : function(){
				clearInterval(listmove);
			}
		}
		
		if(thisWidth < listWidth){ // ç”±ÑŠë’ªï¿½ëªƒì»¯ï¿½ã…¼ì“½ ï¿½ÑŠì” ï§ë‡ï¿½ ç•°ì’•ì °è«›ëº¤ë’ªè¹‚ëŒ€ë–Ž ï¿½ï¿½ å¯ƒìŽŒìŠ¦ï§ï¿½ ï¿½ã…½ë»¾
			slide.init();
		}
	}	
})(jQuery);