import {
	apikey, cardWrapper,btnSearch,
	elIconClear, elLoadIcon,
	elMessage,
	elSearchBtn,
	elSearchInput,
} from "./consts";
import {Spinner} from "spin.js";
import {opts} from './api';
import keyboard from "swiper/src/components/keyboard/keyboard";
import {clearUserMessage,clearInput,startSpinnerPreloader,endSpinnerPreloader,pushRateToMovie,parseData,addNewMovies,getMoviesIds,clearMovieData,makeResults} from './working-functions';

clearInput();
let userMessage = elMessage.textContent;
elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();
	startSpinnerPreloader();

	const userInput = elSearchInput.value;
	if (userInput.length < 3) {
		userMessage = 'Введите минимум 3 символа';
	} else {
		userMessage = `Looking for ... ${userInput}`;
		translateAllToEng(userInput);
	}
	elSearchInput.focus();
});

// elIconClear.addEventListener('click', function (e) {
// 	// e.preventDefault();
// 	clearUserMessage();
// 	clearInput();
// });


function callRate(userInput) {

	const requestWord = fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}&page=1`);

	requestWord
		.then((response) => response.json())
		.then(data => {
			getMoviesIds(data.Search);
			btnSearch.textContent = 'Search';
			elLoadIcon.innerHTML = '';

		})
		.catch((error) => {
			console.log(error)
		});
}


function callApi(url) {
	let userInput = elSearchInput.value;
	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			// console.log('oops')
			userMessage = `No result found for ... ${userInput}`;
		})
		.then(data => {
			if(data.Response === 'False') {
				userMessage = `No result found for ... ${userInput}`;
			}
			else {
				parseData(data);
			}
		})
		.catch((error) => {
			console.log(error)
			userMessage = `Ошибка: ${error}`;
		});
}


async function translateAllToEng(input) {

	var spinner = new Spinner(opts).spin(elLoadIcon);
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
			if (data.code !== 200) {
				console.log(data.code)
				userMessage = `No results were found for … ${input}`;
			} else {
				let urlToSendToApi = `https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}`;
				callApi(urlToSendToApi);
				callRate(data.text);
				btnSearch.textContent = 'Search';
				userMessage = `Showing results for ... ${data.text}`;
			}
		})
		.catch((error) => {
			console.log(error);
			userMessage = `Ошибка: ${error}`;
		})
}

// const formMovie = document.querySelector('#searchMovieForm');
//
// document.addEventListener('keydown', function(e){
// 	e.preventDefault();
// 	if (e.keyCode === 13) {
// 		const userInput = elSearchInput.value;
// 		if (userInput.length < 3) {
// 			userMessage = 'Введите минимум 3 символа';
// 		} else {
// 			userMessage = `Looking for ... ${userInput}`;
// 			translateAllToEng(userInput);
// 		}
// 		elSearchInput.focus();
// 	}
// 	if(e.keyCode === 27) {
// 		elSearchInput.focus();
// 	}
// });

export {translateAllToEng}