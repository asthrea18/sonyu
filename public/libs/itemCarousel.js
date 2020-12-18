/**
 * itemCarousel 1.0
 * http://www.yamah.co.kr
 *
 * Copyright (C) 2017 yamah.co.kr
**/

(function($){
	$.fn.itemCarousel = function(opt){
		opt = $.extend({
			width : 215,
			space : 15,
			speed : 20
		}, opt);

		var $this = this,
			$list = $this.children('.list'),
			$item = $list.children('.item'),
			length = $item.length,
			itemInfo = null, //ì•„ì´í…œ ì •ë³´ ê°ì²´
			saveLeft = 0, // ë“œëž˜ê·¸ ì €ìž¥ ê°’
			oldLeft = 0, // ë“œëž˜ê·¸ ì´ì „ ê°’
			downLeft = 0, // ë“œëž˜ê·¸ ë‹¤ìš´ ê°’
			isDown = false, // ë“œëž˜ê·¸ ì œì–´
			lastInsert = true, // ë§ˆì§€ë§‰ ì•„ì´í…œ ì œì–´
			itemClick = true, // ì•„ì´í…œ í´ë¦­ ì œì–´
			moveAnimate; // ì…‹ì¸í„°ë²Œ

		var carousel = {
			init : function(){
				$(window).on('resize', function(){
					itemInfo = { // ì•„ì´í…œ ì •ë³´ ê°ì²´ ì €ìž¥
						offset : $this.offset(),
						width : $this.width(),
						itemWidth : opt.width+opt.space
					}
					$list.show(); // ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ ë‚˜íƒ€ëƒ„(ì‚¬ì´ì¦ˆë¬¸ì œë¡œ ì¸í•´ ìˆ¨ê²¨ë‘ )
					$item.each(function(i){ // ê° ì•„ì´í…œ ê°€ë¡œì‚¬ì´ì¦ˆ ì§€ì •
						$(this).css({'width':opt.width});
					});
					$list.css({'left':'0'}); // ë¦¬ì‚¬ì´ì¦ˆ  ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ ê¸°ë³¸ left:0
					$item = $list.children('.item'); // ë¦¬ì‚¬ì´ì¦ˆ ì•„ì´í…œ ìˆœì„œ ë‹¤ì‹œ ì €ìž¥
					lastInsert = true; // ë§ˆì§€ë§‰ ì•„ì´í…œ ì œì–´
					$item.css({'position':'relative','left':0}); // ì•„ì´í…œ ê¸°ë³¸ ê°’ ë³€ê²½
				}).resize();
				this.movePlay(); // ì´ë™ ì‹œìž‘
				this.controls(); // ì œì–´
			},
			controls : function(){
				$list.on({
					'mouseenter' : function(){
						clearInterval(moveAnimate); // ë¦¬ìŠ¤íŠ¸ ë§ˆìš°ìŠ¤ ì˜¤ë²„ì‹œ ì •ì§€
					},
					'mouseleave' : function(){
							carousel.movePlay(); // ë¦¬ìŠ¤íŠ¸ ë§ˆìš°ìŠ¤ ì•„ì›ƒì‹œ ìž¬ì‹œìž‘
					},
					'mousedown' : function(e){
						saveLeft = $list.position().left - itemInfo.offset.left; // ë¦¬ìŠ¤íŠ¸ì˜ leftê°’ ì €ìž¥
						oldLeft = downLeft = e.clientX; // ë‹¤ìš´ ì¢Œí‘œ ì €ìž¥
						isDown = true; // ë“œëž˜ê·¸ ì œì–´ í™œì„±
						e.preventDefault();
					},
					'mouseup' : function(e){
						isDown = false; // ë“œëž˜ê·¸ ì œì–´ ë¹„í™œì„±
						setTimeout(function(){ // ë§ˆìš°ìŠ¤ ì—… 0.3ì´ˆ ë’¤
							itemClick = true; // ì•„ì´í…œ í´ë¦­ì œì–´ í™œì„±
						}, 300);
						e.preventDefault();
					},
					'mousemove' : function(e){
						if (isDown){ // ë“œëž˜ê·¸ ì œì–´ í™œì„±ì¸ ê²½ìš°
							var distance = oldLeft - e.clientX; // ì´ë™ê°’ êµ¬í•˜ê¸°
							oldLeft = e.clientX; // ì¢Œí‘œê°’ ì €ìž¥
							$list.stop().animate({ left: '-=' + distance}, 0); // ë¦¬ìŠ¤íŠ¸ ë°•ìŠ¤ ì´ë™
							var posLeft = Math.abs($list.position().left - itemInfo.offset.left); // ë¦¬ìŠ¤íŠ¸ ë°•ìŠ¤ ì´ë™ê°’
							if(distance > 0){ // left move
								carousel.moveBox.left(posLeft);
							}else{ // right move
								carousel.moveBox.right(posLeft);
							}
							if(Math.abs(distance) > 1){ // ì´ë™ê°’ì´ 1ë³´ë‹¤ í° ê²¨ìš° ì‹¤í–‰
								itemClick = false; // ì•„ì´í…œ í´ë¦­ ë¹„í™œì„±
							}
						}
						e.preventDefault();
					}
				});

				$item.children('a').on({
					'click' : function(){
						if(!itemClick){
							return false;
						}
					}
				});
			},
			movePlay : function(){
				moveAnimate = setInterval(function(){ // ë°˜ë³µ ì‹¤í–‰
					carousel.moveBox.move(true);
				}, opt.speed);
			},
			moveBox : {
				move : function(type){
					var posLeft = Math.abs($list.position().left - itemInfo.offset.left); // ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ì˜ ì´ë™ê°’
					if(type){ // typeì´ trueì¸ ê²½ìš° ì™¼ìª½ ì´ë™
						$list.css({'left':'-=1px'});
						carousel.moveBox.left(posLeft);
					}else{ // ì˜¤ë¥¸ìª½ ì´ë™
						$list.css({'left':'+=1px'});
						carousel.moveBox.right(posLeft);
					}
				},
				left : function(posLeft){
					if(posLeft >= itemInfo.itemWidth){ // ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ì˜ ìœ„ì¹˜ê°’ì´ í˜„ìž¬ ì•„ì´í…œ ê°€ë¡œì‚¬ì´ì¦ˆë³´ë‹¤ í¬ë‹¤ë©´
						$list.css({'left':'0'}); // ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ leftê°’ 0ìœ¼ë¡œ ì´ˆê¸°í™”
						$item.css({'position':'relative','left':0}).eq(0).insertAfter($item.eq(length-1)); // ì´ë™ëœ ì²«ë²ˆì§¸ ì•„ì´í…œì„ ë§ˆì§€ë§‰ìœ¼ë¡œ íƒœê·¸ìˆœì„œ ì´ë™
						$item = $list.children('.item'); // ë³€ê²½ëœ íƒœê·¸ ìˆœì„œ ë‹¤ì‹œ ì €ìž¥
					}
				},
				right : function(posLeft){
					if(lastInsert){ // ì˜¤ë¥¸ìª½ìœ¼ë¡œ ì´ë™ì‹œ ë§ˆì§€ë§‰ ë¦¬ìŠ¤íŠ¸ê°€ ì²˜ìŒìœ¼ë¡œ ì™€ì•¼í•œë‹¤ â€»ì¤‘ë³µ ì‹¤í–‰ ë°©ì§€
						lastInsert = false;
						$item.eq(length-1).css({'position':'absolute','left':-itemInfo.itemWidth}); // ë§ˆì§€ë§‰ ì•„ì´í…œì„ absolute ìœ„ì¹˜ê°’ì„ ì´ìš©í•˜ì—¬ ì´ë™
					}
					if(posLeft >= itemInfo.itemWidth){
						lastInsert = true;
						$item.eq(length-1).css({'position':'relative','left':0}).insertBefore($item.eq(0)); // ë§ˆì§€ë§‰ ì•„ì´í…œì„ relativeë¡œ ë³€ê²½í•˜ê³  íƒœê·¸ìˆœì„œ ì²˜ìŒìœ¼ë¡œ ì´ë™
						$list.css({'left':'0'}); // ë¦¬ìŠ¤íŠ¸ë°•ìŠ¤ leftë°•ìŠ¤ 0ìœ¼ë¡œ ì´ˆê¸°í™”
						$item = $list.children('.item'); // ë³€ê²½ëœ íƒœê·¸ ìˆœì„œ ë‹¤ì‹œ ì €ìž¥
					}
				}
			}
		}
		carousel.init();
	}
})(jQuery);