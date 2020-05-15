import Swiper from 'swiper';

var swiper = new Swiper('.swiper-container', {
	keyboardControl: true,
	updateOnWindowResize: true,
	updateOnImagesReady:true,
	spaceBetween: 20,
	effect: 'slide',
	preloadImages:true,
	slidesPerGroup: 1,
	observer: true,
	// initialSlide: 0,
	// observeParents: true,
	// observeSlideChildren: true,
	watchSlidesVisibility: true,
	watchState: true,
	watchSlidesProgress: true,
	grabCursor: true,
	simulateTouch: true,

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
			slidesPerGroup: 1
		},
		690: {
			slidesPerView: 2,
			spaceBetween: 30,
			slidesPerGroup: 1
		},
		970: {
			slidesPerView: 3,
			spaceBetween: 30,
			slidesPerGroup: 1
		},
		1040: {
			slidesPerView: 4,
			spaceBetween: 30,
			slidesPerGroup: 1
		}
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
		dynamicBullets: true,
		dynamicMainBullets: 5
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

var opts = {
	lines: 18, // The number of lines to draw
	length: 5, // The length of each line
	width: 2, // The line thickness
	radius: 10, // The radius of the inner circle
	scale: 1, // Scales overall size of the spinner
	corners: 1, // Corner roundness (0..1)
	color: 'white', // CSS color or array of colors
	fadeColor: 'transparent', // CSS color or array of colors
	speed: 0.5, // Rounds per second
	rotate: 0, // The rotation offset
	animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
	direction: 1, // 1: clockwise, -1: counterclockwise
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	className: 'spinner', // The CSS class to assign to the spinner
	top: '50%', // Top position relative to parent
	left: '50%', // Left position relative to parent
	shadow: '0 0 1px transparent', // Box-shadow for the lines
	position: 'absolute', // Element positioning
};

const mySwiper = document.querySelector('.swiper-container').swiper

mySwiper.init();
mySwiper.slideTo(0);

export {mySwiper, opts};