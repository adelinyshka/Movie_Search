import {
	elMessage,
	elSearchBtn,
	elSearchInput,
} from "./consts";
import {
	translateAllToEng,
	startSpinnerPreloader,
	clearMovieData, makeResultsDefault,
} from './working-functions';
import {mySwiper} from "./slider-swiper";

let userMessage = elMessage.textContent;

const kbWrapper = document.querySelector('.keyboard-wrapper');
elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();

	const userInput = elSearchInput.value;


	console.groupCollapsed('bnt search clicked, input: '+ userInput);

	if (userInput.length < 3) {
		userMessage = 'Введите минимум 3 символа';
	} else {
		if (kbWrapper) {
			kbWrapper.classList.add('d-none');
		}

		elMessage.textContent = `Looking for ${userInput}`;
		// clearMovieData();
		startSpinnerPreloader();
		translateAllToEng(userInput);

	}
	elSearchInput.focus();

});
