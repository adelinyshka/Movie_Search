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
import mySwiper from './slider-swiper';
import {Keyboard} from './keyboard';

//todo вместо не загруженных картинок - сделать картнку по умолчанию
//todo поиск по вводу с клавы
//todo слайдер после достижения конца страницы подвисает и стрелочка вправо не
// работает
var opts = {
	lines: 18, // The number of lines to draw
	length: 10, // The length of each line
	width: 1, // The line thickness
	radius: 15, // The radius of the inner circle
	scale: 1, // Scales overall size of the spinner
	corners: 1, // Corner roundness (0..1)
	color: 'white', // CSS color or array of colors
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



	let targetUrl = `https://www.omdbapi.com/?s=sea&apikey=${apikey}&page=1`;
	elSearchInput.focus();

	const requestDefaultMovies = fetch(targetUrl);

	let spinner = new Spinner(opts).spin(elLoadIcon);

	requestDefaultMovies
		.then((response) => {
			if (response.ok) {
				return response.json();
				console.log(response)
			}
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
			throw new Error(`${response.status}: ${response.statusText}`);
		})
		.then((moviesData) => {
			parseData(moviesData);
		})
		.catch((error) => {
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
			console.log(error)
		});

function pushRateToMovie(data) {
	let x = document.querySelector(`#${data.imdbID}`);
	if (x.id === data.imdbID) {
		x.innerHTML = `<i class="fa fa-star fa-sm text-warning" 
		aria-hidden="true"></i>
		${data.imdbRating}`;
	} else {
		return;
	}
}

let arrOfIds = [];

async function parseData(data) {
	clearMovieData();

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
		const mySwiper = document.querySelector('.swiper-container').swiper
		mySwiper.slideTo(0);
	}
	getMoviesIds(arrOfIds);
	elLoadIcon.innerHTML = '';
}

async function addNewMovies(data) {
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
		}
	}
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
				console.log(err);
			})
	}
}

function clearMovieData() {
	cardWrapper.innerHTML = '';
}

let page = 2;

function makeResults() {

	let targetUrl = `https://www.omdbapi.com/?s=sea&apikey=${apikey}&page=${page}`;
	let spinner = new Spinner(opts).spin(elLoadIcon);
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
			elLoadIcon.textContent = '';
			mySwiper.slideTo(mySwiper.length - 10);

		})
		.catch((error) => {
			elMessage.textContent = `Error:${response.status}: ${response.statusText}`;
			console.log(error)
		});
}

mySwiper.on('reachEnd', async () => {
	makeResults();
	page++;
});

const cross = document.querySelector('.with-cross');
cross.addEventListener('click',function (e) {
	e.preventDefault();
});




export {opts, parseData, getMoviesIds};