$(function(){
	var $container = $('#isotope-gallery-container');
		var $filter = $('.filter');
		$('#myCarousel').carousel({
			//设置自动播放/2 秒
			interval : 3000,
		});
		$(window).load(function () {
		// Initialize Isotope
		$container.isotope({
			itemSelector: '.gallery-item-wrapper'
		});
		$('.filter a').click(function () {
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });
			return false;
		});
		$filter.find('a').click(function () {
			var selector = $(this).attr('data-filter');
			$filter.find('a').parent().removeClass('active');
			$(this).parent().addClass('active');
		});
		});
		$(window).smartresize(function () {
		$container.isotope('reLayout');
		});
		// End Isotope Filtering
		$('.gallery-zoom').magnificPopup({ 
				type: 'image'
				// other options
			});
			
		 /* ======= Fixed header when scrolled ======= */
    	$(window).bind('scroll', function() {
	         if ($(window).scrollTop() > 0) {
	             $('#header-nav').addClass('navbar-fixed-top');
	         }
	         else {
	             $('#header-nav').removeClass('navbar-fixed-top');
	         }
	    });
	    
	  
	    
		/* ======= ScrollTo ======= */
	    $('a.scrollto').on('click', function(e){
	        
	        //store hash
	        var target = this.hash;
	                
	        e.preventDefault();
	        
			$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});
	        //Collapse mobile menu after clicking
			if ($('.navbar-collapse').hasClass('in')){
				$('.navbar-collapse').removeClass('in').addClass('collapse');
			}
			
		});
		
		/* ---------- Wow Js ---------- */
		var wow = new WOW(
		  {
		    boxClass:     'wow',      // animated element css class (default is wow)
		    animateClass: 'animated', // animation css class (default is animated)
		    offset:       250,          // distance to the element when triggering the animation (default is 0)
		    mobile:       true,       // trigger animations on mobile devices (default is true)
		    live:         true,       // act on asynchronously loaded content (default is true)
		    callback:     function(box) {
		      // the callback is fired every time an animation is started
		      // the argument that is passed in is the DOM node being animated
		    }
		  }
		);
		wow.init();
		
		
		//bootstrap轮播适应移动端可触摸
		var myTouch = util.toucher($('#myCarousel'));  
  
		myTouch.on('swipeLeft',function(e){  
		    $('#carright').click();  
		}).on('swipeRight',function(e){  
		    $('#carleft').click();  
		});  
			
});
