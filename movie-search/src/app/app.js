import {
	apikey, cardWrapper,
	elIconClear, elLoadIcon,
	elMessage,
	elSearchBtn,
	elSearchInput,
} from "./consts";
import {Spinner} from "spin.js";
import {opts, parseData, pushRateToMovie, getMoviesIds,	proxyUrl} from './api';

elSearchBtn.addEventListener('click', function (e) {
	e.preventDefault();
	elSearchInput.focus();
	let userInput = elSearchInput.value;
	// clearMovieData();
	// let urlToSendToApi = proxyUrl+`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}`;
	// callApi(urlToSendToApi);
	// callRate(userInput);
	translateAllToEng(userInput);
	elSearchInput.focus();

	if (elSearchInput.value !== '') {
		elIconClear.classList.remove('hidden');
		elIconClear.classList.add('shown');
	} else {
		elIconClear.classList.remove('shown');
		elIconClear.classList.add('hidden');
	}

	if (elIconClear.classList.contains('shown')) {
		elIconClear.addEventListener('click', function () {
			elMessage.textContent = '';
			elSearchInput.value = '';
			elIconClear.classList.remove('shown');
			elIconClear.classList.add('hidden');
		})
	}

});



function callRate(userInput) {
	const requestWord = fetch(proxyUrl+`https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}&page=1`);

	requestWord
		.then((response) => response.json())
		.then(data => {
			getMoviesIds(data.Search);
			elLoadIcon.textContent = ''
		})
		.catch((error) => {
			console.log(error)
		});
}


function callApi(url) {
	let userInput = elSearchInput.value;
	var spinner = new Spinner(opts).spin(elLoadIcon);
	let btnSearch = document.querySelector('.btn-search');
	btnSearch.text = 'Searching';

	return fetch(url)
		.then((response) => {
			var spinner = new Spinner(opts).spin(elLoadIcon);
			if (response.ok) {
				return response.json();
			}
			elMessage.textContent = `No result found for ... ${userInput}`;
		})
		.then(data => {
			// callYaApi(elSearchInput.value);
			parseData(data);
			elLoadIcon.textContent = '';
			btnSearch.text = 'Search';
		})
		.catch((error) => {
			console.log(error)
		});
}


function callYaApi(userInput) {
	let yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';
	let url = `https://translate.yandex.net/api/v1.5/tr.json/translate
?key=${yaApi}
&text=${userInput}
&lang=ru-en
&format=plain
`;
	return fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data.code !== 200) {
				generateEnglishInput(data);
			}

		});
}



function clearMovieData() {
	cardWrapper.innerHTML = '';
}

function generateEnglishInput(data) {

	elMessage.textContent = `No result found for ... "${data.text}"`;
	// generateUrl(data);
}

async function translateAllToEng(input) {
	let yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';
	let url = proxyUrl+`https://translate.yandex.net/api/v1.5/tr.json/translate
?key=${yaApi}
&text=${input}
&lang=ru-en
&format=plain
`;
	 fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data.code !== 200) {
				console.log('error' + data)
			}
			else{
				clearMovieData();
				let urlToSendToApi = proxyUrl+`https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}`;
				callApi(urlToSendToApi);
				callRate(data.text);
			}
		})
	.catch((error) =>{
		console.log(error)
	})

}