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
			/* initialize and/or load cfg values */
			q.heap.cfgs = {
				perfectWidth     : 120,  // em
				perfectHeight    : 60,   // em
				minWidth         : 400,  // in px
				refreshRate      : 15,   // frame per second
				updateTitle      : true, // whether update window title or not
				resizeDelayTimer : null,
				toggleTime       : 100,
				foreColorRed     : (localStorage.getItem('foreColorRed') !== null) ? parseInt(localStorage.getItem('foreColorRed'), 10) : 0,
				foreColorGreen   : (localStorage.getItem('foreColorGreen') !== null) ? parseInt(localStorage.getItem('foreColorGreen'), 10) : 0,
				foreColorBlue    : (localStorage.getItem('foreColorBlue') !== null) ? parseInt(localStorage.getItem('foreColorBlue'), 10) : 0,
				backColorRed     : (localStorage.getItem('backColorRed') !== null)  ? parseInt(localStorage.getItem('backColorRed'), 10) : 255,
				backColorGreen   : (localStorage.getItem('backColorGreen') !== null)  ? parseInt(localStorage.getItem('backColorGreen'), 10) : 255,
				backColorBlue    : (localStorage.getItem('backColorBlue') !== null)  ? parseInt(localStorage.getItem('backColorBlue'), 10) : 255,
				hourmode         : localStorage.getItem('hour24') || 'off',
				weekdaymode      : localStorage.getItem('weekday') || 'off',
				datemode         : localStorage.getItem('date') || 'off',
				appMode          : localStorage.getItem('mode') || 'clock'
			};
			/* helper functions */
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
				},
				updateBackgroundColor : function (duration, callback)
				{
					if (typeof duration !== 'number') duration = 300;
					var channelR = q.heap.cfgs['backColorRed'],
						channelG = q.heap.cfgs['backColorGreen'],
						channelB = q.heap.cfgs['backColorBlue'];
					var backgroundColorString = 'rgb(' + channelR + ', ' + channelG + ', ' + channelB + ')';
					var borderColorChannelR = 255 - channelR,
						borderColorChannelG = 255 - channelG,
						borderColorChannelB = 255 - channelB;
					var borderColorString = 'rgb(' + borderColorChannelR + ', ' + borderColorChannelG + ', ' + borderColorChannelB + ')';
					q.heap.body.animate({'backgroundColor': backgroundColorString}, duration, callback);
					q.heap.control.animate({'border-color': borderColorString}, duration);
				},
				updateForeColor : function (duration, callback)
				{
					if (typeof duration !== 'number') duration = 300;
					var channelR = q.heap.cfgs['foreColorRed'],
						channelG = q.heap.cfgs['foreColorGreen'],
						channelB = q.heap.cfgs['foreColorBlue'];
					var colorString = 'rgb(' + channelR + ', ' + channelG + ', ' + channelB + ')';
					q.heap.wrapper.animate({'color': colorString}, duration, callback);
					q.heap.navigator.animate({'color': colorString}, duration);
				}
			};
			/* application interfaces */
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
				'bgc_r': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['backColorRed'] = colorValue;
					localStorage.setItem('backColorRed', colorValue);
					var slider = $('.slider[for="bgc"][channel="r"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateBackgroundColor(duration, callback);
				},
				'bgc_g': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['backColorGreen'] = colorValue;
					localStorage.setItem('backColorGreen', colorValue);
					var slider = $('.slider[for="bgc"][channel="g"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateBackgroundColor(duration, callback);
				},
				'bgc_b': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['backColorBlue'] = colorValue;
					localStorage.setItem('backColorBlue', colorValue);
					var slider = $('.slider[for="bgc"][channel="b"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateBackgroundColor(duration, callback);
				},
				'fec_r': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['foreColorRed'] = colorValue;
					localStorage.setItem('foreColorRed', colorValue);
					var slider = $('.slider[for="fec"][channel="r"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateForeColor(duration, callback);
				},
				'fec_g': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['foreColorGreen'] = colorValue;
					localStorage.setItem('foreColorGreen', colorValue);
					var slider = $('.slider[for="fec"][channel="g"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateForeColor(duration, callback);
				},
				'fec_b': function(colorValue, duration, callback)
				{
					if (typeof colorValue !== 'number') return;
					colorValue = parseInt(colorValue, 10);
					if (colorValue < 0 || colorValue > 255) return;
					q.heap.cfgs['foreColorBlue'] = colorValue;
					localStorage.setItem('foreColorBlue', colorValue);
					var slider = $('.slider[for="fec"][channel="b"]');
					if (slider.slider('value') != colorValue) slider.slider('value', colorValue);
					q.heap.hlps.updateForeColor(duration, callback);
				},
				'nav_settings': function()
				{
					q.heap.control.toggleClass('expanded', q.heap.cfgs['toggleTime']);
				}
			};
		},
		function prepareDocument(q) {
			q.heap.body = $(document.body);
			q.heap.wrapper = $('.fsc_wrapper', q.heap.body),
			q.heap.navigator = $('.modeSwitch', q.heap.body),
			q.heap.control = $('.settingsPanel', q.heap.body);
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
			
			/* navigation buttons */
			$('.nav').click(function() {
				var jQObj = $(this);
				var target = String(jQObj.attr('for'));
				var apiName = 'nav_' + target;
				if (typeof q.heap.apis[apiName] !== 'undefined') q.heap.apis[apiName].call(jQObj);
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
			/* initialize sliders */
			$('.slider').slider({
				animate: false,
				max: 255,
				min: 0,
				orientation: 'horizontal',
				value: 128,
				change: function (e, ui) {
					var jQObj = $(this);
					var apiName = String(jQObj.attr('for')) + '_' + String(jQObj.attr('channel'));
					if (typeof q.heap.apis[apiName] !== 'undefined') q.heap.apis[apiName].call(jQObj, ui.value, q.heap.cfgs['toggleTime']);
				}
			});
			/* setting done button */
			$('.settingDone').button().click(function() {
				q.heap.control.toggleClass('expanded', q.heap.cfgs['toggleTime']);
			});
		},
		function loadSettings(q) {
			q.wait();
			var race_loadSettings = SETRACE([
				'hour24',
				'weekday',
				'date',
			//	'bodyBGC_R',
			//	'bodyBGC_G',
			//	'bodyBGC_B',
			//	'wrapperColor'
			], q.walk);
			q.heap.apis['hour24_' + q.heap.cfgs['hourmode']](race_loadSettings.set['hour24']);
			q.heap.apis['weekday_' + q.heap.cfgs['weekdaymode']](race_loadSettings.set['weekday']);
			q.heap.apis['date_' + q.heap.cfgs['datemode']](race_loadSettings.set['date']);
			q.heap.apis['bgc_r'](q.heap.cfgs['backColorRed'], 0);
			q.heap.apis['bgc_g'](q.heap.cfgs['backColorGreen'], 0);
			q.heap.apis['bgc_b'](q.heap.cfgs['backColorBlue'], 0);
			q.heap.apis['fec_r'](q.heap.cfgs['foreColorRed'], 0);
			q.heap.apis['fec_g'](q.heap.cfgs['foreColorGreen'], 0);
			q.heap.apis['fec_b'](q.heap.cfgs['foreColorBlue'], 0);
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
		PQUEUE_HALT
	], 0).tick();
})(jQuery);