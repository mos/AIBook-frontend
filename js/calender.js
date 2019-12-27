
var thecustomday = "";
(function(){
  /*
   * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
   */
  var dateObj = (function(){
    var _date = new Date();    // 默认为当前系统时间
    return {
      getDate : function(){
        return _date;
      },
      setDate : function(date) {
        _date = date;
      }
    };
  })();
 
  // 设置calendar div中的html部分
  renderHtml();
  // 表格中显示日期
  showCalendarData();
  // 绑定事件
  bindEvent();
 
  /**
   * 渲染html结构
   */
  function renderHtml() {
    var calendar = document.getElementById("calendar");
    var titleBox = document.createElement("div");  // 标题盒子 设置上一月 下一月 标题
    var bodyBox = document.createElement("div");  // 表格区 显示数据
 
    // 设置标题盒子中的html
    titleBox.className = 'calendar-title-box';
    titleBox.innerHTML ="<span class='prev-year' id='prevYear'><i class='iconfont icon-jiantou_xiangzuoliangci'></i></span>"+
    "<span class='prev-month' id='prevMonth'></span>" +
      "<span class='calendar-title' id='calendarTitle'></span>" +
      "<span id='nextMonth' class='next-month'></span>"+"<span class='next-year' id='nextYear'><i class='iconfont icon-jiantou_xiangyouliangci'></i></span>";
    calendar.appendChild(titleBox);    // 添加到calendar div中
 
    // 设置表格区的html结构
    bodyBox.className = 'calendar-body-box';
    var _headHtml = "<div class='layer layer-one'>" +
              "<div>日</div>" +
              "<div>一</div>" +
              "<div>二</div>" +
              "<div>三</div>" +
              "<div>四</div>" +
              "<div>五</div>" +
              "<div>六</div>" +
            "</div>";
    var _bodyHtml = "";
 
    // 一个月最多31天，所以一个月最多占6行表格
    for(var i = 0; i < 6; i++) {  
      _bodyHtml += "<div class='layer'>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
              "<div class='cell'></div>" +
            "</div>";
    }
    bodyBox.innerHTML ="<div id='calendarTable' class='calendar-table'>" + _headHtml + _bodyHtml + "</div>";
    // 添加到calendar div中
    calendar.appendChild(bodyBox);
  }
 
  /**
   * 表格中显示数据，并设置类名
   */
  function showCalendarData() {
    var _year = dateObj.getDate().getFullYear();
    var _month = dateObj.getDate().getMonth() + 1;
    var _dateStr = getDateStr(dateObj.getDate());
 
    // 设置顶部标题栏中的 年、月信息
    var calendarTitle = document.getElementById("calendarTitle");
    var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4,2) + "月";
    calendarTitle.innerText = titleStr;
 
    // 设置表格中的日期数据
    var _table = document.getElementById("calendarTable");
    
    var _tds = _table.getElementsByClassName('cell'); 
    var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
    for(var i = 0; i < _tds.length; i++) {
      var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
      var _thisDayStr = getDateStr(_thisDay);
      _tds[i].innerText = _thisDay.getDate();
      //_tds[i].data = _thisDayStr;
      _tds[i].setAttribute('data', _thisDayStr);
      if(_thisDayStr == getDateStr(new Date())) {    // 当前天
        _tds[i].className = 'cell currentDay isclicked';
        /*newadd*/
        thecustomday=_thisDayStr;
        /*======*/
        var choosedate = document.getElementById("choosedate");
       	var str = _thisDayStr; 
       	choosedate.innerHTML=str.substring(0,4)+"年"+str.substring(4,6)+"月"+str.substring(6,8)+"日";
      }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
        _tds[i].className = 'cell currentMonth';  // 当前月
      }else {    // 其他月
        _tds[i].className = 'cell otherMonth';
      }
    }
  }
 
  /**
   * 绑定上个月下个月事件
   */
  function bindEvent() {
    var prevMonth = document.getElementById("prevMonth");
    var nextMonth = document.getElementById("nextMonth");
    var prevYear = document.getElementById("prevYear");
    var nextYear = document.getElementById("nextYear");
    addEvent(prevMonth, 'click', toPrevMonth);
    addEvent(nextMonth, 'click', toNextMonth);
    addEvent(prevYear, 'click', toPrevYear);
    addEvent(nextYear, 'click', toNextYear);
    
    var _dateStr = getDateStr(dateObj.getDate());
    thecustomday = _dateStr.substring(6,8);
    
    var table = document.getElementById("calendarTable");
		var tds = table.getElementsByClassName('cell');
		for(var i = 0; i < tds.length; i++) {
		  tds[i].addEventListener( 'tap', function(e){
		  	console.log(thecustomday);
		  	var _dateStr = getDateStr(dateObj.getDate());
		  	var choosedate = document.getElementById("choosedate");
		  	var str = e.target.getAttribute('data');
		  	
		  	var _table = document.getElementById("calendarTable");
		  	var _tds = _table.getElementsByClassName('cell'); 
		    
		    choosedate.innerHTML=str.substring(0,4)+"年"+str.substring(4,6)+"月"+str.substring(6,8)+"日";
	    	var clicked = _table.getElementsByClassName('isclicked');
	    	for(var d=0;d<clicked.length;d++){
	    		clicked[d].classList.remove('isclicked');
	    	}
		    if(_dateStr.substring(0,6) == str.substring(0,6)){

		    	e.target.classList.add('isclicked');
		    	console.log("我在同一月中");
		    }else{
		    	e.target.classList.add('isclicked');
		    	console.log("我不在同一月中");
		    }
		    
		    /*ajax部分*/
//		   var localtoken = localStorage.getItem("token")
//				var nowtime = new Date();
//				//var localday = nowtime.getFullYear() + "-" + ((nowtime.getMonth()+1)<10?"0"+(nowtime.getMonth()+1):(nowtime.getMonth()+1)) + "-" + ((nowtime.getDate())<10?"0"+(nowtime.getDate()):(nowtime.getDate()));
//				var localday = str.substring(0,4)+"-"+str.substring(4,6)+"-"+str.substring(6,8);
//				console.log(localday);
//				mui.post('https://dc.1zdz.cn/root/consume/select.php',{
//						token:localtoken,
//						day:localday
//					},function(data){
//						//服务器返回响应，根据响应结果，分析是否登录成功；
//						if(data.code == 100){
//							var containers = document.getElementById("containers");
//							var totalout = 0;
//							var totalin = 0;
//							containers.innerHTML="";
//							var i=0;
//							while(data.data[i]){
//								containers.innerHTML+='<li class="mui-table-view-cell"><span>'+(data.data[i].ctype == "out"?"支出":"收入")+'</span><span>'+data.data[i].cmoney+'元</span></li>';
//								totalout+= data.data[i].ctype == "out"?parseInt(data.data[i].cmoney):0;
//								totalin+=data.data[i].ctype == "in"?parseInt(data.data[i].cmoney):0;
//								i++;
//							}
//							document.getElementById("shouzhi").innerHTML=totalout+"/"+totalin+"元";
//						}else if(data.code == 120){
//							var containers = document.getElementById("containers");
//							var totalout = 0;
//							var totalin = 0;
//							containers.innerHTML="";
//							document.getElementById("shouzhi").innerHTML=totalout+"/"+totalin+"元";
//						}
//					},'json'
//				);
		   
		   
		   
		    /*--------*/
		    
		    
		    
		    
		    
		    thecustomday = str.substring(6,8);
		    console.log(thecustomday);
		  });
		}
    
  }
 
  /**
   * 绑定事件
   */
  function addEvent(dom, eType, func) {
    if(dom.addEventListener) {  // DOM 2.0
      dom.addEventListener(eType, function(e){
        func(e);
      });
    } else if(dom.attachEvent){  // IE5+
      dom.attachEvent('on' + eType, function(e){
        func(e);
      });
    } else {  // DOM 0
      dom['on' + eType] = function(e) {
        func(e);
      }
    }
  } 
 
  /**
   * 点击上个月图标触发
   */
  function toPrevMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    showCalendarData();
  }
 
  /**
   * 点击下个月图标触发
   */
  function toNextMonth() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    showCalendarData();
  }
 
 
 
 	function toPrevYear() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
    showCalendarData();
  }
 	function toNextYear() {
    var date = dateObj.getDate();
    dateObj.setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
    showCalendarData();
  }
 
  /**
   * 日期转化为字符串， 4位年+2位月+2位日
   */
  function getDateStr(date) {
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;    // 月从0开始计数
    var _d = date.getDate();
     
    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
    return _year + _month + _d;
  }
})();