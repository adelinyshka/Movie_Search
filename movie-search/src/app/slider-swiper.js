import Swiper from 'swiper';
// todo сделать стрелочки и чтобы переключали
// todo сделать пагинацию


const swiper = new Swiper('.swiper-container', {
	// direction: 'ho',
	// loop: true,
	keyboardControl: true,
	updateOnWindowResize: true,
	spaceBetween: 20,
	effect: 'slide',
	preloadImages:true,
	updateOnImagesReady:true,
	slidesPerGroup: 4,
	observer: true,
	observeParents: true,

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
			slidesPerGroup: 1
		},
		430: {
			slidesPerView: 2,
			spaceBetween: 30,
			slidesPerGroup: 2
		},
		650: {
			slidesPerView: 3,
			spaceBetween: 30,
			slidesPerGroup: 3
		},
		886: {
			slidesPerView: 4,
			spaceBetween: 40,
			slidesPerGroup: 4
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

// var sliderSwiper = new Swiper('.swiper-container', {
// 	updateOnWindowResize: true,
// 	spaceBetween: 20,
// 	effect: 'slide',
// 	slidesPerView: 4,
// 	slidesPerGroup: 4,
// 	observer: true,
// 	observeParents: true,
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 20
// 		},
// 		430: {
// 			slidesPerView: 2,
// 			spaceBetween: 30
// 		},
// 		650: {
// 			slidesPerView: 3,
// 			spaceBetween: 30
// 		},
// 		886: {
// 			slidesPerView: 4,
// 			spaceBetween: 40
// 		}
// 	},
// 	pagination: {
// 		el: '.swiper-pagination',
// 		type: 'bullets',
// 		clickable: true
// 	},
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
//
// });
