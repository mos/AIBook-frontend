function startRecord(phone,time) {
	if ( r == null ) {
		mui.toast( "Device not ready!" ); 
	}
	r.record( {filename:"_doc/audio/"+phone+time}, function () {
				audiourl = "_doc/audio/"+phone+time;
	}, function ( e ) {
		mui.toast("抱歉，录入失败！");
	} );
	
}
				
function stopRecord() {
	r.stop();  
}


function startPlay(src) {
	if ( plus.audio == undefined ) {
		mui.toast( "Device not ready!" );
	}
	p = plus.audio.createPlayer(src); 
	p.play( function () {
		mui.toast("语音结束"); 
	}, function ( e ) {
		alert( "Audio play error: " + e.message ); 
	} ); 
}