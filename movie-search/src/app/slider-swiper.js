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
	observeParents: true,
	observeSlideChildren: true,
	// watchSlidesVisibility: true,
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
		430: {
			slidesPerView: 2,
			spaceBetween: 30,
			slidesPerGroup: 1
		},
		650: {
			slidesPerView: 3,
			spaceBetween: 30,
			slidesPerGroup: 1
		},
		886: {
			slidesPerView: 4,
			spaceBetween: 40,
			slidesPerGroup: 1
		}
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
		dynamicBullets: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

const mySwiper = document.querySelector('.swiper-container').swiper

mySwiper.init();
mySwiper.slideTo(0);


export default mySwiper;