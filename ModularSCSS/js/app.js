//==========================================//
//
//      **** APP object init ****
//
//==========================================//
$(function(){

window.APP = {

	getloc : function(){
		var script = document.createElement('script');
		script.setAttribute('src','http://www.geoplugin.net/javascript.gp');
		script.setAttribute('language','Javascript');
		script.setAttribute('type','text/javascript');
		document.head.appendChild(script);


		setTimeout(function(){
			$.ajax({
				url : 'http://jsonip.com',
				type : 'GET',
				datType : 'json',
				success : function(data){

					APP.location = {
						City: geoplugin_city(),
						State: geoplugin_regionName(),
						Area_Code: geoplugin_areaCode(),
						Country_Code: geoplugin_countryCode(),
						Country: geoplugin_countryName(),
						Latitude: geoplugin_latitude(),
						Longitude: geoplugin_longitude(),
						Request_IP: geoplugin_request()
						// Currency: geoplugin_currencyCode(),
						// Currency_Symbol_UTF8: geoplugin_currencySymbol_UTF8(),
					}//location

					//Returns same results as geoplugin.net API. Only comment in if 
					//willing to ask user for their location - it will prompt
				    // navigator.geolocation.getCurrentPosition(function(position){
				    // 	 APP.location.browserLocation = position; 
					   // 	console.log(position, "position");
				    // });
				
					//Fetch further info from Google
					$.ajax({
						url : 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + APP.location.Latitude + ',' + APP.location.Longitude + '&sensor=true',
						type : 'GET',
						datType : 'json',
						success : function(googleJSON){
							APP.location.Address = googleJSON.results[0].formatted_address;
							APP.location.County  = googleJSON.results[2].address_components[0].long_name;
						}
					});//ajax

					APP.location.ip = data.ip;
					APP.location.googleMapLink = 'https://www.google.com.au/maps/preview/@' + APP.location.Latitude + ',' + APP.location.Longitude + ',12z';

				}//success
			});//ajax
		},1000);
	},//getloc




	valid : function(field){
		//=================================//
		// Usage: 
		// APP.valid('#myfield');
		// Dependencies: jquery
		//=================================//
		var field 	= $(field);
		var pattern = '';
		var response = false;

		if(field.attr('type') === 'text'){
			pattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
			response = pattern.test(field.val());
		}else if(field.attr('type') === 'email'){
			pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
			response = pattern.test(field.val());
		}else if(field.attr('type') === 'number'){
			pattern = /^[0-9]$/;
			response = pattern.test(field.val());
		}else if(field.is('textarea')){
			pattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
			response = pattern.test(field.val());
		}

		if(field.is('[required]') && $.trim(field.val()).length === 0){
			response = false;
		}

		return response;
	},//validateField



	iosVH : function(selector,height){
		//=============================//
		// Usage
 		// APP.iosVH('.page',600);
		//
		// Dependencies: jquery
		//
		// Defaults to window height if no height specified
		//=============================//
		var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
		if(iOS){
		  var h = height ? height : $(window).height();
		  $(selector).css({
		  	"min-height": h + "px"
		  });
		}
	},//iosVH
	




//This one needs work
// 	rangeSlider : function(th, tr, displayElem){
// 	dragging = true;
// $(document).on('vmousedown','#js-range-wrapper', function(){

// 	// $(this).children('img').attr('src', 'images/icon-pin-glow.png');

// 	var thumb = $('#js-range-thumb');
// 	var track = $('#js-range-track');
// 	$('#js-drag-info').fadeOut(1500);

// 	//Set the slider thumb x position
// 	$(document).on('vmousemove', '#js-range-wrapper', function(e){
// 		var range = {
// 			thWidth : thumb.width(),
// 			trLeft 	: track.offset().left,
// 			trWidth : track.width()
// 		};

// 		range.thumb 	= thumb;
// 		range.track 	= track;
// 		range.trRight 	= range.trLeft + range.trWidth;
// 		range.mouseX 	= e.pageX ? e.pageX : e.touches[0].pageX;
// 		range.thLeft	= thumb.offset().left;
// 		range.thRight 	= range.thLeft + range.thWidth;
// 		range.thX		= range.thLeft + (range.thWidth / 2);
// 		var stop = false;

// 		//Normal movement on X
// 		if(stop === false){
// 			range.thumb.offset({'left': range.mouseX - 125});
// 		}

// 		//Perimeter
// 		if(range.mouseX < range.trLeft){
// 			range.thumb.offset({'left': range.trLeft - 125});
// 			stop = true;
// 		}else if(range.mouseX > range.trRight){
// 			range.thumb.offset({'left': range.trRight - (range.thWidth / 2)});
// 			stop = true;	
// 		}

		
		

// 		APP.guide.Percentage_Powered = (100 - Math.floor(((range.trRight - range.trLeft) - (range.thX - range.trLeft)) / (range.trRight - range.trLeft) * 100));
// 		$('#js-percentage').text(APP.guide.Percentage_Powered + '%');

// 	});//mousemove

// }).bind('vmouseup', '#js-range-wrapper', function(e){

// 	$(document).off('vmousemove', '#js-range-wrapper');
// 	$('#js-drag-info').fadeIn(1500);

// });

// 	},//rangeSlider



	spinner : function(numbersElem, spinnerID){
		//=============================//
		// Usage
		// APP.spinner('#js-acs li', 'acs');
		//=============================//

		//Attach click handler to li items
		$(numbersElem).off('vclick');
		$(document).on('vclick', numbersElem ,function(){

			$(numbersElem).removeClass('highlight');
			$(this).addClass('highlight');

			APP.guide[spinnerID] = $(this).text()*1;
			// console.log(APP, "spinner clicked");
		});

	},//spinner


	mailto : function(url,method,data,cb){
		//Essentially an ajax shorthand
		$.ajax({
			url : url,
			data : data,
			method : method,
			dataType : 'json',
			success : function(response){
				cb(response);
				// console.log(response, "mailer response");
			},
			error : function(data, err, status){
				cb(status);
				// console.log(err, status,"mailer fail response");
			}
		});
	},//mailto


	ggsSlider : function(baseElem, slideElems, bubbleElems){
		//================================================//
		// GGS Slider
		// Author: Xandernator
		// 9/1/14
		//
		// Init this module w/ app.ggsSlider();
		// 
		// baseElem : ('container selector'))
		// slideElems : ('selector of images/slides')
		// bubbleElems : ('selector for bubble element classes')
		// applyHidden : Boolean
		//================================================//

		this.slider = jQuery(baseElem);
		this.slides = jQuery(baseElem + " " + slideElems).toArray();	
		if(bubbleElems)
		this.bubbles = jQuery(baseElem).find(bubbleElems);
		else
		this.bubbles = null;
		
		var thisSlider = this;
		
		this.currentSlide = 0;
		
		this.autoAdvance = null;
		
		this.advanceInterval = 8000;



		thisSlider.resetTimer = function(){
			clearInterval(thisSlider.autoAdvance);
			thisSlider.autoAdvance = setInterval(function(e){thisSlider.nextSlide();}, thisSlider.advanceInterval);
		}
		
		
		this.init = _init;
		function _init()
		{
			if(this.bubbles)
			jQuery(this.bubbles).click(
	            function(e){
				thisSlider.goToSlide( jQuery(thisSlider.bubbles).index(this) )
				}
			);
		}
		
		this.test = _test;
		function _test()
		{
			return this.slides;	
		}
		
		this.goToSlide = _goToSlide;
		function _goToSlide(slide)
		{
			var Slides = this.slides;
			thisSlider.resetTimer();
			

			if(slide >= Slides.length)
				slide = 0;
				if(slide < 0)
					slide = Slides.length - 1;
				this.currentSlide = slide;
			
			jQuery(Slides).each(function(index, element) {
				//Add index number to slides
				jQuery(this).attr('data-index', index+1);

				jQuery(this).removeClass("ggs-slider-active").removeClass("ggs-slider-left").removeClass("ggs-slider-right").removeClass("ggs-slider-hidden");
				if(index == slide)
					jQuery(this).addClass("ggs-slider-active");
				else if(index == slide - 1 || (index == Slides.length - 1 && slide == 0))
					jQuery(this).addClass("left"); 
				else if(index == slide + 1 || (index == 0 && slide == Slides.length - 1))
					jQuery(this).addClass("ggs-slider-right"); 
				else
					jQuery(this).addClass("ggs-slider-hidden");
			});
			if(this.bubbles)
			jQuery(this.bubbles).each(function(index, element) {
	        	jQuery(this).removeClass("ggs-slider-active");
				if(index == slide)
					jQuery(this).addClass("ggs-slider-active");
			
	    });
		}
		
		
		this.nextSlide = _nextSlide;
		function _nextSlide()
		{
			this.goToSlide(this.currentSlide + 1);
		}
		
		
		this.previousSlide = _previousSlide;
		function _previousSlide()
		{
			this.goToSlide(this.currentSlide - 1);
		}
		
		




		//Slide page indicators
		//Can be initialized separately
		this.initSlideIndicators = function (baseElem, slideElems){

			//Check for separate initialization
			if(baseElem === undefined && slideElems === undefined){
				var baseElem = app.ggsSlider.slider;
				var slideElems = app.ggsSlider.slides;
			}

			var container = $(document).find(baseElem);
			var slides  = container.find(slideElems);
			var total 	= slides.length;

			//Add element to contain indicators
			container.append('<div class="pager-container"></div>');

			//Create indicators
			for(var i=0;i<total;i++){
				var pager = '<a data-slide="' + (i+1) + '" class="pager-inactive js-page-indicator" href="#"></a>'
				$('.pager-container').append(pager);
			}



			//Detect current slide & set active
			setInterval(function(){
				var num = container.find('.ggs-slider-active').attr('data-index');

				//Reset to inactive
				$('.pager-container').find('.pager-active').each(function(){
					$(this).addClass('pager-inactive').removeClass('pager-active');
				});

				//Set current to active
				$('.pager-container').find('.pager-inactive[data-slide=' + num + ']').addClass('pager-active').removeClass('pager-inactive');
			}, 500);
				


			//Add handlers to skip to slide on indicator click
			//This could use a call to slider library to pause slides or reset timer
			$('.js-page-indicator').each(function(){
				$(this).click(function(e){
					e.preventDefault();

					//Get slidenumber form click
					var slideNum = $(this).attr('data-slide');
						slides.removeClass('ggs-slider-active');
						container.find("> div[data-index='" + slideNum + "']").addClass('ggs-slider-active');
				});
			});
		};//app.initSlideIndicators



		//Initialize Slider
		this.init();
		this.goToSlide(0);
		this.initSlideIndicators();
		
		//thisSlider.resetTimer();
	},//app.ggsSlider




	scrollinInit : function(elems,offsetDefault){
		//================================================//
		// GGS Scroll In Effect
		// Author: Xandernator
		// 9/1/14
		//
		// Init this module w/ app.scrollinInit(['footer'], 200);
		// or app.scrollinInit();
		//
		// Next step: write handlers for upward scrolling 
		// to re-init effect
		//================================================//


		var checkForVisible;
		var scrollGo 	= true;
		var elements 	= [];
		var scrollOnce 	= true;

		//Offset is how far from viewport 
		//bottom to begin animation
		var offset 	= 30;




		//Check if any arguments were provided
		if(arguments.length == 0){
			elements.push('.scrollin');

		}else{

			//Check if an offset was provided
			if(offsetDefault !== undefined){
				offset = offsetDefault;
			}

			//Check if any elements were added to function options
			if(elems !== undefined){
				for(var i=0;i<elems.length;i++){
					elements.push(elems[i]);
				}

				elements.push('.scrollin');
			}else{
				//default to scrollin class
				elements.push('.scrollin');
			}
			
		}

		//init plugin
		$('body').addClass('scrollin-init');

		//init invisible
		for(var i=0;i<elements.length;i++){
			jQuery(elements[i]).each(function(){$(this).addClass("scrollin-notVisible");});
		}

		//Run default
		checkVisibilityDefault();

		//Attach to scroll
		$('body').on('scroll',  function() { 
			scrollTimer(); 

			//Detect first scroll to remove init
			if(scrollOnce){
				$('body').removeClass('scrollin-init');
				scrollOnce = false;
			}
		});


		



		//Run handlers
		function checkVisibilityDefault() {

			//loop through elements and attach handler
			for(var i=0;i<elements.length;i++){
				jQuery(elements[i]).each(function() {isVisibleOnce(this);});
			}
		}





		function scrollMgr() {
			
			if(!scrollGo)
			{
				checkVisibilityDefault();
				scrollGo = true;
			}
		}





		function scrollTimer() {
			if(scrollGo)
			{
				scrollGo = false;
			}
		}





		function checkElemsVisibility(elem){
			if(isElemScrolledIntoView(jQuery(elem))) {
		        jQuery(elem).removeClass("scrollin-notVisible");
		    } else
		    {
		      jQuery(elem).addClass("scrollin-notVisible");
		    }
		}





		function isVisible(elem){
					
			if(isElemScrolledIntoView(jQuery(elem))) {
			    jQuery(elem).removeClass("scrollin-notVisible");
				jQuery(elem).addClass("scrollin-visible");
			} else
			{
			  jQuery(elem).addClass("scrollin-notVisible");
			  jQuery(elem).removeClass("scrollin-visible");
			}
		}





		function isVisibleOnce(elem)
		{
			
			if(isElemScrolledIntoView(jQuery(elem), offset)) {
			    jQuery(elem).removeClass("scrollin-notVisible");
				jQuery(elem).addClass("scrollin-visible");
			} 
		}





		function isElemScrolledIntoView(elem) {
			
		    var docViewTop = jQuery(window).scrollTop();
		    var docViewBottom = docViewTop + jQuery(window).height() - offset;
		    var elemTop = jQuery(elem).offset().top;
		    var elemBottom = elemTop + jQuery(elem).height();
		    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
		}





		   setInterval(scrollMgr, 33);
		   
		   jQuery(window).resize( function() { scrollTimer(); });
		   //jQuery(window).load( function() { scrollTimer(); });

	};//scrollin.init


























};//app

//Call method
APP.getloc();


});// function