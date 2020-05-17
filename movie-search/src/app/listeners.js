import {cross, elIconClear} from "./consts";
import {clearUserMessage,clearInput,startPreloader,endPreloader,pushRateToMovie,parseData,addNewMovies,getRating,clearCardWrapper,makeResults} from './working-functions';

cross.addEventListener('click', function (e) {
	e.preventDefault();
});

elIconClear.addEventListener('click', function (e) {
	clearUserMessage();
	clearInput();
	elSearchInput.focus();
});