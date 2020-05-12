import {
	apikey,
	cardWrapper,
	elIconClear,
	elLoadIcon,
	elMessage,
	elSearchInput,
	elSearchBtn,
} from './consts';
import {
	Spinner
} from 'spin.js';
import swiper from './slider-swiper';


 const opts = {
	lines: 12, // The number of lines to draw
	length: 6, // The length of each line
	width: 1, // The line thickness
	radius: 10, // The radius of the inner circle
	scale: 1, // Scales overall size of the spinner
	corners: 1, // Corner roundness (0..1)
	color: 'red', // CSS color or array of colors
	fadeColor: 'transparent', // CSS color or array of colors
	speed: 1, // Rounds per second
	rotate: 0, // The rotation offset
	animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
	direction: 1, // 1: clockwise, -1: counterclockwise
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	className: 'spinner', // The CSS class to assign to the spinner
	top: '50%', // Top position relative to parent
	left: '50%', // Left position relative to parent
	shadow: '0 0 1px transparent', // Box-shadow for the lines
	position: 'absolute', // Element positioning
};

elSearchInput.focus();

let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = `https://www.omdbapi.com/?s=dream&apikey=${apikey}&page=1`;

const requestDefaultMovies = fetch(proxyUrl+targetUrl);

requestDefaultMovies
	.then((response) => {
		var spinner = new Spinner(opts).spin(elLoadIcon);
		if (response.ok) {
			return response.json();
		}
		throw new Error(`Error status: ${response.status}, info: ${response.statusText}`);
	})
	.then((moviesData) => {
		parseData(moviesData)
	})
	.catch((error) => {
		console.log(error)
	});

const requestDefaultMovies2 = fetch(proxyUrl+targetUrl);

requestDefaultMovies2
	.then((response) => response.json())
	.then(data => {
		getMoviesIds(data.Search);
		elLoadIcon.textContent = ''
	})
	.catch((error) => {
		console.log(error)
	});

function getMoviesIds(data) {

	for (let i of data) {
		let ix = i.imdbID;
		let url = proxyUrl+`https://www.omdbapi.com/?i=${ix}&apikey=${apikey}`;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				pushRateToMovie(data)})
	}
}

function pushRateToMovie(data) {
	let x = document.querySelector(`#${data.imdbID}`);
	if(x.id === data.imdbID) {
		x.innerHTML = `<i class="fa fa-star fa-sm text-warning" 
		aria-hidden="true"></i>
		${data.imdbRating}`;

	}
}

async function parseData(data) {

			for await (let i of data.Search) {
				let title = i.Title;
				let poster = i.Poster;
				let year = i.Year;
				let id = i.imdbID;

				let movieCard = document.createElement('div');
				movieCard.classList.add('movie-card', 'swiper-slide');

				movieCard.innerHTML = `
			<h5 class="movie-title" tabindex="0" ><a href="https://www.imdb.com/title/${id}/videogallery/">${title}</a></h5>
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0" ">
			<div class="movie-year" tabindex="0" >${year}</div>
			<div class = "movie-rate" tabindex="0" id="${id}">
			</div>
		`;
				cardWrapper.append(movieCard);

			}
			const mySwiper = document.querySelector('.swiper-container').swiper
			mySwiper.slideTo(0)

}



// function translateRuToEng(input) {
// 	let urlToTranslate = `${input}`;
// 	fetch(urlToTranslate)
// 		.then()
// 		.catch()
// }
//
//
//
//
//
// let wordToInput = translateRuToEng(input);

export {opts,parseData,pushRateToMovie,getMoviesIds, proxyUrl};