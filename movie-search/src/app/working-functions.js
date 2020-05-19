import {
	apikey,
	cardWrapper,
	elLoadIcon,
	elMessage,
	elSearchInput,
} from "./consts";
import {mySwiper} from "./slider";
import {Spinner} from "spin.js";
import {opts} from './preloader';

let arrOfIds = [];

async function translateAllToEng(input, page) {

	mySwiper.isEnd = false;

	let yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';

	const pattern = /([а-я]+)/ui;

	let urlToSendToApi;

	if (pattern.test(input)) {

		let url = `https://translate.yandex.net/api/v1.5/tr.json/translate
?key=${yaApi}
&text=${input}
&lang=ru-en
&format=plain
`;

		console.log('yes i have ru letters')

		fetch(url)
			.then(res => res.json())

			.then(data => {
				if (data.code !== 200) {
					elMessage.textContent = `No results were found for ${data.text} + code error: ${data.code}`;
					endSpinnerPreloader();
				} else {

					urlToSendToApi = `https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}&page=${page}`;
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
							elMessage.textContent = `Showing results for ...`;
						})
						.catch((error) => {
							console.log(error)
							elMessage.textContent = `Ошибка: ${error}`;
						});

					callRate(data.text);
					endSpinnerPreloader()
				}
			})
			.catch((error) => {
				elMessage.textContent = `Ошибка: ${error}`;
			});
	} else {
		console.log('no i dont');

		urlToSendToApi = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}&page=${page}`;
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
				elMessage.textContent = `Showing results for ...`;
			})
			.catch((error) => {
				console.log(error)
				elMessage.textContent = `Ошибка: ${error}`;
			});

		callRate(input);
		endSpinnerPreloader()
	}

}


async function createCards(data) {
	try {
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
	} catch (err) {
		translateAllToEng('sea', 1);
		elMessage.textContent += `Error: ${err} No result for...`;
	}
}

async function getRating() {
	for await (let i of arrOfIds) {
		let url = `https://www.omdbapi.com/?i=${i}&apikey=${apikey}`;
		fetch(url)
			.then(response => response.json())
			.then(data => {
				const imdbIDRate = document.querySelector(`#${data.imdbID}`);
				if (imdbIDRate) {
					imdbIDRate.innerHTML = `<i class="fa fa-star fa-sm text-warning"
		aria-hidden="true"></i> ${data.imdbRating}`;
				}
			})
	}
}

async function callRate(userInput) {

	const requestWord = fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}&page=1`);

	requestWord
		.then((response) => response.json())
		.then(data => {
			getRating(data.Search);
		})
		.catch((error) => {
			elMessage.textContent = `Ошибка: ${error}`;
		});
}


async function clearCardWrapper() {
	mySwiper.isEnd = true;
	cardWrapper.innerHTML = '';
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

function clearMessageToUser() {
	elMessage.textContent = '';
}


export {
	translateAllToEng,
	callRate,
	clearMessageToUser,
	clearInput,
	startSpinnerPreloader,
	endSpinnerPreloader,
	getRating,
	clearCardWrapper,
};