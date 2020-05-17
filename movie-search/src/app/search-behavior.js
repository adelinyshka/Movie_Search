import {
	elMessage,
	elSearchBtn,
	elSearchInput,
	userInput
} from "./consts";
import {
	translateAllToEng,
	startSpinnerPreloader,
	clearCardWrapper, makeResultsDefault,
} from './working-functions';
import {mySwiper} from "./slider-swiper";


elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();
	console.groupCollapsed('bnt search clicked, input: '+ userInput);

	if (userInput.length < 3) {
		elMessage.textContent = 'Введите минимум 3 символа';
	} else {
		startSpinnerPreloader();

		elMessage.textContent = `Looking for ${userInput}`;
		translateAllToEng(userInput);


	}

});
