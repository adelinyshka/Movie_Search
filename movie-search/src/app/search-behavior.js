import {
	elMessage,
	elSearchBtn,
	elSearchInput,
} from "./consts";
import {
	translateAllToEng,
	startSpinnerPreloader,
	clearMovieData,
} from './working-functions';

let userMessage = elMessage.textContent;

elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();

	const userInput = elSearchInput.value;

	if (userInput.length < 3) {
		userMessage = 'Введите минимум 3 символа';
	} else {
		clearMovieData();
		startSpinnerPreloader();
		translateAllToEng(userInput);
	}
	elSearchInput.focus();
});
