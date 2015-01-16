//Request animation frame polyfill
!function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();


/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);

if (jQuery('.home-bg-image').data('background')) {
	jQuery(".home-bg-image").backstretch(jQuery('.home-bg-image').data('background'));
}
else {
	jQuery(".home-bg-image").backstretch("http://placehold.it/1440x900");
}

var click = 'click';
if ($.browser.windowsMobile === true) {
	if (window.navigator.pointerEnabled) {
		click = "pointerdown";
	} else if (window.navigator.msPointerEnabled) {
		click = "MSPointerDown";
	}
}
else if($.browser.mobile === true) {
	click = 'touchend';
}

// (function($){
// "use strict";

// Change lat long to your location. You can add multiple markers.
var sites = [['Berg Restaurant', 51.104411, 17.01300, 1]];

$(document).ready(function() {
	"use strict";
	$('.loading-wrapper img').imagesLoaded(function() {
		$(this).addClass('ready');
	});

	$('.image-subnav').next('.subnav').addClass('hidden');
	
	removePadding();

	home.init();
	navbar.init();
	mobileNav.show();
	subnav.show();
	blog.init();
	unveil.init();
	reviews.init();
	gallery.init();
	menu.init();
	overlay.init();
	
	// $(".player").mb_YTPlayer();

	var players = [];

	$(".player").each(function(i, el) {
		var player = {};
		$(el).mb_YTPlayer();
		player.el = $(el);
		player.container = $(el).parent();
		if(!mobile && !ipad) {
			player.container.find(".video-controls .pause").click(function() {
				player.el.pauseYTP();
				player.container.find(".video-controls .pause").addClass('hidden');
				player.container.find(".video-controls .play").removeClass('hidden');
			});

			player.container.find(".video-controls .play").click(function() {
				player.el.playYTP();
				player.container.find(".video-controls .play").addClass('hidden');
				player.container.find(".video-controls .pause").removeClass('hidden');
			});

			player.container.find(".video-controls .fullscreen").click(function() {
				player.el.fullscreen();
			});
		} else {
			var url = player.el.data("property");
			var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);
			if (url.match(regex) )
			{
				url = url.match(regex);
				player.container.find(".video-controls .play").removeClass('hidden').click(function() {
					window.open(url, '_blank');
				});
			}
			player.container.find(".video-controls .pause").addClass('hidden');
			player.container.find(".video-controls .fullscreen").addClass('hidden');
		}
	});

	if(!mobile && !ipad) {
		$(".homepage .pause").click(function() {
			$(".homepage .player").pauseYTP();
			$(".homepage .pause").addClass('hidden');
			$(".homepage .play").removeClass('hidden');
		});

		$(".homepage .play").click(function() {
			$(".homepage .player").playYTP();
			$(".homepage .play").addClass('hidden');
			$(".homepage .pause").removeClass('hidden');
		});

		$(".homepage .fullscreen").click(function() {
			$(".player").fullscreen();
		});
	} else {
		var url = $('.homepage .player').data("property");
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		if (url && url.match(regex) )
		{
			url = url.match(regex);
			$(".homepage .play").removeClass('hidden').click(function() {
				window.open(url, '_blank');
			});
		}
		$(".homepage .pause").addClass('hidden');
		$(".homepage .fullscreen").addClass('hidden');
	}
	
	$('.to-the-top').click(function(e) {
		e.preventDefault();
		$('body').velocity("scroll", { duration: 1000});
	});
});

function repositionPicker() {
	if($('#mobile-select').length > 0 && $('#rtb-time').length > 0) {
		$('#mobile-select').css('top', $('#rtb-time').offset().top);
		$('#mobile-select').css('left', $('#rtb-time').offset().left);
		$('#mobile-select').css('width', $('#rtb-time').outerWidth());
		$('#mobile-select').css('height', $('#rtb-time').outerHeight());
	}
}

$(window).load(function() {
	"use strict";
	if(!ipad && !mobile) {
		$('#rtb-time_root').addClass('desktop-version');

	} else {
			
		if($('#rtb-time').length > 0) {
			if($.browser.ios === true && !ipad) {
				var $input = $('#rtb-date').pickadate();

				var picker = $input.pickadate('picker');
				picker.on({
					open: function() {
						$('.content-wrapper').hide(0);
						$("html").velocity("scroll", { offset: -100 }).velocity("scroll", { offset: 0 });
					},
					close: function() {
						$('.content-wrapper').show();
						repositionPicker();
					},
				});
			}
			

			$('body').append('<div id="mobile-select" style="opacity: 0; position: absolute; background: red; width: 100px; z-index: 20; "><select id="time-select" style="width: 100%; height: 100%; -webkit-appearance:none; "></select></div>');

			repositionPicker();

			$(window).on('resize', $.debounce( 100, function(){
				repositionPicker();
			}));

			$('.picker--time .picker__list-item').each(function(i, el){
				$('#time-select').append('<option value="'+$(el).data('pick')+'">'+$(el).html()+'</option>');
			});

			$( "#time-select" ).on('change', function () {
				var str = "";
				var curr;
				$( "select option:selected" ).each(function() {
					str += $( this ).text() + " ";
					curr = $(this).val();
				});
			
				$( "#rtb-time" ).val(str);
				var picker = $('#rtb-time').pickatime('picker');
				picker.set('select', parseInt(curr,10));
			});
		}

	}
	stickyHeaders.bind();
	homeSlider.init();

	if ($('#preloader').length > 0) {
		$('#preloader').delay(1300).velocity({opacity: 0}, 500, function() {
			$(this).hide();
			animate_elements();
		});
	} else {
		animate_elements();
	}

	rating.init();
	menuCarousel.init();
	footer.init();

});

function removePadding() {
	if($('.no-intro-padding').length > 0) {
		$('.no-intro').removeClass('no-intro');
	}
}

function animate_elements() {
	if (!ipad && !mobile) {
		if ($.waypoints) {
			var $obj=$('.yo-anim').each(function() {
				var delay=$(this).data('animation-delay');
				$(this).waypoint(function() {
					if (delay) {
						var $this=$(this);
						setTimeout(function() {
							$this.addClass('yo-anim-start');
						}, delay);
					} else {
						$(this).addClass('yo-anim-start');
					}
				}, {
					offset: '90%',
					triggerOnce: true
				});
			});
		}
	} else {
		$('.yo-anim').removeClass('yo-anim');
	}
}

var backgroundParallax = {
	init: function() {
		if ($('.parallax-layer').length > 0) {
			$('.home-parallax').parallaxify({
				parallaxBackgrounds: false,
				parallaxElements: true,
				alphaFilter: 0.9,
				positionProperty: 'transform',
			});
		}
	}
};

var unveil = {
	init : function() {
		$(".unveil img").unveil(-50, function() {
			$(this).load(function() {
				$(this).parents('.unveil').addClass('loaded');
			});
		});
	},
};

var overlay = {
	oldScroll : 0,
	newScroll : 0,

	init: function() {
		var that = this;
		if(click == 'MSPointerDown') {
			$('body').on('click', '.open-overlay', function(e) {
				e.preventDefault();
			});
		}
		$('body').on(click, '.open-overlay', function(e) {
			e.preventDefault();
			that.oldScroll = $(window).scrollTop();
			var id = $(this).data('postId');
			that.open(id);
			
		});
	},

	open: function(id) {
		var that = this;

		$('.berg-overlay').show();
		var url = ajaxurl;
		$.post(url, { action : 'berg_load_single_portfolio', data : { 'id' : id}}, function(response) {
			$(window).on('resize.overlay', $.debounce( 400, function(){
				that.resize();
			}));
			
			$('.berg-overlay').html(response);
			
			that.carousel();

			$('.berg-overlay-background').velocity({ opacity: 1 }, { display: "block", complete: function(){
				that.resize();
				$('.berg-overlay').velocity({'opacity': 1}, function(){
					$(window).scrollTop(0);
					$('body').addClass('berg-overlay-active');
					$('.berg-overlay-container').delay(100).velocity({'opacity': 1}, function(){});
				});
			}});

		}, 'html');
	},
	close: function() {
		var that = this;
		$('body').removeClass('berg-overlay-active');
		$(window).off('resize.overlay');
		$('body').removeClass('berg-overlay-active');
		$('.berg-overlay-container').delay(100).velocity({ opacity: 0 }, { complete: function(){
			$(window).scrollTop(that.oldScroll);
			$('.berg-overlay-background').velocity({ opacity: 0 }, { display: "none", complete: function(){
				$('.berg-overlay').velocity({'opacity': 0}, {duration: 0});
			}});
		}});

		setTimeout(function() {
			$('.berg-overlay').hide();
			$(window).resize();
		}, 600);
	},

	resize: function() {
		$('.berg-overlay-gallery-wrapper').height($(window).height() - $('.berg-overlay-header').outerHeight());
		$('.berg-overlay-carousel .owl-item img').each(function(i, el) {
			$(el).parent().imagesLoaded(function() {
				if(el.offsetWidth !== 0) {
					$(el).css('margin-left', - (el.width / 2));
				}
				if(el.offsetHeight !== 0) {
					$(el).css('margin-top', - (el.height / 2));
				}
				$(el).parent().addClass('loaded');
			});
		});
	},

	carousel: function() {
		var that = this;
		var owl = $('.berg-overlay-carousel');
		var loop = true;

		if ($(owl).find('.item').length === 1) {
			loop = false;
			$('.berg-overlay .controls').addClass('hidden');
		}

		owl.owlCarousel({
			video: true,
			videoWidth: false,
			videoHeight: false,
			items: 1,
			loop: loop,
			merge: false,
			nav: true,
			slideSpeed: 2000,
			dots: false,
			startPosition: 0,
			callbacks: true,
			navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			responsiveClass: false,
			onInitialized: function() {
				// this._plugins.navigation._controls.$container.prependTo($(".controls"));
				// if ($(owl).find('.item').length === 1) {
					// $('.controls').hide();
				// }
				$('.arrow-right').on(click, function(){
					owl.trigger('next.owl.carousel');
				});
				$('.arrow-left').on(click, function(){
					owl.trigger('prev.owl.carousel');
				});
				$('.berg-overlay-close').on(click, function(e) {
					e.preventDefault();
					that.close();

				});

				$('.berg-overlay-to-bottom .btn').click(function() {
					var offsetHeight = (($(".berg-overlay-gallery-wrapper").height())+($(".berg-overlay-header").height()));
					$("html").velocity("scroll", { offset: offsetHeight + 60 })
				});

				$('.berg-overlay-carousel .owl-item img').each(function(i, el) {
					$(el).parent().imagesLoaded(function() {
						if(el.offsetWidth !== 0) {
							$(el).css('margin-left', - (el.width / 2));
						}
						if(el.offsetHeight !== 0) {
							$(el).css('margin-top', - (el.height / 2));
						}
						$(el).parent().addClass('loaded');
					});
				});
				$('.owl-video-wrapper').addClass('loaded');
			},
		});
	},
}

var menuCarousel = {
	init : function() {
		var owl = $('.berg-product-carousel');
		var current = '';
		var curr = 1;
		var animating = '';
		var that = this;
		owl.owlCarousel({
			video: true,
			videoWidth: false,
			videoHeight: false,
			items: 1,
			loop: false,
			merge: false,
			nav: false,
			slideSpeed: 2000,
			dots: false,
			startPosition: 0,
			callbacks: true,
			navText: ['', ''],
			responsiveClass: false,
			onInitialized: function() {
				this.e._onResize();
			},
			onChanged: function(event) {
				if(animating == 'secondAnimating')
					return false;
				current = owl.data('owlCarousel');	
				if(current !== undefined) {
					$('.active-item').removeClass('active-item');
					animating = 'firstAnimating';
					current = current.current();
					owlSmall.trigger('to.owl.carousel', [current, 200, 1]);
					animating = '';
				} 
				that.setActive();
				
			}
		});

		var owlSmall = $('.berg-product-carousel2');
		owlSmall.owlCarousel({
			video: true,
			videoWidth: false,
			videoHeight: false,
			items: 4,
			loop: false,
			merge: false,
			nav: false,
			slideSpeed: 2000,
			dots: false,
			startPosition: 0,
			callbacks: true,
			responsiveClass: false,
			navText: ['', ''],
			onInitialized: function() {
				this.e._onResize();
				that.setActive();
			},

			onChanged: function(event) {
				if(animating == 'firstAnimating')
					return false;			

				current = owlSmall.data('owlCarousel');	
				if(current !== undefined) {
					animating = 'secondAnimating';	
					current = current.current();
					owl.trigger('to.owl.carousel', [current, 200, 1]);

					that.setActive();
				}
			},
			onTranslated: function(){
				animating = '';
			}		
		});
		owlSmall.on('click', '.owl-item', function(){

			owl.trigger('to.owl.carousel', [$(this).index(), 200, 1]);
			owl.trigger('refresh.owl.carousel');
		})

	},

	setActive : function(){
		var owl = $('.berg-product-carousel');
		var owlSmall = $('.berg-product-carousel2');
		var current = 1;
		if(owl.data('owlCarousel')) {
			current = owl.data('owlCarousel').current();
		}
		$('.active-item').removeClass('active-item');
		$('.berg-product-carousel2').find('.owl-item:eq('+current+')').addClass('active-item');

	},
}


var prefix = (function () {
	var styles = window.getComputedStyle(document.documentElement, ''),
	pre = (Array.prototype.slice
		.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
	dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	return {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
})();


function bindResizeIntro(){
	if($('.section-intro').length > 0) {
		var height = $(window).height();
		if($('.section-intro').hasClass('section-intro-half'))
			height = height / 2;
		$('.section-intro').height(height + 10);
		$('.section-space').height(height);

		$(window).on('resize.intro', function(){
			height = $(window).height();
			if($('.section-intro').hasClass('section-intro-half'))
				height = height / 2;			
			$('.section-intro').height(height + 10);
			$('.section-space').height(height);
		});
	}
}
function unbindResizeIntro(){
	$(window).off('resize.intro');
	setTimeout(function(){
	   $('.section-intro').css('height', 'auto');
	},50)	
}


var $transform = prefix['js']+'Transform';


(function() {
	'use strict';
	var parallaxElement = $('.section-intro-parallax')[0]
	var speedFactor1 = 0.2;
	var speedFactor2 = 0.1;
	var speedFactor3 = 0.15;
	var opacity = 100;
	var height = $(window).height()/2;
	opacity = (height / opacity);
	opacity = (1 / opacity)/100;
	var newOpacity = 0;
	var bgOpacity = 0;
	var $parallaxElement1 = $('.parallax-element-first');
	var $parallaxElement2 = $('.parallax-element-second');
	var $img = $('.section-intro');
	var firstTop = 0;
	var $bg = '';
	var startOpacity = $img.data('opacityStart') / 100;
	var endOpacity = $img.data('opacityEnd') / 100;

	var sectionIntro = {
		active : false,
		init : function(){
			var that = this; 
			if($('.section-intro').length === 0 || $('body').hasClass('fullpage-scroll') || $('body').hasClass('home-page'))
				return false;		
			if($('.section-intro').data('background')) {
				$(".section-intro").backstretch($('.section-intro').data('background'));
				$bg = $('.backstretch img');
			} else {
				if($('.bg-section').length > 0)
					$bg = $('.bg-section');
			}
			this.handler();
			requestAnimationFrame(this.handler);
			if($(window).width() > 991) {
				that.bindParallax();
				that.active = true;
			}

			$(window).on('resize.parallax', function(){
				if($(window).width() > 991) {
					that.bindParallax();
					that.active = true;
				} else {
					that.unbindParallax();
				}
			})
		},

		bindParallax : function() {
			requestAnimationFrame(this.handler);
			if(this.active === true)
				return false;
			var that = this;
			$(window).on('scroll.parallax', function(){
				requestAnimationFrame(that.handler);
			});
		},

		unbindParallax : function() {
			if(this.active === false)
				return false;
			$(window).off('scroll.parallax');
			this.active = false; 
			$('.parallax-element-first, .parallax-element-second').attr('style', '');
			$('.section-intro').velocity({translateY: 0}, 0)
			$('.backstretch img, .section-bg').velocity({opacity: $('.section-intro').data('opacityStart') / 100}, 0)
		},

		handler : function(){
			var that = this;
			var pos = $(window).scrollTop();

			if(pos > height) {
				newOpacity = 0;
			} else {
				newOpacity = 1 - (opacity*pos);
			}

			if(endOpacity > startOpacity) {
				bgOpacity = startOpacity + (opacity * pos);
				if(bgOpacity >= endOpacity)
					bgOpacity = endOpacity;
			} else {
				bgOpacity = startOpacity - (opacity * pos);
				if(bgOpacity <= endOpacity)
					bgOpacity = endOpacity;
			}
			
			$img[0].style[$transform] = "translateY("+ Math.round((firstTop - pos) * speedFactor1) + "px) translateZ(0px)";

			if($parallaxElement1[0] !== undefined) {
				$parallaxElement1[0].style[$transform] = "translateY("+ Math.round((firstTop - pos) * speedFactor2) + "px) translateZ(0px)";
				$parallaxElement1[0].style['opacity'] = newOpacity;
			}

			if($parallaxElement2[0] !== undefined) {
				$parallaxElement2[0].style[$transform] = "translateY("+ Math.round((firstTop - pos) * speedFactor3) + "px) translateZ(0px)";				
				$parallaxElement2[0].style['opacity'] = newOpacity;
			}
			if($bg !== '')
				$bg[0].style['opacity'] = bgOpacity;
		},
	};
	sectionIntro.init();
 }())

var menu = {
	init: function() {
		var that = this;
		$('.mixitup').velocity({opacity : 0}, 0);
		$('.mixitup').mixItUp({
			animation: {
				animateResizeContainer: true,
				effects: 'fade',
				easing: 'ease',
			},
			layout: {
				display: 'block'
			},
			load: {
				filter: document.location.hash === '' ? 'all' : ('.' + document.location.hash.substring(1))
			},
			callbacks: {
				onMixEnd: function(state, futureState) {
					that.lazyLoad();
				},
				onMixStart: function(state, futureState) {
					document.location.hash = futureState.activeFilter.substring(1);				
				},
				onMixLoad: function(state, futureState) {
					that.lazyLoad();
					if (document.location.hash !== '#mix') {
						if($('.section-intro').length > 0)
							$('.section-scroll').velocity('scroll', 1000);
					}

					window.onhashchange = function() {
						$('.mixitup').mixItUp('filter', ('.' + document.location.hash.substring(1)));
					};

					if ($('.mixitup').hasClass('no-images')) {

						that.show();
						that.resize();
					}
					$('.mixitup').velocity({opacity : 1});
				}
			}
		});
	},
	lazyLoad: function() {
		$('.mixitup').find('.mix:visible .menu-item').each(function() {
			var $t = $(this),
			$img = $(this).find('img'),
			src = $img.attr('data-src');

			$img.on('load',function() {
				imgLoaded($img);
			});

			if (!$img.hasClass('lazyloaded')) {
				$img.attr('src',src).addClass('lazyloaded');
			}
		});
	},
	show: function() {
		var state = $('.mixitup').mixItUp('getState');
		var $content = $('.main-section');
		$('#second-menu .mixitup .menu-item').height($(state.activeFilter + ' .menu-item').width());
		
		// $content.velocity({ minHeight : $('.mixitup').outerHeight()+$('.list-category').height() }, { duration : 0});
	},
	resize: function(el) {
		var that = this;
		$(window).on('resize.menu', function(){
			that.show();
		});
	},
	destroy: function() {
		$(window).off('resize.menu');
		$('#second-menu .menu-item').height('auto');
	}
};

$('body').on('intro-end', function() {
	unveil.init();
	navbar.open();
});

var navbar = {
	wrapper: $('body'),

	init: function() {
		var that = this;
		$('.main-reorder').on(click, function(e) {
			e.preventDefault();
			if (that.wrapper.hasClass('show-nav')){
				that.close();
			} else {
				that.open();
			}
		});
	},
	open: function() {
		var that = this;
		that.wrapper.addClass('show-nav');
	},
	close: function() {
		var that = this;
		that.wrapper.removeClass('show-nav');
	}
};

var	subnav = {
	show: function() {
		if(!ipad && !mobile) {
			if($('body').hasClass('home-page')) {
				var newHeight = ($(window).height() / 2) - ($('.main-nav').height() / 2) - 80;
				$('.image-subnav').height(newHeight);
				$('.image-subnav div').height(newHeight);
			}

			$('.submenu-languages').addClass('subnav-wrapper').wrap('<div class="subnav"></div>');
			$('.main-nav ul li').hover(function() {
				subnav = $(this).find('.subnav-wrapper');
				var newPos = $(this).offset().left - subnav.width() / 2 + $(this).width() / 2 + 15;
				var adjustment = 0;

				if (newPos + subnav.width() > $(window).width()) {
					adjustment = newPos + subnav.width() - $(window).width();
				}
				if (newPos < 0) {
					newPos = 0;
				}
				subnav.css('left', newPos - adjustment);
			});
		} else {
			$('.main-nav > ul > li').addClass('touch-inactive');
			$('.main-nav').on(click, '.touch-inactive', function(e){
				e.preventDefault();
				$('.main-nav > ul > li.touch-active').removeClass('touch-active').addClass('touch-inactive');
				$(this).addClass('touch-active').removeClass('touch-inactive');
			})
		}
	}
};

var mobileNav = {
	show: function() {
		this.open();
		this.close();
	},
	open: function() {
		$('.reorder a').on(click, function(e) {
			e.preventDefault();
			if ($('body').hasClass('mobile-nav-show')) {
				$(this).parent().removeClass('flyout-open');

				$('.flyout-container').velocity({height: 0}, { complete: function() {
					$('.flyout-container .open').css('height', 0).removeClass('open');
					$('.flyout-container .subnav-open').removeClass('subnav-open');
				}});
				$('body').removeClass('mobile-nav-show');
			} else {
				$(this).parent().addClass('flyout-open');
				$('.flyout-container').velocity({height: $('.flyout-container .menu > li').height() * $('.flyout-container .menu > li').length}, { complete: function() {
					$('.flyout-container').css('height', 'auto');
				}});
				$('body').addClass('mobile-nav-show');
			}
		});

		$('.flyout-container .menu-item .open-children').on(click, function(e) {
			e.preventDefault();
			var that = this;

			if ($(this).next('.subnav-wrapper').length > 0) {
				//has submenu
				if ($(this).next('.subnav-wrapper').hasClass('open')) {

					$(this).parent().removeClass('subnav-open');

					$(this).next('.subnav-wrapper').velocity({height: 0}, { complete: function() {
						$(that).next('.open').removeClass('open');
						$(that).next('.subnav-wrapper').find('.open').css('height', 0).removeClass('open');
						$(that).next('.subnav-wrapper').find('.subnav-open').removeClass('subnav-open');
					}});
				} else {
					$(this).parent().addClass('subnav-open');
					$(this).next('.subnav-wrapper').velocity({height: $(this).next('.subnav-wrapper').children('li').height() * $(this).next('.subnav-wrapper').children('li').length}, { complete: function() {
						$(that).next('.subnav-wrapper').css('height', 'auto').addClass('open');
					}});
				}
			}
		});
	},
	close: function() {
		$('.flyout-container .menu-item a').on('click', function() {
			// e.preventDefault();
			var that = this;
			
			$(".flyout-container .menu-item .open-children").parent().removeClass('subnav-open');
			$('.flyout-container').velocity({height: 0}, { complete:  function() {
				$('.flyout-container .open').css('height', 0).removeClass('open');
				$('body').removeClass('mobile-nav-show');
			}});
		});
	},
};

var verticalSlider = {
	init: function() {
		if ($('body').hasClass('fullpage-scroll')) {
			$('#restaurant').fullpage({
				easing :'swing',
				scrollingSpeed: 500,
				css3: true,
				resize: false,
				autoScrolling: true,
				paddingTop: 0,
				paddingBottom: 0,
				normalScrollElementTouchThreshold: 1,
				verticalCentered: false,
				navigation: true,
				navigationPosition: 'right',
				onLeave: function(index, nextIndex, direction){
					var current = index-1;
					if(mobile || ipad)
						return;
					if($('.item:eq('+current+') .player').length > 0) {
						$('.item:eq('+current+') .player').pauseYTP();
						$('.item:eq('+current+')').find(".video-controls .pause").addClass('hidden');
						$('.item:eq('+current+')').find(".video-controls .play").removeClass('hidden');
					}
				},
				afterLoad: function(anchorLink, index){
					var current = index-1;
					if(mobile || ipad)
						return;
					if($('.item:eq('+current+') .player').length > 0) {
						$('.item:eq('+current+') .player').playYTP();
						$('.item:eq('+current+')').find(".video-controls .pause").removeClass('hidden');
						$('.item:eq('+current+')').find(".video-controls .play").addClass('hidden');
					}
				},
			});
		};
		if ($('.fp-section').length > 1){
			$('#fp-nav').show();
		} else { 
			$('#fp-nav').hide();
		}
	},

	destroy: function(){
		if($.fn.fullpage.destroy !== undefined)
			$.fn.fullpage.destroy('all');
	},
};

var footer = {
	init: function() {
	   this.resize();
	   $(window).on('resize', function(){
		   footer.resize();
	   });
	},
	resize: function() {
	   $('#footer-spacer').height($('#footer').outerHeight());
	}    
};

var gallery = {
	page: 2,
	init: function() {
		var that = this;
		var first = true;
		$('.gallery-content').mixItUp({
			animation: {
				animateResizeContainer: true,
				effects: 'fade',
				easing: 'ease',
			},
			layout: {
				display: 'inline-block'
			},
			callbacks: {
				onMixEnd: function(){
					that.lazyLoad();
				},

			}
		});
		$('#gallery').on(click, '.load-more-text button, .load-more-text span', function(e) {
			e.preventDefault();
			that.loadMore();
		});
	},
	lazyLoad: function() {
		$('#gallery').find('.mix:visible').each(function() {
			var $t = $(this),
				$img = $(this).find('img'),
				src = $img.attr('data-src');

			$img.on('load',function() {
				imgLoaded($img);
			});

			if (!$img.hasClass('lazyloaded')) {
				$img.attr('src',src).addClass('lazyloaded');
			}
		});
	},
	loadMore: function() {
		var that = this;
		var url = ajaxurl;

		if (url === '' || url === undefined) {
			return false;
		}

		$.post(url, { action : 'berg_load_more_portfolio', data : { 'pageId' : pageId, 'page' : that.page }}, function(response) {
			$('.new-content').html(response);
			if($('.new-content .load-more').length > 0) {
				$('#gallery > .load-more').replaceWith($('.new-content .load-more'));

			} else {
				$('#gallery > .load-more').remove();
			}

			$('.gallery-content').mixItUp('append', $('.new-content .mix'));
				that.page = that.page + 1;
				if(that.page > $('.gallery-content').data('pages')) {
					$('.load-more-text button, .load-more-text span').html(translation.no_more_posts);
					$('#blog, #blog2').off(click, '.load-more-text button, .load-more-text span');
				}
		}, 'html');

		return true;
	}
};

var blog = {
	page: 2,
	init: function() {
		var that = this;
		$('.load-post').removeClass('load-post');
		$('#blog, #blog2').on(click, '.load-more-text button, .load-more-text span', function(e) {
			e.preventDefault();
			that.loadMore();

		});
	},
	loadMore: function() {
		var that = this;
		var url = ajaxurl;

		// if ($('#blog.blog-content .load-more').length > 0) {
		// 	url = $('#blog.blog-content .load-more').data('href');
		// }

		if (url === '' || url === undefined) {
			return false;
		}

		$.post(url, { action : 'berg_load_more_posts', data : { 'pageId' : pageId, 'page' :that.page } },function(response) {
			that.add(response);

		}, 'html');

		return true;
	},
	add: function(response) {
		var that = this;
		var oldHeight = $('#blog-content-append').height();

		$('#blog-content-append').height(oldHeight);
		
			// $(this).remove();
			$('#blog-content-append').append(response);
			$('#blog-content-append .load-post').imagesLoaded(function() {
				var newHeight = 0;
				$('.load-post').each(function(i, el) {
					newHeight += $(el).height();
				});

				$('#blog-content-append').velocity({height : oldHeight + newHeight }, { complete : function() {
					$.waypoints('refresh');

					setTimeout(function() {
						$('#blog-content-append .load-post').removeClass('load-post');
						$('#blog-content-append').height('');
						that.page = that.page + 1; 
						if(that.page > $('#blog-content-append').data('pages')) {
							$('.load-more-text button, .load-more-text span').html(translation.no_more_posts);
							$('#blog, #blog2').off('click', '.load-more-text button, .load-more-text span');
						}
					}, 400);

					$(".unveil img").unveil(-50, function() {
						$(this).load(function() {
							$(this).parents('.unveil').addClass('loaded');
						});
					});

				}});
			});
		
	}
};

var home = {
	init: function() {
		this.resize();
		var that = this;
		$(window).resize(function(){
			that.resize();
		});
		
	},

	resize: function() {
		$('.mobile-homepage').css('min-height', $('body').height() - $('#mobile-nav').height());
		if (mobile) {
			return;
		}
		$('.main-section .basic-info').parent().css('min-height', $(window).height() );
		$('.main-section .basic-info').css('margin-top', ($(window).height() / 2) + 40);
		if($('body').hasClass('nav-center')) {
			$('#main-navbar').css('top', ($(window).height() / 2));
		}
	}

}

var homeSlider = {
	init: function() {
		if (mobile) {
			return;
		}

		if($('#slides').length === 0)
			return;

		var sliderInfinite = false;

		$.fn.superslides.fx = $.extend({
			fadeTransition: function(orientation, complete) {
				var that = this,
				$children = that.$container.children(),
				$outgoing = $children.eq(orientation.outgoing_slide),
				$target = $children.eq(orientation.upcoming_slide);

				$target.css({
					left: this.width,
					opacity: 1,
					display: 'block'
				});

				// $('.slides-text li:eq('+orientation.outgoing_slide+') .slide-content-wrapper').removeClass('current-slide');
				// $('.slides-text li:eq('+orientation.upcoming_slide+') .slide-content-wrapper').addClass('current-slide');

				$target.velocity({scale:1},0);

				if (orientation.outgoing_slide >= 0) {
					$outgoing.velocity({
						opacity: 0,
						scale: 1.5,
					},
					that.options.animation_speed,
					function() {
						if (that.size() > 1) {
							$children.eq(orientation.upcoming_slide).css({
								zIndex: 2
							});

							if (orientation.outgoing_slide >= 0) {
								$children.eq(orientation.outgoing_slide).css({
									opacity: 1,
									display: 'none',
									zIndex: 0
								});
							}
						}

						complete();
					});
				} else {
					$target.css({
						zIndex: 2
					});
					complete();
				}
			}
		}, $.fn.superslides.fx);

		$('#slides').superslides({
			animation: 'fadeTransition',
			animation_speed: 2000,
			play: slideDuration,
			inherit_height_from: 'body',
		});

		$('#arrow-right').click(function(e) {
			e.preventDefault();
			$('#slides').superslides('animate', 'next');
		});

		$('#arrow-left').click(function(e) {
			e.preventDefault();
			$('#slides').superslides('animate', 'prev');
		});
		$(window).resize();
	}
};

var reviews = {
	init: function() {
		var that = this;
		var owl = $("#reviews-carousel");
		var loop = true;
		if ($('#reviews-carousel').find('.item').length === 1) {
			loop = false;
		}

		owl.owlCarousel({
			items: 1,
			loop: loop,
			margin:10,
			nav:true,
			autoplay:true,
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			autoplaySpeed: 1500,
			navText: ['<i class="icon-arrow-left"></i>', '<i class="icon-arrow-right"></i>'],
			dots: false,
			onInitialized: function() {
				var controls = owl.find('.owl-controls');
				controls.prependTo($(".controls-reviews"));
			},
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
	}
};

var rating = {
	init: function() {

		this.initStars();

		var ratingWidth = $('.rating-select span').width();
		var step = ratingWidth / 5;

		$('.rating-select').mousemove(function(e) {
			var x = e.pageX -  $(this).offset().left;
			x = Math.ceil(x / step) * step;
			$('.rating-select span span').width(x);
			$(this).data('rating', x/step);
		});

		$('.rating-select').mouseleave(function(e) {
			var newWidth = $(this).find('select').val();
			$('.rating-select span span').width(newWidth*step);
		});

		$('.rating-select').click(function(e) {
			e.preventDefault();
			$(this).find('select').val($(this).data('rating'));
		});
	},

	initStars: function() {
		$('.star-rating').each(function(i, el){
			$(el).find('span').wrap('<span></span>');
			$(el).find('span span').html('');
		})
	}
};

$("#comments-form").submit(function(e) {
	$('#comments-form .form-control').removeClass('#comments-form message-error');
	$.post("comments-send.php", $('#comments-form').serialize(), function(data) {
		if (data.status === 'ok') {
			$("#comments-form .message-success").removeClass('hidden').velocity({ opacity : 1 });
			$("#comments-form .button-submit").addClass('button-transparent');
			$('#comments-form .form-control').val('');

			setTimeout(function() {
				$("#comments-form .message-success").velocity({ opacity : 0 }, function() {
					$(this).addClass('hidden');
				});
				$("#comments-form .button-submit").removeClass('button-transparent');
			}, 3000);
		} else {
			$.each(data.errors, function(i, e) {
				$('.' + i).addClass('#comments-form message-error');
			});
		}
	}, 'json');
	e.preventDefault();
});

$("#comments-form").on('keyup', '.contact-form', function() {
	var that = this;
	if ($(this).val() !== '') {
		$(this).removeClass('message-error');
	} else {
		$(that).addClass('message-error');
	}
});

$("#reviews-form").submit(function(e) {
	$('#reviews-form .form-control').removeClass('#reviews-form message-error');
	$.post("reviews-send.php", $('#reviews-form').serialize(), function(data) {
		if (data.status === 'ok') {
			$("#reviews-form .message-success").removeClass('hidden').velocity({ opacity : 1 });
			$("#reviews-form .button-submit").addClass('button-transparent');
			$('#reviews-form .form-control').val('');
			setTimeout(function() {
				$("#reviews-form .message-success").velocity({ opacity : 0 }, function() {
					$(this).addClass('hidden');
				});
				$("#reviews-form .button-submit").removeClass('button-transparent');
			}, 3000);
		} else {
			$.each(data.errors, function(i, e) {
				$('.' + i).addClass('#reviews-form message-error');
			});
		}
	}, 'json');
	e.preventDefault();
});

$("#reviews-form").on('keyup', '.contact-form', function() {
	var that = this;
	if ($(this).val() !== '') {
		$(this).removeClass('message-error');
	} else {
		$(that).addClass('message-error');
	}
});

$(document).on("submit", "#contact-form", function(e) {
	e.preventDefault();
	$('#contact-form .message-error').removeClass('message-error');

	$.ajax({
		url: 'contact-send.php',
		type: 'POST',
		dataType: 'json',
		data: $('#contact-form').serialize(),

	}).done(function(responseData) {
		if(responseData.status === 'success') {
			$("#contact-form .message-success").removeClass('hidden').velocity({ opacity : 1 });
			$("#contact-form .button-submit .button-send").addClass('button-transparent');
			$('#contact-form input, #contact-form textarea').val('');
			setTimeout(function() {
				$("#contact-form .message-success").velocity({ opacity : 0 }, function() {
					$(this).addClass('hidden');
				});
				$("#contact-form .button-submit .button-send").removeClass('button-transparent');
			}, 3000);
		} else {
			$.each(responseData.errors, function(i, field) {
				$('#contact-'+field).addClass('message-error');
			});
		}
	}).fail(function() {
		// handle server fail here
	});
});

$('body').on('added_to_cart', function(e) {
	$('.shipping-cart-count').addClass('bounce-light animated');
	if(mobile || ipad || $(window).width() < 991) {
		$('#mobile-added-to-cart').show(0).velocity({opacity: 1}).delay(2000).velocity({opacity:0});
	}
})

$(document).on("submit", "#date-reservation-form", function(e) {
	e.preventDefault();
	$('#date-reservation-form .message-error').removeClass('message-error');

	$.ajax({
		url: 'reservation-send.php',
		type: 'POST',
		dataType: 'json',
		data: $('#date-reservation-form').serialize(),
	}).done(function(responseData) {
		if(responseData.status === 'success') {
			$("#date-reservation-form .message-success").removeClass('hidden').velocity({ opacity : 1 });
			$("#date-reservation-form .button-submit .button-send").addClass('button-transparent');
			$('#date-reservation-form input, #date-reservation-form textarea').val('');

			setTimeout(function() {
				$("#date-reservation-form .message-success").velocity({ opacity : 0 }, function() {
					$(this).addClass('hidden');
				});
				$("#date-reservation-form .button-submit .button-send").removeClass('button-transparent');
			}, 3000);
		} else {
			$.each(responseData.errors, function(i, field) {
				$('#reservation-'+field).addClass('message-error');
			});
		}
	}).fail(function() {
		// handle server fail here
	});
});

$(document).on('click', '.refresh-captcha', function(e) {
	e.preventDefault();
	$('#captcha').attr('src', 'inc/securimage/securimage_show.php?' + Math.random());
});

var sticked = [];
var stickyHandler = function(){
	$.each(sticked, function(index, stickedHeader) {
		var pos = $(window).scrollTop();
		var element = stickedHeader.element;
		var child = stickedHeader.child;

		if($(element).offset().top <= pos + 80) {
			child.addClass('is_stuck');
		} else {
			child.removeClass('is_stuck')
		}
	});
};

var stickyHeaders = {
	sticky: false,

	bind: function() {
		if(stickyHeaders === false || mobile)
			return;		
		if(this.sticky === false) {
			this.sticky = true;
			$('.woo-fixed').each(function(i, el){
				var header = {};
				header.element = el;
				header.child = $(el).find('.list-category');
				sticked.push(header);

				if(sticked[i-1]) {
					sticked[i-1].sibling = el;
				}
			})
			window.requestAnimationFrame(stickyHandler);
			$(window).on('scroll.sticky', function() {
				window.requestAnimationFrame(stickyHandler);
			});		
		}
	},

	unbind: function() {
		if(stickyHeaders === false || mobile)
			return;
		if(this.sticky === true) {
			this.sticky = false;
			$(window).off('scroll.sticky');
			$('.is_stuck').removeClass('is_stuck').attr('style', '');
		}
	}

};

function shareThis(url) {
	var w = 460;
	var h = 500;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	window.open(url, "shareWindow", "status = 1, height =" + h + ", width = " + w + ", left =" + left + ", top =" + top + ", resizable = 0");
}

function imgLoaded($img) {
	$img.parents('.unveil').addClass('loaded');
}

enquire.register("screen and (min-width: 1px)", {
	match : function() {

	},
	unmatch : function() {

	},
	setup : function() {

	},
	deferSetup : true,
	shouldDegrade: true,
	// OPTIONAL
	// If supplied, triggered when handler is unregistered. 
	// Place cleanup code here
	destroy : function() {}
}, true);

enquire.register("screen and (max-width: 767px)", {
	match : function() {
		if($('.mobile-basic-info').height() < $(window).height()) {
			$('.mobile-basic-info').height($(window).height());
		}
		verticalSlider.destroy();
	},
	unmatch : function() {

	},
	setup : function() {
		
	},
	deferSetup : true,
	shouldDegrade: true,
	// OPTIONAL
	// If supplied, triggered when handler is unregistered. 
	// Place cleanup code here
	destroy : function() {}
}, true);

enquire.register("screen and (max-width: 991px)", {
	// OPTIONAL
	// If supplied, triggered when a media query matches.
	match : function() {
		
		unbindResizeIntro();
		// footer.mobileInit();
		// $('body').removeClass('scrollable');

	},
	unmatch : function() {

	},
	setup : function() {

	},
	deferSetup : true,
	shouldDegrade: true,
	destroy : function() {}
}, true);

enquire.register("screen and (min-width: 768px)", {
	// OPTIONAL
	// If supplied, triggered when a media query matches.
	match : function() {
		verticalSlider.init();
		
	},
	// OPTIONAL
	// If supplied, triggered when the media query transitions 
	// *from a matched state to an unmatched state*.
	unmatch : function() {

	},
	// OPTIONAL
	// If supplied, triggered once, when the handler is registered.
	setup : function() {

	},
	// OPTIONAL, defaults to false
	// If set to true, defers execution of the setup function 
	// until the first time the media query is matched
	deferSetup : true,
	shouldDegrade: true,
	// OPTIONAL
	// If supplied, triggered when handler is unregistered. 
	// Place cleanup code here
	destroy : function() {}
}, true);

enquire.register("screen and (min-width: 992px)", {
	// OPTIONAL
	// If supplied, triggered when a media query matches.
	match : function() {
		// verticalSlider.init();
		bindResizeIntro();

		if(!$('body').hasClass('no-smooth-scroll')) {
			$('body').addClass('scrollable');
		} else {
			$('body').removeClass('scrollable');
		}
		footer.init();
		backgroundParallax.init();

	},
	// OPTIONAL
	// If supplied, triggered when the media query transitions 
	// *from a matched state to an unmatched state*.
	unmatch : function() {

	},
	// OPTIONAL
	// If supplied, triggered once, when the handler is registered.
	setup : function() {

	},
	// OPTIONAL, defaults to false
	// If set to true, defers execution of the setup function 
	// until the first time the media query is matched
	deferSetup : true,
	shouldDegrade: true,
	// OPTIONAL
	// If supplied, triggered when handler is unregistered. 
	// Place cleanup code here
	destroy : function() {}
}, true);



$('.rtb-booking-form').find("input, textarea").each(function(i, el){
	var elId = $(el).attr("id");
	var label = null;
	if (elId && (label = $(el).parents("form").find("label[for="+elId+"]")).length == 1) {
		$(el).attr("placeholder", label.html().trim());
		// $(label).remove();
	}
});
$('.rtb-booking-form fieldset.contact').after($('.rtb-booking-form .message'));

$('.rtb-error').siblings('input').addClass('message-error');



jQuery('document').ready(function($) {
	'use strict';
	$(document).on("submit", "#commentform", function(e) {
		var commentform = $(this);
		if($('#comment-status').length === 0) {
			$('#respond').prepend('<div id="comment-status"></div>');
		}
		// $('#comment-status').html('<div id="comment-status"></div>');
		var statusdiv = $('#comment-status');

		var formdata = commentform.serialize();
		// statusdiv.html('<p>Processing...</p>');
		var formurl = commentform.attr('action');

		$.ajax({
			dataType: 'json',
			type: 'post',
			url: formurl,
			data: formdata,
			statusCode: {
				500: function(data) {
					var response = data.responseText;
					var expression = /<p>[\s\S]+\p>/g;
					var regex = new RegExp(expression);
					response = response.match(regex);
					response = response[0].replace(/<strong>[a-zA-Z ]+<\/strong>: /g, '');
					statusdiv.html('<div class="alert alert-danger">'+response+'</div>');
				},
				403: function(data) {
					var response = data.responseText;
					var expression = /<p>[\s\S]+\p>/g;
					var regex = new RegExp(expression);
					response = response.match(regex);
					response = response[0].replace(/<strong>[a-zA-Z ]+<\/strong>: /g, '');
					statusdiv.html('<div class="alert alert-danger">'+response+'</div>');
				}

			},
			// error: function(XMLHttpRequest, textStatus, errorThrown) {
			// 	statusdiv.html('<p class="wdpajax-error">You might have left one of the fields blank, or be posting too quickly</p>');
				
			// },
			success: function(data, textStatus) {
				if(data.status=="success") {
					if ($('.no-comments-so-far').length) {
						$('.no-comments-so-far').before('<section id="comments"><ul class="comments animate_element animate_content">'+data.contents+'</ul></section>');
					} else {
						location.reload();

					}
				} else {
					var response = data.responseText;
					var expression = /<p>[\s\S]+\p>/g;
					var regex = new RegExp(expression);
					response = response.match(regex);
					response = response[0].replace(/<strong>[a-zA-Z ]+<\/strong>: /g, '');
					statusdiv.html('<div class="alert alert-danger">'+response+'</div>');
				}
				
				commentform.find('textarea[name=comment]').val('');
				setTimeout(function () {
					statusdiv.html('');
				}, 2000);
			}
		});
		return false;
	});
});