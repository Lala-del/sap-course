
(function($) { "use strict";

$(function() {
	var header = $(".start-style");
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
	
		if (scroll >= 10) {
			header.removeClass('start-style').addClass("scroll-on");
		} else {
			header.removeClass("scroll-on").addClass('start-style');
		}
	});
});		
	
//Animation

$(document).ready(function() {
	$('body.hero-anime').removeClass('hero-anime');
});

//Menu On Hover
	
$('body').on('mouseenter mouseleave','.nav-item',function(e){
		if ($(window).width() > 750) {
			var _d=$(e.target).closest('.nav-item');_d.addClass('show');
			setTimeout(function(){
			_d[_d.is(':hover')?'addClass':'removeClass']('show');
			},1);
		}
});	

//Switch light/dark

$("#switch").on('click', function () {
	if ($("body").hasClass("dark")) {
		$("body").removeClass("dark");
		$("#switch").removeClass("switched");
	}
	else {
		$("body").addClass("dark");
		$("#switch").addClass("switched");
	}
});  


// count numbers

$('.count-number').each(function() {
	$(this).prop('Counter', 0).animate({
	  Counter: $(this).text()
	}, {
	  duration: 3000,
	  easing: 'swing',
	  step: function(now) {
		$(this).text(Math.ceil(now));
	  }
	});
  });


})(jQuery); 


/// owl carousel 

$(document).ready(function() {
	var owl = $('#company');
	owl.owlCarousel({
	  items: 4,
	  dots:false,
	  loop: true,
	  margin: 10,
	  autoplay: true,
	  autoplayTimeout: 1000,
	  autoplayHoverPause: false,
	  responsiveClass:true,
	  responsive:{
		  0:{
			  items:2,
		  },
		  600:{
			  items:3,
			  nav:false
		  },
		  1000:{
			  items:4,
			  loop:false
		  }
	  }
	});
	
  })
 
  $(document).ready(function() {
	var owl = $('#university');
	owl.owlCarousel({
	  items: 4,
	  loop: true,
	  dots:false,
	  margin: 10,
	  autoplay: true,
	  autoplayTimeout: 1000,
	  autoplayHoverPause: false,
	  responsiveClass:true,
	  responsive:{
		  0:{
			  items:2
		  },
		  600:{
			  items:3,
			  nav:false
		  },
		  1000:{
			  items:4,
			  loop:false
		  }
	  }
	});
  })



  // list grid view

  const listViewButton = document.querySelector('.list-view-button');
const gridViewButton = document.querySelector('.grid-view-button');
const list = document.querySelector('ol');

listViewButton.onclick = function () {
  list.classList.remove('grid-view-filter');
  list.classList.add('list-view-filter');
}

gridViewButton.onclick = function () {
  list.classList.remove('list-view-filter');
  list.classList.add('grid-view-filter');
}



//password validation


// var myInput = document.getElementById("psw");
// var letter = document.getElementById("letter");
// var capital = document.getElementById("capital");
// var number = document.getElementById("number");
// var length = document.getElementById("length");



// // When the user starts to type something inside the password field
// myInput.onkeyup = function() {
//   // Validate lowercase letters
//   var lowerCaseLetters = /[a-z]/g;
//   if(myInput.value.match(lowerCaseLetters)) {  
//     letter.classList.remove("invalid");
//     letter.classList.add("valid");
//   } else {
//     letter.classList.remove("valid");
//     letter.classList.add("invalid");
//   }
  
//   // Validate capital letters
//   var upperCaseLetters = /[A-Z]/g;
//   if(myInput.value.match(upperCaseLetters)) {  
//     capital.classList.remove("invalid");
//     capital.classList.add("valid");
//   } else {
//     capital.classList.remove("valid");
//     capital.classList.add("invalid");
//   }

//   // Validate numbers
//   var numbers = /[0-9]/g;
//   if(myInput.value.match(numbers)) {  
//     number.classList.remove("invalid");
//     number.classList.add("valid");
//   } else {
//     number.classList.remove("valid");
//     number.classList.add("invalid");
//   }
  
//   // Validate length
//   if(myInput.value.length >= 8) {
//     length.classList.remove("invalid");
//     length.classList.add("valid");
//   } else {
//     length.classList.remove("valid");
//     length.classList.add("invalid");
//   }
// }



// upload photo
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};


// counted numbers

