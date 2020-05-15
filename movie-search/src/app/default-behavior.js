import {
	apikey,
	elLoadIcon,
	elMessage,
	elSearchInput,
	btnSearch
} from "./consts";
import {
	clearUserMessage,
	clearInput,
	startSpinnerPreloader,
	endSpinnerPreloader,
	pushRateToMovie,
	parseData,
	addNewMovies,
	getMoviesIds,
	clearMovieData,
	makeResultsDefault
} from './working-functions';
import {mySwiper} from "./slider-swiper";

document.addEventListener("DOMContentLoaded", function(event) {

	let userMessage = elMessage.textContent;

	const targetUrl = `https://www.omdbapi.com/?s=sea&apikey=${apikey}&page=1`;
	const requestDefaultMovies = fetch(targetUrl);

	startSpinnerPreloader();
	requestDefaultMovies
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
		})
		.then((moviesData) => {
			// console.log('parse on load!');
			parseData(moviesData);
		})
		.catch((error) => {
			elMessage.textContent = `${error}`;
		});


	mySwiper.on('reachEnd', async () => {
		// console.log('reach end');
		makeResultsDefault();
	});

});




