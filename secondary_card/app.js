// Tabs
$(document).ready(function () {
	// Add active class on tab click
	$(".tab").on("click", function () {
	  var categoryId = $(this).data("id");
  
	  $(".tab, .tab-pane").removeClass("active");
	  $(this).addClass("active");
	  $("#" + categoryId).addClass("active");
	});
});

// Slideshow in second card
// query selector
const galleryActive =document.querySelector('.gallery-active');
const thumbnails = document.querySelectorAll('.thumbnail');
const thumbnailArray = Array.from(thumbnails);
let activeImage;
let timer;
const timingInterval = 5000;

autoRotateImage()

// auto rotation function
function autoRotateImage(){
	timer = setInterval(function(){
		activeImage = document.querySelector('.thumbnail.active');
		if(activeImage === thumbnailArray[thumbnailArray.length -1]){
			const newImg = thumbnailArray [0];
			updateActiveImage(newImg)
		}else{
		const newImg = activeImage.nextElementSibling;
		updateActiveImage(newImg);

	}}
	, timingInterval)
}


// set active function
function updateActiveImage(img){
	thumbnails.forEach(img => {
		img.classList.remove('active');
	})
	img.classList.add('active');
	galleryActive.src = img.querySelector('img').src;
}


// event listener
thumbnails.forEach(img =>{
	img.addEventListener('click',function(){
		updateActiveImage(img);
		clearInterval(timer);
		autoRotateImage();
	})
})