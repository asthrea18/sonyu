function SiteProc(){
	// íŒŒì¼ê²½ë¡œ
	this.classFileAddr = '/class/site_ajax.php'; // í•´ë‹¹íŒŒì¼ ìœ„ì¹˜

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
		if( $.trim(data) ){
			data = JSON.parse(data);
			return data;
		}
	}

	this.imgLinkCnt = function(goods_idx,file_name){
		var data = new Object();
		data.method = 'gifTraceLink';
		data.goods_idx = goods_idx;
		data.file_name = file_name;

		data = JSON.stringify(data);

		this.ajax(data);
	}
}

// ê¸°ë³¸í´ëž˜ìŠ¤ ìƒì„±
var SiteProc = new SiteProc();
