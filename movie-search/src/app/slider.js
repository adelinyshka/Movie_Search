import Swiper from 'swiper';

var swiper = new Swiper('.swiper-container', {
	keyboardControl: true,
	updateOnWindowResize: true,
	updateOnImagesReady:true,
	effect: 'slide',
	preloadImages:true,
	slidesPerGroup: 1,
	observer: true,
	setWrapperSize: true,
	watchSlidesVisibility: true,
	watchState: true,
	watchSlidesProgress: true,
	grabCursor: true,
	simulateTouch: true,
	keyboard: {
		enabled: true,
		onlyInViewport: false,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			// spaceBetween: 20,
			slidesPerGroup: 1
		},
		690: {
			slidesPerView: 2,
			// spaceBetween: 30,
			slidesPerGroup: 1
		},
		970: {
			slidesPerView: 3,
			// spaceBetween: 30,
			slidesPerGroup: 1
		},
		1360: {
			slidesPerView: 4,
			// spaceBetween: 30,
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

const mySwiper = document.querySelector('.swiper-container').swiper

mySwiper.init();
mySwiper.slideTo(0);

export { mySwiper };