import {
	apikey,
	elMessage, elSearchBtn,
	elSearchInput,
} from "./consts";
import {
	parseData,
	addCardsByClick, startSpinnerPreloader, translateAllToEng,
} from './working-functions';
import {mySwiper} from "./slider-swiper";

elSearchInput.focus();

let input = 'sea';
let page = 1;

mySwiper.on('reachEnd', async () => {
	page++;
	if(elSearchInput.value !== '') {
		input = elSearchInput.value;
		console.log('input = ' + elSearchInput.value)
	}
	console.log('reach end');
	console.log(input+'!!!');
	translateAllToEng(input,page);

});


document.addEventListener('DOMContentLoaded', function () {
	console.log('load default');
	translateAllToEng(input,page);
	// const targetUrl = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}&page=1`;

	// fetch(targetUrl)
	// 	.then((response) => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		}
	// 		elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
	// 	})
	// 	.then((moviesData) => {
	// 		console.log('parse on load!');
	// 		parseData(moviesData);
	// 	})
	// 	.catch((error) => {
	// 		elMessage.textContent = `${error}`;
	// 	});

});

elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();
	console.groupCollapsed('bnt search clicked, input: '+ userInput);
	if (elSearchInput.value.length < 3) {
		elMessage.textContent = 'Введите минимум 3 символа';
	} else {
		startSpinnerPreloader();
		// elMessage.textContent = `Looking for ${userInput}`;
		translateAllToEng(input,page);
	}
});
