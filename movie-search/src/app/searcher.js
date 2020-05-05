import {elSearchInput, elSearchBtn,apikey,cardWrapper,elIconClear} from './consts';

// todo сделать рейтинг
//todo сделать  переключение языков с русского на английский
//todo сделать вывод сообщения

elSearchInput.focus();


// function getRating(id) {
// 	let url = `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`;
//
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
//
// 			console.log(data.imdbRating)
// 		});
// }


// function getRating2(id) {
// 	let url = `https://www.omdbapi.com/?i=${id}&apikey=${apikey}`;
//
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
//
// 			data.Ratings[0].Value;
// 		});
// }


function generateMovieCards(data) {

	for(let i = 0; i<data.Search.length;i++) {

		let title = data.Search[i].Title;
		let poster = data.Search[i].Poster;
		let year = data.Search[i].Year;
		let id = data.Search[i].imdbID;
		// let rate = getRating2(id);
		// ${rate}
		let movieCard = document.createElement('div');
		movieCard.classList.add('movie-card','swiper-slide');

		movieCard.innerHTML =`
			<h5 class="movie-title">${title}</h5>
			<img class = "movie-pic" src="${poster}" alt="${title}">
			<div class="movie-year">${year}</div>
			<div class = "movie-rate">
				<i class="fa fa-star fa-sm text-warning" aria-hidden="true"></i>
			rating
			</div>
		`;

		cardWrapper.append(movieCard)
	}

}

function clearMovieData() {
	cardWrapper.innerHTML = '';
}


function callApi(url) {
	return fetch(url)
		.then(res => res.json())
		.then(data => {
			generateMovieCards(data);
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
			elSearchInput.value = '';
			elIconClear.classList.remove('shown');
			elIconClear.classList.add('hidden');
		})
	}
});

