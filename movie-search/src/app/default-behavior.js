import {apikey, elLoadIcon, elMessage, elSearchInput,btnSearch} from "./consts";
import {Spinner} from "spin.js";
import {opts} from "./api";
import {clearUserMessage,clearInput,startSpinnerPreloader,endSpinnerPreloader,pushRateToMovie,parseData,addNewMovies,getMoviesIds,clearMovieData,makeResults} from './working-functions';
import mySwiper from "./slider-swiper";

let userMessage = elMessage.textContent;

let targetUrl = `https://www.omdbapi.com/?s=sea&apikey=${apikey}&page=1`;

const requestDefaultMovies = fetch(targetUrl);

startSpinnerPreloader();

requestDefaultMovies
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
		userMessage = `Error:${response.status}: ${response.statusText}`;
	})
	.then((moviesData) => {
		clearMovieData();
		parseData(moviesData);
	})
	.catch((error) => {
		userMessage = `${error}`;
	});
