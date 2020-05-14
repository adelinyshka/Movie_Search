import {cross, elIconClear} from "./consts";
import {clearUserMessage,clearInput,startPreloader,endPreloader,pushRateToMovie,parseData,addNewMovies,getMoviesIds,clearMovieData,makeResults} from './working-functions';

cross.addEventListener('click', function (e) {
	e.preventDefault();
});

elIconClear.addEventListener('click', function (e) {
	clearUserMessage();
	clearInput();
});