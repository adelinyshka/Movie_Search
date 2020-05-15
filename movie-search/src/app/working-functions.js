import {
	apikey, btnSearch,
	cardWrapper,
	elLoadIcon,
	elMessage,
	elSearchInput
} from "./consts";
import {mySwiper, opts} from "./slider-swiper";
import {Spinner} from "spin.js";

let userMessage = elMessage.textContent;

let arrOfIds = [];


async function parseData(data) {
	clearMovieData();
	console.log('parseData on default' + data);

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
			movieCard.classList.add( 'swiper-slide');

			movieCard.innerHTML = `
<div class = 'movie-card'>
<div class = "movie-rate" tabindex="0" id="${id}"></div>
			
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0">
				
				<div class="movie-year" tabindex="0" >${year}</div>
				<h5 class="movie-title" tabindex="0" >
					<a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a>
				</h5>
				</div>
		`;
			cardWrapper.append(movieCard);
		}
		mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
		mySwiper.navigation.update();
	}
	getMoviesIds(arrOfIds);
	endSpinnerPreloader();

}

async function parseDataOnSearch(data) {
	clearMovieData();
	console.log('parse data On Search' + data);

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
			movieCard.classList.add( 'swiper-slide');

			movieCard.innerHTML = `
<div class = 'movie-card'>
				<div class = "movie-rate" tabindex="0" id="${id}"></div>
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0">
				<div class="movie-year" tabindex="0" >${year}</div>
				<h5 class="movie-title" tabindex="0" >
					<a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a>
				</h5>
				</div>
		`;
			cardWrapper.append(movieCard);
		}
		mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
		mySwiper.navigation.update();
	}
	getMoviesIds(arrOfIds);

	endSpinnerPreloader();
}


function pushRateToMovie(data) {
	// console.log('push rate to movie')
	let imdbIDRate = document.querySelector(`#${data.imdbID}`);
	if (imdbIDRate.id === data.imdbID) {
		imdbIDRate.innerHTML = `<i class="fa fa-star fa-sm text-warning" 
		aria-hidden="true"></i>
		${data.imdbRating}`;
	} else {
		return;
	}
}

async function addNewMovies(data) {
	// console.log('add mew movies');
	console.log('add New Movies' + data);
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
			movieCard.classList.add( 'swiper-slide');

			movieCard.innerHTML = `
<div class = 'movie-card'>
			<div class = "movie-rate" tabindex="0" id="${id}"></div>
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0">
				<div class="movie-year" tabindex="0" >${year}</div>
				<h5 class="movie-title" tabindex="0" >
					<a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a>
				</h5>
			</div>
		`;
			cardWrapper.append(movieCard);
			//todo better use swiper.appendSlide
		}
		// mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
		mySwiper.navigation.update();
	}
	getMoviesIds(arrOfIds);
}


async function getMoviesIds(arrOfIds) {
	console.log('get movies ids');
	for (let i of arrOfIds) {
		let url = `https://www.omdbapi.com/?i=${i}&apikey=${apikey}`;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				pushRateToMovie(data);
			})
			.catch(err => {
				console.log(err);
			})
	}

}

function clearMovieData() {
	mySwiper.removeAllSlides();
	cardWrapper.innerHTML = '';
	console.log('i clear movie data')
}

let page = 2;

function makeResultsDefault() {
	console.log('make results with default results');
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
			elMessage.textContent = `Ошибка: ${error}`;
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

function callRate(userInput) {
	console.log('call rate of input:' + userInput);

	const requestWord = fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}&page=1`);

	requestWord
		.then((response) => response.json())
		.then(data => {
			getMoviesIds(data.Search);
			btnSearch.textContent = 'Search';
			elLoadIcon.innerHTML = '';
			elMessage.textContent = `Showing results for ${userInput}`;

		})
		.catch((error) => {
			elMessage.textContent = `Ошибка: ${error}`;
			console.log(error)
		});
}

async function callApi(url) {
	console.log('fetch movie api');
	let userInput = elSearchInput.value;

	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			userMessage = `No result found for ${userInput}`;
		})
		.then(data => {
			console.log('inside call Api' + data);
			if (data.Response === 'False') {
				userMessage = `No result found for ${userInput}`;
			} else {
				parseDataOnSearch(data);
			}
		})
		.catch((error) => {
			console.log(error);
			userMessage = `Ошибка: ${error}`;
		});
}


async function translateAllToEng(input) {
	console.log('start func translateAllToEng with input: ' + input);
	// var spinner = new Spinner(opts).spin(elLoadIcon);
	btnSearch.textContent = 'Searching';
	let yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';
	let url = `https://translate.yandex.net/api/v1.5/tr.json/translate
?key=${yaApi}
&text=${input}
&lang=ru-en
&format=plain
`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			console.log(data.text)
			if (data.code !== 200) {
				userMessage = `No results were found for ${data.text}`;
			} else {
				clearMovieData();

				console.log('word is translated');
				let urlToSendToApi = `https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}`;
				callApi(urlToSendToApi);
				userMessage = `Showing results for ${data.text}`;
				callRate(data.text);
				btnSearch.textContent = 'Search';
			}

		})
		.catch((error) => {
			console.log(error);
			userMessage = `Ошибка: ${error}`;
		})

}


function makeResultsSearch(input) {
	console.log('make results with SEARCH results');
	let targetUrl = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}&page=${page}`;
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
			elMessage.textContent = `Ошибка: ${error}`;
			console.log(error)
		});
	page++;
}


export {
	translateAllToEng,
	callApi,
	callRate,
	clearUserMessage,
	clearInput,
	startSpinnerPreloader,
	endSpinnerPreloader,
	pushRateToMovie,
	parseData,
	addNewMovies,
	getMoviesIds,
	clearMovieData,
	makeResultsDefault,
	parseDataOnSearch
};