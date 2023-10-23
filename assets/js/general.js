/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	//"use strict";
	var $win = $(window);
	var $doc = $(document);
	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	var $screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

	$doc.ready(function() {
/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
	
		
		/* Get Screen size
		---------------------------------------------------------------------*/
		$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});
		
		
		/* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				if(!$('#menu').length){
					$('#mainmenu').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span> <em>Menu</em></a>');
				}
			} else {
				$("#menu").remove();
			}
		}).resize();

		if($('.search-box').length){
			$('.search-box .search-btn').click(function(event){
				$(this).parents('body').find('.minicart').fadeOut();
				if (screencheck(1023)) {
					$(this).parents('body').find('#mainmenu > ul').slideUp();
					$(this).parents('body').find('.menulines-button').removeClass('menuopen');
				}
				if (screencheck(479)) {
					event.stopPropagation();
					$(this).next('.search-box .textbox').slideToggle('normal').parent().toggleClass('active');
				}
			})
		}
		
		$(document).click(function(e){
			if($('.search-box').length){
				if($(e.target).closest('.search-box .textbox').length != 0) return false;
				if (screencheck(479)) {
					$('.search-box .textbox').slideUp('normal').parent().removeClass('active');
					$(this).parents('body').find('.search-box').removeClass('active');
					$(this).parents('body').find('.search-box .textbox').slideUp();
				}
			}
		 });

		$('.cart-info a').on('click', function(event){
			event.stopPropagation();
			if (screencheck(1023)) {
				$(this).parents('body').find('#mainmenu > ul').slideUp();
				$(this).parents('body').find('.menulines-button').removeClass('menuopen');
			}
			if (screencheck(479)) {
				$(this).parents('body').find('.search-box').removeClass('active');
				$(this).parents('body').find('.search-box .textbox').slideUp();
			}
			$(this).next('.minicart').fadeIn();
			
			
		});

		$('.cart-header .minicart-close').on('click', function(){
			$(this).parents('.minicart').fadeOut();
		});

		$(document).click(function(e){
			if($(e.target).closest('.minicart').length != 0) return false;
			$('.minicart').fadeOut();
		 });
		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function() {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = [];
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();

				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						});
					}
						
				} else {
					if( $('.tabMobiletrigger').length ){
						$('.tabMobiletrigger').remove();
						tabTrigger.removeClass("active");
						$this.find(tabTrigger).removeClass("active").first().addClass('active');
						$this.find(tabContent).hide().first().show();				
					}		
				}
			};
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});
		
		/* Accordion box JS
		---------------------------------------------------------------------*/
		$('.accordion-databox').each(function() {
			var $accordion = $(this),
				$accordionTrigger = $accordion.find('.accordion-trigger'),
				$accordionDatabox = $accordion.find('.accordion-data');

				
				$accordionTrigger.on('click',function (e) {
					var $this = $(this);
					var $accordionData = $this.next('.accordion-data');
					if( $accordionData.is($accordionDatabox) &&  $accordionData.is(':visible') ){
						$this.removeClass('open');
						$accordionData.slideUp(400);
						e.preventDefault();
					} else {
						$this.addClass('open');
						$accordionData.slideDown(400);
					}
				});
		});
		
		
		/* MatchHeight Js
		-------------------------------------------------------------------------*/
		if($('.category-box').length){
			$('.category-box').matchHeight();
		}

		/*Sticky
		---------------------------------------------------------------------*/
		$(window).on('scroll', function(){
			if( $(this).scrollTop() > 50){
				   $("#header").addClass("sticky");
			 } else {
				 $("#header").removeClass("sticky");
			 }
		});

		$(window).on('resize', function(){
			var headerheight = $('#header').outerHeight();
			$('body').css("padding-top", headerheight);
		}).resize();
		
		/*Mobile menu click
		---------------------------------------------------------------------*/
		$(document).on('click',"#menu", function(){
			$(this).parents('body').find('.minicart').fadeOut();
			if (screencheck(479)) {
				$(this).parents('body').find('.search-box').removeClass('active');
				$(this).parents('body').find('.search-box .textbox').slideUp();
			}
			$(this).toggleClass('menuopen');
			$(this).next('ul').slideToggle('normal');
			return false;
		});

		var $dialogTrigger = $('.poptrigger'),
		$pagebody =  $('body');
		$dialogTrigger.click( function(){
			
			if( $(this).find('.shareit-timeline').is(':visible')) return false;


			var popID = $(this).attr('data-rel');
			$('body').addClass('overflowhidden');
			var winHeight = $(window).height();
			$('#' + popID).fadeIn();
			var popheight = $('#' + popID).find('.popup-block').outerHeight(true);
			
			if( $('.popup-block').length){
				var popMargTop = popheight / 2;
				//var popMargLeft = ($('#' + popID).find('.popup-block').width()/2);
				
				if ( winHeight > popheight ) {
					$('#' + popID).find('.popup-block').css({
						'margin-top' : -popMargTop,
						//'margin-left' : -popMargLeft
					});	
				} else {
					$('#' + popID).find('.popup-block').css({
						'top' : 0,
						//'margin-left' : -popMargLeft
					});
				}
				
			}
			
			$('#' + popID).append("<div class='modal-backdrop'></div>");
			$('.popouterbox .modal-backdrop').fadeTo("slow", 0.85);
			if( popheight > winHeight ){
				$('.popouterbox .modal-backdrop').height(popheight);
			} 
			$('#' + popID).focus();
			return false;
		});
		
		$(window).on("resize", function () {
			if( $('.popouterbox').length && $('.popouterbox').is(':visible')){
				var popheighton = $('.popouterbox .popup-block').height()+60;
				var winHeight = $(window).height();
				if( popheighton > winHeight ){
					$('.popouterbox .modal-backdrop').height(popheighton);
					$('.popouterbox .popup-block').removeAttr('style').addClass('taller');
					
				} else {
					$('.popouterbox .modal-backdrop').height('100%');
					$('.popouterbox .popup-block').removeClass('taller');
					$('.popouterbox .popup-block').css({
						'margin-top' : -(popheighton/2)
					});
				}	
			}
		});

		//Close popup		
		$(document).on('click', '.close-dialogbox, .modal-backdrop', function(){
			$(this).parents('.popouterbox').fadeOut(300, function(){
				$(this).find('.modal-backdrop').fadeOut(250, function(){
					$('body').removeClass('overflowhidden');
					$('.popouterbox .popup-block').removeAttr('style');
					$(this).remove();
				});
			});
			return false;
		});
		
		// Close
		if($('.offer-top-header').length){
			$('.offer-top-header a.close').on('click', function(){
				$(this).parent('.offer-top-header').slideUp('fast');
			});
		}
		$('.color-switch-list li a').not('.disabled').on('click', function(){
			$(this).parent().toggleClass('active');
			return false
		});

		$('.select-size-list li a').not('.disabled').on('click', function(){
			$(this).parent().toggleClass('active');
			return false
		});

		if($('.size-info').length){
			$('.size-info .select-size-list li a').not('.disabled').on('click', function(){
				$('.size-info .select-size-list li').removeClass('active');
				$(this).parent().toggleClass('active');
				return false
			});
		}

		if($('.color-info').length){
			$('.color-info .color-switch-list li a').not('.disabled').on('click', function(){
				$('.color-info .color-switch-list li').removeClass('active');
				$(this).parent().toggleClass('active');
				return false
			});
		}
		(function () {
		function sendFn() {
			var ele = document.getElementById("svg");
			var elem = document.getElementById("btn");
			ele.classList.toggle("animation");
			elem.classList.toggle("animationbutton");
			if (document.getElementById("send").innerHTML == "Sent") {
			  document.getElementById("send").innerHTML = "Send";
			} else {
			  document.getElementById("send").innerHTML = "Sent";
			}
		  }
		  document.getElementById('btn').addEventListener('click', sendFn, true);
		})();



		

		var QtyInput = (function () {
			var $qtyInputs = $(".qty-input");
		
			if (!$qtyInputs.length) {
				return;
			}
		
			var $inputs = $qtyInputs.find(".product-qty");
			var $countBtn = $qtyInputs.find(".qty-count");
			var qtyMin = parseInt($inputs.attr("min"));
			var qtyMax = parseInt($inputs.attr("max"));
		
			$inputs.change(function () {
				var $this = $(this);
				var $minusBtn = $this.siblings(".qty-count--minus");
				var $addBtn = $this.siblings(".qty-count--add");
				var qty = parseInt($this.val());
		
				if (isNaN(qty) || qty <= qtyMin) {
					$this.val(qtyMin);
					$minusBtn.attr("disabled", true);
				} else {
					$minusBtn.attr("disabled", false);
					
					if(qty >= qtyMax){
						$this.val(qtyMax);
						$addBtn.attr('disabled', true);
					} else {
						$this.val(qty);
						$addBtn.attr('disabled', false);
					}
				}
			});
		
			$countBtn.click(function () {
				var operator = this.dataset.action;
				var $this = $(this);
				var $input = $this.siblings(".product-qty");
				var qty = parseInt($input.val());
		
				if (operator == "add") {
					qty += 1;
					if (qty >= qtyMin + 1) {
						$this.siblings(".qty-count--minus").attr("disabled", false);
					}
		
					if (qty >= qtyMax) {
						$this.attr("disabled", true);
					}
				} else {
					qty = qty <= qtyMin ? qtyMin : (qty -= 1);
					
					if (qty == qtyMin) {
						$this.attr("disabled", true);
					}
		
					if (qty < qtyMax) {
						$this.siblings(".qty-count--add").attr("disabled", false);
					}
				}
		
				$input.val(qty);
			});
		})();
		

		/* Filter  Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				if(!$('#category-filter').length){
					$('.product-list-section').prepend('<a href="#" id="category-filter">Filter</a>');
				}
			} else {
				$("#category-filter").remove();
			}
		}).resize();

		$(document).on('click', '#category-filter', function(event){
			event.stopPropagation();
			if (screencheck(1023)) {
				$(this).parents('body').toggleClass('active-filter');
			}
		});

		$(document).click(function(e){
			if($(e.target).closest('.filter-sidebar').length != 0) return false;
			$('.filter-sidebar').parents('body').removeClass('active-filter');
		});

		/* Filter  Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				$('.product-name-info').prependTo('.product-gallery');
			} else {
				$(".product-name-info").prependTo('.product-description');
			}
		}).resize();

		/* Filter Close  Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(1023)) {
				if(!$('#category-filter-close').length){
					$('.filter-sidebar').prepend('<a href="#" id="category-filter-close"><i class="icon-close"></i></a>');
				}
			} else {
				$("#category-filter-close").remove();
			}
		}).resize();

		$(document).on('click', '#category-filter-close', function(event){
				$(this).parents('body').removeClass('active-filter');
		});
		

		$('.banner-slider').owlCarousel({
			items: 1,
			animateOut: 'fadeOut',
			loop: false,
			margin: 0,
			mouseDrag: false
		  });

		  $(function() {
			const sliderRange = $("#slider-range");
		  
			sliderRange.slider({
			  range: true,
			  min: 0,
			  max: 2000,
			  values: [200, 1200],
			  slide: function(event, ui) {
				$("#amount_min").val(ui.values[0]);
				$("#amount_max").val(ui.values[1]);
			  },
			  create: function() {
				let values = $(this).slider("option", "values");
				$("#amount_min").val(values[0]);
				$("#amount_max").val(values[1]);
			  }
			});
		  
			// Input value to Integer.
			const toInt = input => {
			  let val = Number(input);
		  
			  if (Number.isInteger(val)) {
				return Number(val);
			  } else {
				return 0;
			  }
			};
		  
			// Bind onchange event to inputs.
			$("#amount_min").slide(function() {
			  let amount_min = toInt($(this).val());
			  let amount_max = toInt($("#amount_max").val());
		  
			  if (amount_min >= amount_max) {
				amount_min = amount_max;
			  }
		  
			  sliderRange.slider("values", 0, amount_min);
			});
		  
			$("#amount_max").change(function() {
			  let amount_max = toInt($(this).val());
			  let amount_min = toInt($("#amount_min").val());
		  
			  if (amount_max <= amount_min) {
				amount_max = amount_min;
			  }
		  
			  sliderRange.slider("values", 1, amount_max);
			});
		  });
		  

		// Banner

		var words = document.querySelectorAll(".heading-word");
		var animheading = gsap.timeline({
		repeat: -1, defaults: { duration: 0.5, ease: "elastic.out(1,1)" }});

		words.forEach(function(element, index) {
			animheading.fromTo(element,
			{ yPercent: 200, opacity: 0 },
			{ yPercent: 0, opacity: 1,
			
			onStart: function() {
			var newwidth = element.clientWidth;
			document.querySelector('.heading-wrapper').style.width=newwidth+"px";
			},
			})
			
			animheading.to(element,
			{ opacity: 0, ease: "none", delay: 0.5 })
		})
		

			// Filter Gallery
		var filterList = {
			init: function () {
				// MixItUp plugin
				// http://mixitup.io
				$('.category-grid').mixItUp({
					selectors: {
					target: '.category-box-info',
					filter: '.filter'	
				},
				load: {
				  filter: 'all' // show app tab on first load
				}     
				});								
			}
		};
		// Run the show!
		filterList.init();

		// Filter Gallery
		var filterListone = {
			init: function () {
				// MixItUp plugin
				// http://mixitup.io
				$('.category-grid1').mixItUp({
					selectors: {
					target: '.category-box-info1',
					filter: '.filterr'	
				},
				load: {
				  filter: 'all' // show app tab on first load
				}     
				});								
			}
		};
		// Run the show!
		filterListone.init();
		

		

/*--------------------------------------------------------------------------------------------------------------------------------------*/		
	});	

/*All function nned to define here for use strict mode
----------------------------------------------------------------------------------------------------------------------------------------*/


	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);