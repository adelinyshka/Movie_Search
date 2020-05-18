import {
	apikey, btnSearch,
	cardWrapper,
	elLoadIcon,
	elMessage,
	elSearchInput,
} from "./consts";
import {mySwiper, opts} from "./slider-swiper";
import {Spinner} from "spin.js";
let userInput = elSearchInput.value;
// let userMessage = elMessage.textContent;

let arrOfIds = [];

async function createCards(data) {
	console.log('create cards')

	for await (let i of data.Search) {
		let title = i.Title;
		let year = i.Year;
		let id = i.imdbID;
		let poster;

		arrOfIds.push(id);

		if (i.Poster === 'N/A') {
			poster = `../assets/img/noimage.gif`;
		} else {
			poster = i.Poster;
		}
		let movieCard = document.createElement('div');
		movieCard.classList.add('swiper-slide');

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
	return arrOfIds;
}

async function parseData(data) {
	console.log('parseData on default' + data);
	// clearCardWrapper();
// 	await createCards(data);
// 	mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
// // mySwiper.navigation.update();
// 	await getRating(arrOfIds);
// 	endSpinnerPreloader();
}

async function pushRateToMovie(data) {
	console.log('push rate to movie')
	// let imdbIDRate = await document.querySelector(`#${data.imdbID}`);
	// imdbIDRate.innerHTML = `<i class="fa fa-star fa-sm text-warning"
	// 	aria-hidden="true"></i>
	// 	${data.imdbRating}`;
}

async function addNewMovies(data) {
	// console.log('add mew movies');
	console.log('add New Movies' + data);
	// await createCards(data);
	// await getRating(arrOfIds);
}

async function getRating() {
	console.log('get movies ids');
	// for await (let i of arrOfIds) {
	// 	let url = `https://www.omdbapi.com/?i=${i}&apikey=${apikey}`;
	// 	fetch(url)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			pushRateToMovie(data);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})
	// }

}

async function clearCardWrapper() {
	console.log('i clear movie data');
	mySwiper.isEnd = true;
	// mySwiper.removeAllSlides();
	cardWrapper.innerHTML = '';
}

// let page = 2;

// makeResultsDefault -> addCardsByClick
async function addCardsByClick(input, page) {
	mySwiper.isEnd = false;
	console.log('addCardsByClick with input = ' + input);
	let targetUrl = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}&page=${page}`;
	startSpinnerPreloader();
	fetch(targetUrl)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
			throw new Error(`${response.status}: ${response.statusText}`);
		})
		.then((moviesData) => {
			createCards(moviesData);
			getRating(arrOfIds);
			endSpinnerPreloader();
			console.log(mySwiper.slides.length)
		})
		.catch((error) => {
			elMessage.textContent = `Ошибка: ${error}`;
			console.log(error)
		})


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
	elMessage.textContent = '';
}

//todo delete func
function callRate(userInput) {
	console.log('call rate of input:' + userInput);

	const requestWord = fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}&page=1`);

	requestWord
		.then((response) => response.json())
		.then(data => {
			getRating(data.Search);
			btnSearch.textContent = 'Search';
			elLoadIcon.innerHTML = '';
			elMessage.textContent = `Showing results for ${userInput}`;

		})
		.catch((error) => {
			elMessage.textContent = `Ошибка: ${error}`;
			console.log(error)
		});
}

async function getApiMoviesData(url) {
	console.log('fetch movie api');

	clearCardWrapper();

	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			elMessage.textContent = `No result found for ${userInput}`;
		})
		.then(data => {
			console.log('inside call Api' + data);
			if (data.Response === 'False') {
				elMessage.textContent = `No result found for ${userInput}`;
			} else {
				parseData(data);
			}
		})
		.catch((error) => {
			console.log(error);
			elMessage.textContent = `Ошибка: ${error}`;
		});
}

//page
async function translateAllToEng(input,page) {
	mySwiper.isEnd = false;
	console.log('start func translateAllToEng with input: ' + input);
	// btnSearch.textContent = 'Searching';

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
			// return data.text;
			if (data.code !== 200) {
				elMessage.textContent = `No results were found for ${data.text}`;
			} else {
				console.log('word is translated');
				clearCardWrapper();

				let urlToSendToApi = `https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}&page=${page}`;
				fetch(urlToSendToApi)
					.then((response) => {
						if (response.ok) {
							return response.json();
						}
						elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
					})
					.then((moviesData) => {
						createCards(moviesData);
						getRating(arrOfIds);
						endSpinnerPreloader();
						console.log(mySwiper.slides.length)
					})
					.catch((error) => {
						elMessage.textContent = `Ошибка: ${error}`;
					});
				// getApiMoviesData(urlToSendToApi);
				// elMessage.textContent = `Showing results for ${data.text}`;
				// // callRate(data.text);
				// btnSearch.textContent = 'Search';
				// makeResultsSearch(data.text);
			}

		})
		.catch((error) => {
			console.log(error);
			elMessage.textContent = `Ошибка: ${error}`;
		})
}

// const translatedWord = translateAllToEng(input);
//
// mySwiper.on('reachEnd', async () => {
// 	page++;
// 	mySwiper.slideTo(mySwiper.slides.length - 10 - mySwiper.params.breakpoints[mySwiper.currentBreakpoint].slidesPerView);
// 	mySwiper.navigation.update();
// 	console.log('im broken')
// });


async function makeResultsSearch(input) {

	console.log('make results with SEARCH results');
	let targetUrl = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}&page=${page}`;
	startSpinnerPreloader();
	fetch(targetUrl)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
			throw new Error(`${response.status}: ${response.statusText}`);
		})
		.then((moviesData) => {

			addNewMovies(moviesData);
			endSpinnerPreloader();

			console.log(mySwiper.slides.length)
		})
		.catch((error) => {
			elMessage.textContent = `Ошибка: ${error}`;
			console.log(error);
		});
}


export {
	translateAllToEng,
	getApiMoviesData,
	callRate,
	clearUserMessage,
	clearInput,
	startSpinnerPreloader,
	endSpinnerPreloader,
	pushRateToMovie,
	parseData,
	addNewMovies,
	getRating,
	clearCardWrapper,
	addCardsByClick,
};