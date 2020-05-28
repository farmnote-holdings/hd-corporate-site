var minus = 0;
var bp = 768;
var _touchstart = ('ontouchstart' in document) ? 'touchstart' : 'mousedown';
var _touchend = ('ontouchend' in document) ? 'touchend' : 'mouseup';
var _touchmove = ('ontouchmove' in document) ? 'touchmove' : 'scroll';
var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
var isOnMouseShort = false;

//ブラウザ判定
(function(e,b,a,d){if("ontouchend" in document){d.className+=" touchevents"}else{d.className+=" no-touchevents"}if("pointer-events" in document.createElement("div").style){d.className+=" pointer-events"}else{d.className+=" no-pointer-events"}if(~a.indexOf("win")){d.className+=" os-windows"}else{d.className+=" os-mac"}if((~e.indexOf("iphone")&&!~e.indexOf("ipad"))||~e.indexOf("ipod")){d.className+=" os-iOS"}if(~e.indexOf("android")){d.className+=" os-android"}if(!~e.indexOf("iphone")||!~e.indexOf("ipad")){d.className+=" not-apple-device"}if(~e.indexOf("ipad")){d.className+=" ipad"}if(~e.indexOf("safari")&&!~e.indexOf("chrome")){d.className+=" safari"}else{d.className+=" not-safari"}if(~e.indexOf("chrome")&&!~e.indexOf("edge")){d.className+=" chrome"}else{d.className+=" not-chrome"}var c=~e.indexOf("msie")&&!~e.indexOf("opera");if(~e.indexOf("trident/7.0")||~e.indexOf("msie")||~e.indexOf("edge")){d.className+=" ie"}else{d.className+=" not-ie"}if(c&&~b.indexOf("msie 9.")){d.className+=" ie9"}if(c&&~b.indexOf("msie 10.")){d.className+=" ie10"}if(~e.indexOf("trident/7")){d.className+=" ie11"}if(~e.indexOf("edge")){d.className+=" edge"}}(navigator.userAgent.toLowerCase(),navigator.appVersion.toLowerCase(),navigator.platform.toLowerCase(),document.documentElement));

//consoleがあるかどうかチェックし、無ければエラーを吐かないようにする
if(!window.console){window.console={log:function(a){}}};

var Common = {
	//高さや幅を揃える関数
	MutationObserver:('MutationObserver' in window)
	,
	sortElementStyle:function(targetVal/* 属性名 */, type/* 揃えるスタイル */, compareVals, i){//指定された要素とスタイルと値をそろえる関数
		//比較する要素をcompareValsに突っ込む
		compareVals = {};

		var elements = document.querySelectorAll('['+targetVal+']');
		for(i = 0; i < elements.length; i = 0|i+1){
			if(!compareVals[elements[i].getAttribute(targetVal)]){
				compareVals[elements[i].getAttribute(targetVal)] = [];
			}
			compareVals[elements[i].getAttribute(targetVal)].push(elements[i]);
		}
		//compareValsを捜査して、一番値が大きい値を、targetVal要素に設定
		for(var key in compareVals){
			(function(compareVal, i) {
				var cmp = [];
				var style = compareVal[0].currentStyle || window.getComputedStyle(compareVal[0]);
				if(type == 'width'){
					if(Common.MutationObserver) {
						(new MutationObserver(function (MutationRecords, MutationObserver) {
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientWidth);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.width = maxV + 'px';
								compareVal[i].style.WebkitTransition = '';
								compareVal[i].style.transition = '';
							}
							MutationObserver.disconnect();
						})).observe(compareVal[0], {attributes:true, attributeFilter:["class","style"]});
					}else{
						setTimeout(function(){
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientWidth);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingLeft) + parseInt(style.paddingRight));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.width = maxV + 'px';
								compareVal[i].style.WebkitTransition = '';
								compareVal[i].style.transition = '';
							}
						}, 400);
					}

					for(i = 0; i < compareVal.length; i = 0|i+1){
						compareVal[i].style.width = 'auto';
						compareVal[i].style.WebkitTransition = 'none';
						compareVal[i].style.transition = 'none';
					}
				}else if(type == 'height'){
					if(Common.MutationObserver) {
						(new MutationObserver(function (MutationRecords, MutationObserver) {
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientHeight);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingTop) + parseInt(style.paddingBottom));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.height =  maxV + 'px';
							}
							MutationObserver.disconnect();
						})).observe(compareVal[0], {attributes:true, attributeFilter:["class","style"]});
					}else{
						setTimeout(function(){
							for(i = 0; i < compareVal.length; i = 0|i+1){
								cmp.push(compareVal[i].clientHeight);
							}
							var maxV = Math.max.apply(null, cmp);
							if(style.boxSizing != 'border-box') {
								maxV = maxV - (parseInt(style.paddingTop) + parseInt(style.paddingBottom));
							}
							for(i = 0; i < compareVal.length; i = 0|i+1){
								compareVal[i].style.height =  maxV + 'px';
							}
						}, 400);
					}

					for(i = 0; i < compareVal.length; i = 0|i+1){
						compareVal[i].style.height = 'auto';
						compareVal[i].style.WebkitTransition = 'none';
						compareVal[i].style.transition = 'none';
					}
				}
			}(compareVals[key]));
		}
		return false;
	}
	,
	setAlignElem:function(i){
		
		//PCとSP両方の高さや幅を揃える
		//一度高さや幅をリセットする
		var elements = document.querySelectorAll('[data-autowidth]');
		for(i = 0; i < elements.length; i = 0|i+1){
			elements[i].style.width = '';
		}
		var elements = document.querySelectorAll('[data-autoheight]');
		for(i = 0; i < elements.length; i = 0|i+1){
			elements[i].style.height = '';
		}
		//PCとSP両方を常時揃える処理を設定
		Common.sortElementStyle('data-autowidth', 'width');
		Common.sortElementStyle('data-autoheight', 'height');
		
		if(640 < window.innerWidth){//pc
			//SPを一度高さや幅をリセットする
			var elements = document.querySelectorAll('[data-autowidth-sp]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.width = '';
			}
			var elements = document.querySelectorAll('[data-autoheight-sp]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.height = '';
			}
			Common.sortElementStyle('data-autowidth-pc', 'width');
			Common.sortElementStyle('data-autoheight-pc', 'height');
		}else{//smart
			//PCを一度高さや幅をリセットする
			var elements = document.querySelectorAll('[data-autowidth-pc]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.width = '';
			}
			var elements = document.querySelectorAll('[data-autoheight-pc]');
			for(i = 0; i < elements.length; i = 0|i+1){
				elements[i].style.height = '';
			}
			Common.sortElementStyle('data-autowidth-sp', 'width');
			Common.sortElementStyle('data-autoheight-sp', 'height');
		}
	}
	,
	//URLパラメータを取得し配列に格納
	urlParams:(function(){
		var obj = {};
		var pair = location.search.substring(1).split('&');
		for(var i = 0; pair[i]; i++) {
			var kv = pair[i].split('=');
			obj[kv[0]]=kv[1];
		}

		//stat.js
		if('fps' in obj) {
			var script = document.createElement('script');
			script.onload = function() {
				var stats = new Stats();
				document.body.appendChild(stats.dom);
				requestAnimationFrame(function loop() {
					stats.update();
					requestAnimationFrame(loop)
				});
			};
			script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
			document.head.appendChild(script);
		}
		
		return obj;
	}())
	,
	setloadfileEvent:function(targets, i,j){
		var targets = document.querySelectorAll('[data-lf-area]');
		for (i = 0; i < targets.length; ++i) {
			targets[i].setAttribute('data-lf-area', '0');
			targets[i].setAttribute('data-lf-area-ok', '');
		}
		Common.inview('[data-lf-area]', function(ele){
			var w = window.innerWidth,//画面幅
				itemsLen = 0,//読み込む数
				items = ele.querySelectorAll('[data-lf]'),//読み込む要素を調査
				itemsTarget = [],//読み込む要素の対象
				itemsTargetPath = [],//読み込む要素の画像パス
				loadCounter = 0;//読み込みをカウント
			
			//読み込む対象を選択
			var checkItems = function(elem){
				if(elem.getAttribute('data-lf')) {//data-lfに読み込む画像のパスがある場合
					itemsTarget.push(elem);
					itemsTargetPath.push(elem.getAttribute('data-lf'));
					itemsLen += 1;
				}else{
					if(640 < w && elem.hasAttribute('data-lf-pc')) {//SPサイズの時　＆　PC のときの画像パスが指定されている場合
						itemsTarget.push(elem);
						itemsTargetPath.push(elem.getAttribute('data-lf-pc'));
						itemsLen += 1;
					}else if(w <= 640 && elem.hasAttribute('data-lf-sp')) {//SPサイズの時　＆　SPのときの画像パスが指定されている場合
						itemsTarget.push(elem);
						itemsTargetPath.push(elem.getAttribute('data-lf-sp'));
						itemsLen += 1;
					}else{
					}
				}
			}
			
			//調査
			for(var i = 0; i < items.length; i++) {
				checkItems(items[i]);
			}
			checkItems(ele);
			
			//カウントをチェックして全て読み込めば実行
			var checkCount = function(){
				loadCounter += 1;
				if(itemsLen <= loadCounter) {
					//読み込みエリアに１を付与
					ele.setAttribute('data-lf-area', '1');
					
					//読み込みエリアにイベント発火
					var event  = document.createEvent('CustomEvent');
					event.initCustomEvent('loadfileComplete', false, false, {});
					ele.dispatchEvent(event);
				}
			};
			
			//読み込み
			for(var i = 0; i < itemsTarget.length; i++) {
				(function(target, path, image){
					var imageLoadFunc = function(){
						switch(target.tagName){
							case 'IMG':
								target.src = image.src;
								break;
							default:
								target.style.backgroundImage = 'url('+image.src+')';
								break;
						}
						checkCount();
						this.removeEventListener("load", imageLoadFunc);
					}
					image.addEventListener("load", imageLoadFunc);
					image.src = path;
				}(itemsTarget[i], itemsTargetPath[i], new Image()));
			}
		});
		
		return targets;
	}
	,
	inview_target:[]
	,
	inview_target_fromS:[]
	,
	inview_target_toS:[]
	,
	inview_enter:[]
	,
	inview_leave:[]
	,
	inview_once:[]
	,
	inview_viewstate:[]
	,
	intersectionObserverFlg:('IntersectionObserver' in window)
	,
	pxcelValueFromObject:function(value){
		if(typeof (value) == 'string' || value instanceof String) {
			if(value.indexOf('%') != -1) {
				value = window.innerHeight * (value.split('%')[0]/100) + 'px';
			}else if(value.indexOf('px') != -1) {
				value = value;
			}else{
				value = value + 'px';
			}
		}else if(!isNaN(value)) {
			value = value + 'px';
		}else{
			value = null;
		}
		return value;
	}
	,
	inview:('IntersectionObserver' in window)?
		function(target, enter, leave, rootMargin){
			var targets;
			if(typeof target == 'string') {
				targets = document.querySelectorAll(target);
			}else if(target.length){
				targets = target;
			}else{
				targets = [];
				targets.push(target);
			}
			for(var i = 0; i < targets.length; i++) {
				(function(target) {
					(new IntersectionObserver(
						leave?
							function(entries, observer){
								if(entries[0].isIntersecting) {//見えた
									enter(entries[0].target);
								}else{//見えないとき
									leave(entries[0].target);
								}
							}
							:
							function(entries, observer){
								if(entries[0].isIntersecting) {//見えた
									enter(entries[0].target);
									observer.disconnect();
								}
							}
						,
						{threshold: [0.0, 0.01], rootMargin:(rootMargin == '0px' || rootMargin == '0' || rootMargin === null || rootMargin === undefined)?'400px':Common.pxcelValueFromObject(rootMargin)}
				 	)).observe(target);
				}(targets[i]));
			}
		}
		:
		function(target, enter, leave){
			var newIndex,
				h = window.innerHeight;
			var vals;
			if(typeof target == 'string') {
				vals = document.querySelectorAll(target);
			}else if(target.length){
				vals = target;
			}else{
				vals = [];
				vals.push(target);
			}
			for(var i = 0; i < vals.length; i++) {
				newIndex = Common.inview_target.length;
				Common.inview_target[newIndex] = vals[i];
				Common.inview_target_fromS[newIndex] = window.pageYOffset + Common.inview_target[newIndex].getBoundingClientRect().top - h;
				Common.inview_target_toS[newIndex] = Common.inview_target[newIndex].clientHeight + Common.inview_target_fromS[newIndex] + h;
				Common.inview_enter[newIndex] = enter;
				Common.inview_leave[newIndex] = leave;
				Common.inview_once[newIndex] = leave?false:true;
				Common.inview_viewstate[newIndex] = 0;
			}

			if(document.createEvent){
				setTimeout(function(){
					var b=document.createEvent("HTMLEvents");
					b.initEvent('resize',true,true);
					window.dispatchEvent(b);
					b=document.createEvent("HTMLEvents");
					b.initEvent('scroll',true,true);
					window.dispatchEvent(b);
				}, 1)
			}else{
				window.fireEvent('onresize',document.createEventObject());
				window.fireEvent('onscroll',document.createEventObject());
			}
		}
	,
	scrollFunction:[]
	,
	scrollIDs:[]
	,
	scrollFunctionLength:0
	,
	resizeFunction:[]
	,
	resizeIDs:[]
	,
	addScroll:function(func, funcID){
		Common.scrollIDs.push(funcID?funcID:'');
		Common.scrollFunction.push(func);
		Common.scrollFunctionLength = Common.scrollFunction.length;
		func(window.innerWidth, window.innerHeight, window.pageYOffset);
	}
	,
	removeScroll:function(funcID){
		if(funcID != '' && funcID != null && funcID != undefined) {
			for(var i = 0; i < Common.scrollIDs.length; i++) {
				if(Common.scrollIDs[i] == funcID) {
					Common.scrollFunction.splice(i, 1);
					Common.scrollIDs.splice(i, 1);
					break;
				}
			}
		}
	}
	,
	addResize:function(func, funcID){
		Common.resizeIDs.push(funcID?funcID:'');
		Common.resizeFunction.push(func);
		func(window.innerWidth, window.innerHeight);
	}
	,
	removeResize:function(funcID){
		if(funcID != '' && funcID != null && funcID != undefined) {
			for(var i = 0; i < Common.resizeIDs.length; i++) {
				if(Common.resizeIDs[i] == funcID) {
					Common.resizeFunction.splice(i, 1);
					Common.resizeIDs.splice(i, 1);
					break;
				}
			}
		}
	}
	,
	addLoad:function(func){
		if(document.readyState == 'complete') {
			func();
		}else{
			window.addEventListener('load', function onload(){
				func();
				window.removeEventListener('load', onload);
			});
		}
	}
};



$(function(){

	if( $(window).innerWidth()<bp ){
		minus = 0;
	}else{
		minus = 0;
	}

	/* smooth scroll */
	function smoothScroll(hash) {
		var target = $(hash).offset().top;
	
		$('body,html').stop().animate({
			scrollTop: target - minus
		}, 800, function() {
			$(this).unbind("mousewheel DOMMouseScroll");
		}).bind("mousewheel DOMMouseScroll", function() {
			$(this).queue([]).stop();
			$(this).unbind("mousewheel DOMMouseScroll");
		});
	}
	$('a[href^="#"], a[href^="' + location.pathname + '#"]').on('click', function() {
		var hash = $(this).attr("href");
		if(hash === "#"){
			return;
		}
		smoothScroll(hash);

			$(".m-gnav,.m-gnav-btn").removeClass('on');
			$(".m-mainContent").removeClass("gnavOpen");
		
		return false;
	});

	var ua = navigator.userAgent.toLowerCase();
	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);

	if (!isMobile) {

		$('a[href^="tel:"]').on('click', function(e) {
			e.preventDefault();
		});
		$('a[href^="tel:"]').css({"text-decoration":"none"});
	}
	$(".m-gnav-btn").click(function(event) {
		if($(".m-gnav").hasClass("on")){
			$(this).removeClass("on");
			$(".m-gnav,.m-header").removeClass("on");
			$(".m-mainContent").removeClass("gnavOpen");
		}else{
			$(this).addClass("on");
			$(".m-gnav,.m-header").addClass("on");
			$(".m-mainContent").addClass("gnavOpen");
		}
	});
	$(".m-gnav-close").click(function(event) {
		$(this).removeClass("on");
		$(".m-gnav,.m-header").removeClass("on");
		$(".m-mainContent").removeClass("gnavOpen");
	});

	function onScroll(){
		var winHeight = $(window).height();
		if( $(window).scrollTop() >= $(".m-recruit-mv").innerHeight()){
			$("body").addClass('scrolled');
		}else{
			$("body").removeClass('scrolled');
		}
		$(".m-h01-wrap").each(function(i){
			if( $(window).scrollTop()  + winHeight*2/3 > $(this).offset().top && $(window).scrollTop() + winHeight*1/3 < $(this).offset().top + winHeight && !$(this).hasClass('on')){
				$(this).addClass('on').dequeue();
			}
		});
		$(".m-h02").each(function(i){
			if( $(window).scrollTop()  + winHeight*2/3 > $(this).offset().top && $(window).scrollTop() + winHeight*1/3 < $(this).offset().top + winHeight && !$(this).hasClass('on')){
				$(this).addClass('on').dequeue();
			}
		});
		$(".u-onScrollAddClass").each(function(i){
			if( $(window).scrollTop()  + winHeight*2/3 > $(this).offset().top && $(window).scrollTop() + winHeight*1/3 < $(this).offset().top + winHeight && !$(this).hasClass('on')){
				$(this).addClass('on').dequeue();
			}
		});

		$(".m-recruit-message").each(function(i){
			if( $(window).scrollTop()  + winHeight*1/3 > $(this).offset().top && $(window).scrollTop() + winHeight*1/3 < $(this).offset().top + winHeight && !$(this).hasClass('on')){
				$(this).addClass('on').dequeue();
				TweenMax.to('.m-recruit-message-mask', 1, {
					y:"100%",
					ease: Power3.easeInOut, 
				});

			}
		});


		$(".m-recruit-bold-imgs").each(function(i){
			if( $(window).scrollTop()  + winHeight*2/3 > $(this).offset().top && $(window).scrollTop() + winHeight*1/3 < $(this).offset().top + winHeight && !$(this).hasClass('on')){
				$(this).addClass('on').dequeue();

				// var items = $('.m-recruit-bold-imgs-masks-item').toArray();
				// items.sort(function(){return 0.5-Math.random()});

				// TweenMax.staggerTo(items, 0.8, {
				// 	// x: "-100%",
				// 	scaleY: 0,
				// 	ease: Power3.easeOut, 
				// 	opacity: 0,
				// }, 0.03);

				TweenMax.staggerFromTo('.m-recruit-bold-imgs-item', 1, {
					opacity: 0, 
					webkitFilter:"blur(20px)", 
					scale:"0.8",
				}, { 
					opacity: 1, 
					webkitFilter:"blur(0px)", 
					scale:"1", 
					ease: Power3.easeOut, 
					delay: 0.3, 
					onComplete: function(){
						
					}
				}, 0.1);


			}
		});
	}
	onScroll();
	$(window).on({
		'resize':function(){onScroll();},
		'scroll':function(){onScroll();}
	});



	TweenMax.to('.m-recruit-mv-imgs-item', 0, {
		opacity: 0, 
		webkitFilter:"blur(20px)", 
		scale:"0.8",
	});
	TweenMax.to('.m-recruit-mv-loading', 1, {
		delay: 0.4, 
		x: "100%", 
		ease: Power3.easeInOut, 
		onComplete: homeMvStart
	});

	function homeMvStart(){
		TweenMax.staggerFromTo('.m-recruit-mv-imgs-item', 1, {
			opacity: 0, 
			webkitFilter:"blur(20px)", 
			scale:"0.8",
		}, { 
			opacity: 1, 
			webkitFilter:"blur(0px)", 
			scale:"1", 
			ease: Power3.easeOut, 
			delay: 0.3, 
			onComplete: function(){
				TweenMax.to('.m-recruit-mv-mask', 0.5, {
					delay: 0.3, 
					opacity: 0.5, 
				});
				TweenMax.to('.m-recruit-mv-logo-wave', 0.8, {
					// x: "65%",
					delay: 1, 
					"clip-path": "circle(150% at 0% 50%)",
					onComplete: function(){
						TweenMax.to('.m-recruit-mv-logo-wave, .m-recruit-mv-logo-letters', 0, {
							delay: 0, 
							opacity: 0, 
						});
						TweenMax.to('.m-recruit-mv-logo-original', 0, {
							delay: 0, 
							opacity: 1, 
						});
						TweenMax.to('.m-recruit-mv-h', 0.8, {
							delay: 0.2, 
							opacity: 1, 
						});
						$(".l-header").removeClass('off');
					}
				});
				$(".m-recruit-mv-logo-letters").addClass('on');
				
			}
		}, 0.04);

	}


});

