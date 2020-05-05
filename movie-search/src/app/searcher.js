import {elSearchInput, elSearchBtn,apikey,cardWrapper,elIconClear,elLoadIcon,elMessage} from './consts';
import {Spinner} from 'spin.js';

var opts = {
	lines: 12, // The number of lines to draw
	length: 6, // The length of each line
	width: 1, // The line thickness
	radius: 5, // The radius of the inner circle
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
	position: 'absolute' // Element positioning
};

// todo сделать рейтинг
//todo сделать  переключение языков с русского на английский
//todo сделать вывод сообщения

elSearchInput.focus();

function generateMovieCards(data) {

	let userInput = elSearchInput.value;

	if (data.Response === 'False') {
		elMessage.textContent = `No result found for ... "${userInput}"`;
	} else {
		elMessage.textContent = '';
		for(let i = 0; i<data.Search.length;i++) {

			let title = data.Search[i].Title;
			let poster = data.Search[i].Poster;
			let year = data.Search[i].Year;
			let id = data.Search[i].imdbID;


			let movieCard = document.createElement('div');
			movieCard.classList.add('movie-card','swiper-slide');

			movieCard.innerHTML =`
			<h5 class="movie-title" tabindex="0" >${title}</h5>
			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0" ">
			<div class="movie-year" tabindex="0" >${year}</div>
			<div class = "movie-rate" tabindex="0" >
				<i id="movie-rating" class="fa fa-star fa-sm text-warning" aria-hidden="true"></i>
rate
			</div>
		`;

			cardWrapper.append(movieCard)
		}
	}
}

function clearMovieData() {
	cardWrapper.innerHTML = '';
}

function callApi(url) {
	var spinner = new Spinner(opts).spin(elLoadIcon);
	console.log(elLoadIcon);

	return fetch(url)
		.then(res => res.json())
		.then(data => {
			// if(data.Response === 'False') {
			// 	console.log('im false')
			// } else {
			// 	console.log('im true')
			// }

			generateMovieCards(data);
			elLoadIcon.textContent = '';
		});
}


let urlToSendToApiDefault = `https://www.omdbapi.com/?s=dream&apikey=${apikey}&`;
callApi(urlToSendToApiDefault);

elSearchBtn.addEventListener('click', function (e) {
	clearMovieData();
	elSearchInput.focus();

	let userInput = elSearchInput.value;
	let urlToSendToApi = `https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}`;

	e.preventDefault();
	callApi(urlToSendToApi);
	elSearchInput.focus();

	if(elSearchInput.value !== '') {
		elIconClear.classList.remove('hidden');
		elIconClear.classList.add('shown');
	} else {
		elIconClear.classList.remove('shown');
		elIconClear.classList.add('hidden');
	}

	if(elIconClear.classList.contains('shown')) {
		elIconClear.addEventListener('click', function () {
			elMessage.textContent = '';
			elSearchInput.value = '';
			elIconClear.classList.remove('shown');
			elIconClear.classList.add('hidden');
		})
	}
});



// function generateRate() {
//
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
// 			data;
// 		});
// 	let url = `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`;
//
// 	arrOfPlaceForRating.forEach(item => {
//
// 		return fetch(url)
// 			.then(res => res.json())
// 			.then(data => {
// 				console.log(data.imdbRating);
// 			});
//
// 	})
//
// }

// function getRating(id) {
// 	let url = `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`;
//
// 	return fetch(url)
// 		.then(res => res.json())
//
// 		.then(data => {
// 			data.imdbRating;
// 		});
//
// }
//
//
// getRating('tt0180093');