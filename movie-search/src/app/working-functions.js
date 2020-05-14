import {
	apikey,
	cardWrapper,
	elLoadIcon,
	elMessage,
	elSearchInput
} from "./consts";
import mySwiper from "./slider-swiper";
import {opts} from "./api";
import {Spinner} from "spin.js";

let userMessage = elMessage.textContent;
let arrOfIds = [];
let page = 2;

async function parseData(data) {
	for await (let i of data.Search) {
		let title = i.Title;
		let year = i.Year;
		let id = i.imdbID;
		arrOfIds.push(id);
		let poster;

		if (i.Poster === 'N/A') {
			poster = `../assets/img/noimage.gif`;
		} else {
			poster = i.Poster;
			let movieCard = document.createElement('div');
			movieCard.classList.add('movie-card', 'swiper-slide');

			movieCard.innerHTML = `
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0">
				<div class = "movie-rate" tabindex="0" id="${id}"></div>
				<div class="movie-year" tabindex="0" >${year}</div>
				<h5 class="movie-title" tabindex="0" >
					<a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a>
				</h5>
		`;
			cardWrapper.append(movieCard);

		}
		mySwiper.update();
	}
	getMoviesIds(arrOfIds);
	endSpinnerPreloader();
}


function pushRateToMovie(data) {
	let imdbIDRate = document.querySelector(`#${data.imdbID}`);
	if (imdbIDRate.id === data.imdbID) {
		imdbIDRate.innerHTML = `<i class="fa fa-star fa-sm text-warning" 
		aria-hidden="true"></i>
		${data.imdbRating}`;
	}
	else {
		return;
	}
}

async function addNewMovies(data) {
	console.log('add mew movies');
	mySwiper.isEnd = false;

	for await (let i of data.Search) {
		let title = i.Title;
		let year = i.Year;
		let id = i.imdbID;

		arrOfIds.push(id);
		let poster;

		if (i.Poster === 'N/A') {
			poster = `../assets/img/noimage.gif`;
		} else {
			poster = i.Poster;
			let movieCard = document.createElement('div');
			movieCard.classList.add('movie-card', 'swiper-slide');

			movieCard.innerHTML = `
				
			
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0" ">
			<div class = "movie-rate" tabindex="0" id="${id}"></div>
			<div class="movie-year" tabindex="0" >${year}</div>
			<h5 class="movie-title" tabindex="0" >
				<a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a>
			</h5>	
		`;
			cardWrapper.append(movieCard);
			//todo better use swiper.appendSlide
			// mySwiper.slideTo(mySwiper.slides.length - 10);
		}
	}

	// mySwiper.slideTo(mySwiper.slides.length - 10);

	mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
	mySwiper.navigation.update();
	getMoviesIds(arrOfIds);
}

async function getMoviesIds(arrOfIds) {
	for (let i of arrOfIds) {
		let url = `https://www.omdbapi.com/?i=${i}&apikey=${apikey}`;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				pushRateToMovie(data);
			})
			.catch(err => {
				// console.log(err);
			})
	}
}

function clearMovieData() {
	mySwiper.removeAllSlides();
}

function makeResults() {
	console.log('make results');

	let targetUrl = `https://www.omdbapi.com/?s=sea&apikey=${apikey}&page=${page}`;

	startSpinnerPreloader();

	fetch(targetUrl)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			userMessage = `Error:${response.status}: ${response.statusText}`;
			throw new Error(`${response.status}: ${response.statusText}`);
		})
		.then((moviesData) => {
			addNewMovies(moviesData);
			endSpinnerPreloader();
			console.log(mySwiper.slides.length)
		})
		.catch((error) => {
			userMessage = `Error:${response.status}: ${response.statusText}`;
			console.log(error)
		});
	page++;
}

function startSpinnerPreloader() {
	const spinner = new Spinner(opts).spin(elLoadIcon);
}

function endSpinnerPreloader() {
	elLoadIcon.innerHTML = '';
}

function clearInput() {
	elSearchInput.value = '';
}

function clearUserMessage() {
	userMessage = '';
}

export {
	clearUserMessage,
	clearInput,
	startSpinnerPreloader,
	endSpinnerPreloader,
	pushRateToMovie,
	parseData,
	addNewMovies,
	getMoviesIds,
	clearMovieData,
	makeResults
};