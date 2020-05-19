import {
	elMessage, elSearchBtn,
	elSearchInput,
} from "./consts";
import {
	clearCardWrapper, endSpinnerPreloader, startSpinnerPreloader,
	translateAllToEng,
} from './working-functions';
import {mySwiper} from "./slider";

elSearchInput.focus();

let input = 'sea';
let page = 1;

mySwiper.on('reachEnd', async () => {
	startSpinnerPreloader();

	page++;

	if (elSearchInput.value !== '') {
		input = elSearchInput.value;
	}
	translateAllToEng(input, page);
});

document.addEventListener('DOMContentLoaded', function () {
	startSpinnerPreloader();
	translateAllToEng(input, page);
});

elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();
	startSpinnerPreloader();

	if (elSearchInput.value.length < 3) {
		elMessage.textContent = 'Введите минимум 3 символа';
		endSpinnerPreloader();

	} else {
		clearCardWrapper();
		translateAllToEng(input, page);
	}
});

