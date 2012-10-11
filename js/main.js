"use strict";
function PQUEUE(processArray,initialProcessID,queueName){if(typeof processArray!=='object')return;return new function(){var _self=this;var _pstat={ticking:false,error:false,autoProceed:false,name:String(queueName?queueName:(new Date()).getTime()),processes:[],processIndex:[],pc:0,};var _heap={};function _overflow(){return _pstat.pc>=_pstat.processes.length;}
function _error(){_pstat.error=true;}
function _isFunction(object){return typeof object==='function';}
function _isHalt(process){return process===PQUEUE_HALT;}
this.tick=function(){if(_pstat.ticking)return;_pstat.ticking=true;_pstat.autoProceed=true;if(_pstat.error!==false){}else{if(_overflow()){_error();}else{var currentProcess=_pstat.processes[_pstat.pc];if(!_isFunction(currentProcess)){_error();}else if(_isHalt(currentProcess)){}else{++_pstat.pc;var _api={heap:_heap,heap_dump:function(){var result='';for(var key in _heap){if(result!=='')result+=', \n';result+=key+':'+_heap[key];}
return'{\n'+result+'\n}';},wait:function(){_pstat.autoProceed=false;},walk:function(){_pstat.autoProceed=true;_self.tick();},pc:{increment:function(){++_pstat.pc;},decrement:function(){--_pstat.pc;},offset:function(value){_pstat.pc+=Number(value)||0;},goto:function(value){_pstat.pc=Number(value)||-1;},locate:function(funcName){return _pstat.processIndex[String(funcName)]||-1;}}};currentProcess.call(_api,_api);}}}
_pstat.ticking=false;if(_pstat.autoProceed===true)
window.setTimeout(function(){_self.tick()},0);};for(var key in processArray){var process=processArray[key];var index=_pstat.processes.length;var name=process.name;_pstat.processes.push(process);if(name!=='')
_pstat.processIndex[name]=index;}
_pstat.pc=parseInt(initialProcessID,10)||0;};}
function PQUEUE_HALT(q){}

function SETRACE(conditionArray,callback,percentReport)
{if(typeof conditionArray!=='object')return;if(typeof callback!=='function')return;return(typeof conditionArray!=='object'||typeof callback!=='function')?null:new function()
{var name=(new Date()).getTime();var conditions=[];var maxCount=0;var countDown=0;var cb=callback;var pr=(typeof percentReport!=='function')?null:percentReport;this.set=[];function checkCountDown()
{if(countDown<=0){cb.call();}}
function _generate_setCallback(key)
{return function()
{if(conditions[key]===false){conditions[key]=true;--countDown;if(pr!==null){var percentResult=1-countDown/maxCount;pr.call(this,percentResult);}}
checkCountDown();};}
for(var i=0;i<conditionArray.length;++i){var key=conditionArray[i];if(typeof key==='undefined'||typeof conditions[key]!=='undefined')
continue;conditions[key]=false;this.set[key]=_generate_setCallback(key);++countDown;}
maxCount=countDown;};}

(function($) {
"use strict";
	var mainQueue = PQUEUE([
		function initialize(q) {
			q.heap.cfgs = {
				perfectWidth     : 120,  // em
				perfectHeight    : 60,   // em
				minWidth         : 400,  // in px
				refreshRate      : 15,   // frame per second
				updateTitle      : true, // whether update window title or not
				resizeDelayTimer : null,
				toggleTime       : 100,
				foreColor        : localStorage.getItem('foreColor') || '000000',
				backColor        : localStorage.getItem('rearColor') || 'FFFFFF',
				hourmode         : localStorage.getItem('hour24') || 'off',
				weekdaymode      : localStorage.getItem('weekday') || 'off',
				datemode         : localStorage.getItem('date') || 'off'
			};
			q.heap.hlps = {
				resizeEM : function (duration, callback) {
					duration = (duration === 0) ? 0 : (Number(duration) || 300);
					var perfectRatio = q.heap.cfgs['perfectWidth'] / q.heap.cfgs['perfectHeight'];
					var width = $(window).width(),
						height = $(window).height();
					var currentRatio = width / height;
					/*
					if (width < minWidth) width = minWidth;
					if (height < minWidth / perfectRatio) height = minWidth / perfectRatio;
					*/
					var fontSize = ((currentRatio < perfectRatio) ? width / q.heap.cfgs['perfectWidth'] : height / q.heap.cfgs['perfectHeight']) + 'px';
					if (fontSize !== q.heap.body.css('fontSize'))
						q.heap.body.stop().animate({'fontSize': fontSize, 'opacity': 1}, duration, callback);
				},
				refreshClock : function ()
				{
					var now = new Date();
					var h = now.getHours(),
						m = now.getMinutes(),
						s = now.getSeconds(),
						d = now.getDate(),
						D = now.getDay(),
						M = now.getMonth(),
						Y = now.getFullYear();
					var label_h12 = (((h % 12) < 10) ? '0' : '') + String(h % 12),
						label_h24 = ((h < 10) ? '0' : '') + String(h),
						label_m = ((m < 10) ? '0' : '') + String(m),
						label_s = ((s < 10) ? '0' : '') + String(s),
						label_d = String(d) + ((d > 0 && d < 4 || d > 20 && d < 24 || d > 30) ? ['st', 'nd', 'rd'][d % 10 - 1] : 'th'),
						label_D = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][D],
						label_M = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'][M],
						label_Y = String(Y),
						label_am = ['AM', 'PM'][Math.floor(h/12)];
					var label_title = label_h12 + ':' + label_m + ':' + label_s + ' ' + label_am;
					if (q.heap.clockField['h12_0'].text() !== label_h12[0]) q.heap.clockField['h12_0'].text(label_h12[0]);
					if (q.heap.clockField['h12_1'].text() !== label_h12[1]) q.heap.clockField['h12_1'].text(label_h12[1]);
					
					if (q.heap.clockField['h24_0'].text() !== label_h24[0]) q.heap.clockField['h24_0'].text(label_h24[0]);
					if (q.heap.clockField['h24_1'].text() !== label_h24[1]) q.heap.clockField['h24_1'].text(label_h24[1]);
					
					if (q.heap.clockField['m_0'].text() !== label_m[0]) q.heap.clockField['m_0'].text(label_m[0]);
					if (q.heap.clockField['m_1'].text() !== label_m[1]) q.heap.clockField['m_1'].text(label_m[1]);
					
					if (q.heap.clockField['s_0'].text() !== label_s[0]) q.heap.clockField['s_0'].text(label_s[0]);
					if (q.heap.clockField['s_1'].text() !== label_s[1]) q.heap.clockField['s_1'].text(label_s[1]);
					
					if (q.heap.clockField['am'].text() !== label_am) q.heap.clockField['am'].text(label_am);
					if (q.heap.clockField['wd'].text() !== label_D) q.heap.clockField['wd'].text(label_D);
					if (q.heap.clockField['M'].text() !== label_M) q.heap.clockField['M'].text(label_M);
					if (q.heap.clockField['D'].text() !== label_d) q.heap.clockField['D'].text(label_d);
					if (q.heap.clockField['Y'].text() !== label_Y) q.heap.clockField['Y'].text(label_Y);
					if (q.heap.cfgs['updateTitle'] && document.title !== label_title) document.title = label_title;
				}
			};
			q.heap.apis = {
				'hour24_on': function(callback) {
					q.heap.wrapper.addClass('h24', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="hour24"]');
					jQObj.addClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('hour24', 'on');
				},
				'hour24_off': function(callback) {
					q.heap.wrapper.removeClass('h24', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="hour24"]');
					jQObj.removeClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('hour24', 'off');
				},
				'weekday_on': function(callback) {
					q.heap.wrapper.removeClass('noweekday', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="weekday"]');
					jQObj.addClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('weekday', 'on');
				},
				'weekday_off': function(callback) {
					q.heap.wrapper.addClass('noweekday', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="weekday"]');
					jQObj.removeClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('weekday', 'off');
				},
				'date_on': function(callback) {
					q.heap.wrapper.removeClass('nodate', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="date"]');
					jQObj.addClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('date', 'on');
				},
				'date_off': function(callback)
				{
					q.heap.wrapper.addClass('nodate', q.heap.cfgs['toggleTime']);
					var jQObj = $('.checkSlide .toggler[for="date"]');
					jQObj.removeClass('on', q.heap.cfgs['toggleTime'], callback);
					localStorage.setItem('date', 'off');
				},
				'body_bgc': function(colorValue, callback)
				{
					var match = String(colorValue).match(/^[#]{0,1}([0-9a-f]{3}|[0-9a-f]{6})$/im);
					if (!match) return;
					var hexString = match[1];
					var parseArray = hexString.split('');
				//	if (parseArray[0] === '#') parseArray.pop();
					if (parseArray.length === 3) {
						parseArray[5] = parseArray[4] = parseArray[2];
						parseArray[3] = parseArray[2] = parseArray[1];
						parseArray[1] = parseArray[0];
					}
					var channelR = Number('0x' + String(parseArray[0]) + String(parseArray[1])),
						channelG = Number('0x' + parseArray[2] + parseArray[3]),
						channelB = Number('0x' + parseArray[4] + parseArray[5]);
					var backgroundColorString = 'rgb(' + channelR + ', ' + channelG + ', ' + channelB + ')';
					var borderColorChannelR = 255 - channelR,
						borderColorChannelG = 255 - channelG,
						borderColorChannelB = 255 - channelB;
					var borderColorString = 'rgb(' + borderColorChannelR + ', ' + borderColorChannelG + ', ' + borderColorChannelB + ')';
					q.heap.body.animate({'backgroundColor': backgroundColorString}, 300, callback);
					q.heap.control.animate({'border-color': borderColorString}, 300);
					
					localStorage.setItem('rearColor', hexString);
					var inputField = $('.bgcField[for="body"]');
					if (inputField.val() !== colorValue) inputField.val(colorValue);
				},
				'wrapper_color': function(colorValue, callback)
				{
					var match = String(colorValue).match(/^[#]{0,1}([0-9a-f]{3}|[0-9a-f]{6})$/im);
					if (!match) return;
					var hexString = match[1];
					var parseArray = hexString.split('');
					if (parseArray.length === 3) {
						parseArray[5] = parseArray[4] = parseArray[2];
						parseArray[3] = parseArray[2] = parseArray[1];
						parseArray[1] = parseArray[0];
					}
					var channelR = Number('0x' + String(parseArray[0]) + String(parseArray[1])),
						channelG = Number('0x' + parseArray[2] + parseArray[3]),
						channelB = Number('0x' + parseArray[4] + parseArray[5]);
					var colorString = 'rgb(' + channelR + ', ' + channelG + ', ' + channelB + ')';
					q.heap.wrapper.animate({'color': colorString}, 300, callback);
					
					localStorage.setItem('foreColor', hexString);
					var inputField = $('.colorField[for="wrapper"]');
					if (inputField.val() !== colorValue) inputField.val(colorValue);
				}
			};
		},
		function prepareDocument(q) {
			q.heap.body = $(document.body);
			q.heap.wrapper = $('#wrapper.fsc_wrapper', q.heap.body),
			q.heap.control = $('#control', q.heap.body);
			q.heap.body_focusField = $('#body_focusField', q.heap.body),
			q.heap.control_focusField = $('#control_focusField', q.heap.control);
/*
create the following struct
<div id="wrapper" class="fsc_wrapper h12 noweekday hidden">
<p class="time"><label id="hour12" class="h12 dd">12</label><label id="hour24" class="h24 dd">24</label><label id="hour2minute" class="min sd">:</label><label id="minute" class="min dd">00</label><label id="minute2second" class="sec sd">:</label><label id="second" class="sec dd">00</label><label id="am" class="h12 dd">AM</label></p>
<p class="date">
	<label id="weekday">Wednesday</label><label id="month">September</label><label id="day">31st</label><label id="year_seperator">,</label><label id="year">2055</label>
</p>
</div>
*/
			q.heap.clockField = {
				h12_0: $('<label class="h12 sd">'),
				h12_1: $('<label class="h12 sd">'),
				h24_0: $('<label class="h24 sd">'),
				h24_1: $('<label class="h24 sd">'),
				
				m_0: $('<label class="min sd">'),
				m_1: $('<label class="min sd">'),
				
				s_0: $('<label class="sec sd">'),
				s_1: $('<label class="sec sd">'),
				
				am: $('<label class="am h12 dd">'),
				
				wd: $('<label class="weekday">'),
				M: $('<label class="month">'),
				D: $('<label class="day">'),
				Y: $('<label class="year">')
			};
			q.heap.seperator = {
				h2m: $('<label class="sd">:</label>'),
				m2s: $('<label class="sd">:</label>'),
				M2Y: $('<label class="year_seperator">,</label>')
			};
			var p_time = $('<p class="time">').append(
					q.heap.clockField['h12_0'],
					q.heap.clockField['h12_1'],
					q.heap.clockField['h24_0'],
					q.heap.clockField['h24_1'],
					q.heap.seperator['h2m'],
					q.heap.clockField['m_0'],
					q.heap.clockField['m_1'],
					q.heap.seperator['m2s'],
					q.heap.clockField['s_0'],
					q.heap.clockField['s_1'],
					q.heap.clockField['am']
				).appendTo(q.heap.wrapper);
			var p_date = $('<p class="date">').append(
				q.heap.clockField['wd'],
				q.heap.clockField['M'],
				q.heap.clockField['D'],
				q.heap.seperator['M2Y'],
				q.heap.clockField['Y']
			).appendTo(q.heap.wrapper);
			
			/* pre-set properties */
			$('input.bgcField').each(function() {
				$(this).attr('maxlength', 6);
			});
			$('input.colorField').each(function() {
				$(this).attr('maxlength', 6);
			});
			/* focusField support */
			q.heap.body_focusField.focus(function() {
				q.heap.control.addClass('hiding').removeClass('active', 300);
			});
			q.heap.body.click(function() {
				q.heap.body_focusField.focus();
				return false;
			});
			q.heap.control_focusField.keydown(function() {
				return false;
			});
			q.heap.control_focusField.focus(function() {
				q.heap.control.removeClass('hiding').addClass('active', 300);
			});
			q.heap.control.click(function() {
				q.heap.control_focusField.focus();
				return false;
			});
			/* settings */
			$('.checkSlide').click(function() {
				var jQObj = $('.toggler', this);
				var target = String(jQObj.attr('for'));
				var apiName = target + (jQObj.hasClass('on') ? '_off' : '_on');
				if (typeof q.heap.apis[apiName] !== 'undefined') q.heap.apis[apiName].call();
				return false;
			});
			/* disable focus */
			$('.checkSlide .toggler').focus(function() {
				$(this).blur();
			});
			/* color fields */
			$('input.bgcField').change(function() {
				var jQObj = $(this);
				var target = String(jQObj.attr('for'));
				var apiName = target + '_bgc';
				if (typeof q.heap.apis[apiName] !== 'undefined') q.heap.apis[apiName].call(jQObj, jQObj.val());
				return false;
			});
			$('input.colorField').change(function() {
				var jQObj = $(this);
				var target = String(jQObj.attr('for'));
				var apiName = target + '_color';
				if (typeof q.heap.apis[apiName] !== 'undefined') q.heap.apis[apiName].call(jQObj, jQObj.val());
				return false;
			});
			/* assistive input.change feature */
			$('input[type="text"]').keyup(function(e) {
				$(this).change();
			});
		},
		function loadSettings(q) {
			q.wait();
			var race_loadSettings = SETRACE([
				'hour24',
				'weekday',
				'date',
				'bodyBGC',
				'wrapperColor'
			], q.walk);
			q.heap.apis['hour24_' + q.heap.cfgs['hourmode']](race_loadSettings.set['hour24']);
			q.heap.apis['weekday_' + q.heap.cfgs['weekdaymode']](race_loadSettings.set['weekday']);
			q.heap.apis['date_' + q.heap.cfgs['datemode']](race_loadSettings.set['date']);
			q.heap.apis['body_bgc'](q.heap.cfgs['backColor'], race_loadSettings.set['bodyBGC']);
			q.heap.apis['wrapper_color'](q.heap.cfgs['foreColor'], race_loadSettings.set['wrapperColor']);
		},
		function startGlobalClock(q) {
			/* start refreshing time */
			window.setInterval(q.heap.hlps['refreshClock'], 1000 / q.heap.cfgs['refreshRate']);
		},
		function forceResize(q) {
			q.wait()
			q.heap.hlps['resizeEM'](0, q.walk);
		},
		function enableAutoResizing(q) {
			$(window).resize(function()
			{
				if (q.heap.cfgs['resizeDelayTimer'] !== null) window.clearTimeout(q.heap.cfgs['resizeDelayTimer']);
				q.heap.cfgs['resizeDelayTimer'] = window.setTimeout(q.heap.hlps['resizeEM'], 300);
			});
		},
		function showClock(q) {
			q.wait();
			q.heap.wrapper.hide();
			q.heap.wrapper.removeClass('hidden');
			q.heap.wrapper.fadeIn(300, q.walk);
		},
		function showControl(q) {
			q.wait();
			q.heap.control.hide().removeClass('hidden').fadeIn(300, q.walk);
		},
		PQUEUE_HALT
	], 0).tick();
})(jQuery);