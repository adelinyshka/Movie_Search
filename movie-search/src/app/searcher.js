// import {
// 	elSearchInput,
// 	elSearchBtn,
// 	apikey,
// 	cardWrapper,
// 	elIconClear,
// 	elLoadIcon,
// 	elMessage
// } from './consts';
// import {Spinner} from 'spin.js';
//
// var opts = {
// 	lines: 12, // The number of lines to draw
// 	length: 6, // The length of each line
// 	width: 1, // The line thickness
// 	radius: 5, // The radius of the inner circle
// 	scale: 1, // Scales overall size of the spinner
// 	corners: 1, // Corner roundness (0..1)
// 	color: 'red', // CSS color or array of colors
// 	fadeColor: 'transparent', // CSS color or array of colors
// 	speed: 1, // Rounds per second
// 	rotate: 0, // The rotation offset
// 	animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
// 	direction: 1, // 1: clockwise, -1: counterclockwise
// 	zIndex: 2e9, // The z-index (defaults to 2000000000)
// 	className: 'spinner', // The CSS class to assign to the spinner
// 	top: '50%', // Top position relative to parent
// 	left: '50%', // Left position relative to parent
// 	shadow: '0 0 1px transparent', // Box-shadow for the lines
// 	position: 'absolute' // Element positioning
// };
//
// //todo сделать  переключение языков с русского на английский
//
// elSearchInput.focus();
// let urlToSendToApiDefault = `https://www.omdbapi.com/?s=dream&apikey=${apikey}&page=1`;
// callApi(urlToSendToApiDefault);
//
// let urlToSendToApi;
//
// function callYaApi(userInput) {
// 	let yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';
// 	let url = `https://translate.yandex.net/api/v1.5/tr.json/translate
// ?key=${yaApi}
// &text=${userInput}
// &lang=ru-en
// &format=plain
// `;
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
// 			// console.log(data)
//
// 			generateEnglishInput(data);
// 		});
// }
//
//
// // returnRate('tt0180093');
//
//
// //  returnRate(id).then((x) => {
// // 	rim = `<div class = "movie-rate" tabindex="0" id="${id}">
// // 				<i id="${id}" class="fa fa-star fa-sm text-warning" aria-hidden="true"></i>
// // 				${x}
// // 				</div>`;
//
//
// function generateEnglishInput(data) {
// 	elMessage.textContent = `No result found for ... "${data.text}"`;
// 	// generateUrl(data);
// }
//
// function generateUrl(data) {
// 	urlToSendToApi = `https://www.omdbapi.com/?s=${data.text}&apikey=${apikey}`;
// 	return urlToSendToApi;
// }
//
//
// async function generateMovieCards(data) {
//
// 	let arrOfIds = [];
//
// 	let userInput = elSearchInput.value;
//
// 	if (data.Response === 'False') {
// 		elMessage.textContent = `No result found for ... "${userInput}"`;
// 	} else {
//
//
// 		elMessage.textContent = '';
//
// 		// for await(let i of data.Search) {
// 		// 	let title = i.Title;
// 		// 		let poster = i.Poster;
// 		// 		let year = i.Year;
// 		// 		let id = i.imdbID;
// 		// 		arrOfIds.push(id);
// 		//
// 		// 	async function sendRequest(arrOfIds) {
// 		// 		let arrofRate = [];
// 		// 		for (let item of arrOfIds) {
// 		// 			let url = `https://www.omdbapi.com/?i=${item}&apikey=${apikey}`;
// 		// 			fetch(url)
// 		// 				.then(res => res.json())
// 		// 				.then(data => {
// 		// 					arrofRate.push(data.imdbRating);
// 		// 				})
// 		// 		}
// 		// 		return arrofRate;
// 		// 	}
// 		//
// 		// 	async function returnRate() {
// 		// 		let result = await sendRequest(arrOfIds);
// 		// 	}
// 		//
// 		// 	let hello = new Promise(function (resolve,reject) {
// 		// 		if(returnRate()){
// 		// 			console.log('ok')
// 		// 		}
// 		// 		resolve(console.log('yes') );
// 		//
// 		// 	});
// 		//
// 		// 		let movieCard = document.createElement('div');
// 		// 		movieCard.classList.add('movie-card', 'swiper-slide');
// 		//
// 		// 		movieCard.innerHTML = `
// 		// 		<h5 class="movie-title" tabindex="0" >${title}</h5>
// 		// 		<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0" ">
// 		// 		<div class="movie-year" tabindex="0" >${year}</div>
// 		// 		<div class = "movie-rate" tabindex="0" id="${id}">
// 		// 			<i id="${id}" class="fa fa-star fa-sm text-warning" aria-hidden="true"></i>
// 		// 			${id}
// 		// 		</div>
// 		// 	`;
// 		//
// 		// 	cardWrapper.append(movieCard);
// 		//
// 		//
// 		// }
//
// 		for (let i = 0; i < data.Search.length; i++) {
// 			let title = data.Search[i].Title;
// 			let poster = data.Search[i].Poster;
// 			let year = data.Search[i].Year;
// 			let id = data.Search[i].imdbID;
//
// 			arrOfIds.push(id);
//
// 			let movieCard = document.createElement('div');
// 			movieCard.classList.add('movie-card', 'swiper-slide');
//
// 			movieCard.innerHTML = `
// 			<h5 class="movie-title" tabindex="0" >${title}</h5>
// 			<img class = "movie-pic" src="${poster}" alt="${title}  tabindex="0" ">
// 			<div class="movie-year" tabindex="0" >${year}</div>
// 			<div class = "movie-rate" tabindex="0" id="${id}">
// 				<i id="${id}" class="fa fa-star fa-sm text-warning" aria-hidden="true"></i>
// 				${id}
// 			</div>
// 		`;
//
// 			cardWrapper.append(movieCard);
//
// 		}
//
// 		// async function sendRequest(arrOfIds) {
// 		// 	let arrofRate = [];
// 		// 	for (let item of arrOfIds) {
// 		// 		let url = `https://www.omdbapi.com/?i=${item}&apikey=${apikey}`;
// 		// 		fetch(url)
// 		// 			.then(res => res.json())
// 		// 			.then(data => {
// 		// 				arrofRate.push(data.imdbRating);
// 		// 			})
// 		// 	}
// 		// 	return arrofRate;
// 		// }
// 		//
// 		// async function returnRate() {
// 		// 	let result = await sendRequest(arrOfIds);
// 		// 	return result;
// 		// }
// 		//
// 		// async function tryIt() {
// 		// 	let xxx = await returnRate();
// 		// 	xxx.forEach(item => {
// 		// 		console.log(item);
// 		// 	})
// 		// }
// 		//
// 		// tryIt();
//
// 	}
//
//
// }
//
//
// function clearMovieData() {
// 	cardWrapper.innerHTML = '';
// }
//
// function callApi(url) {
// 	var spinner = new Spinner(opts).spin(elLoadIcon);
//
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
// 			callYaApi(elSearchInput.value);
// 			generateMovieCards(data);
// 			elLoadIcon.textContent = '';
// 		})
//
// }
//
// // async function getRaiting(prop){
// // 	try{
// // 		const {imdbId} = prop;
// // 		const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${apikey}`;
// // 		const res = await fetch(url);
// // 		const data = await res.json();
// // 		Object.assign(prop,data);
// // 		return data;
// //
// // 	}
// // 	catch(e){
// // 		console.error(e);
// // 	}
// //
// // }
//
//
// elSearchBtn.addEventListener('click', function (e) {
// 	e.preventDefault();
//
//
// 	elSearchInput.focus();
// 	let userInput = elSearchInput.value;
//
// 	clearMovieData();
//
// 	let urlToSendToApi = `https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}`;
// 	callApi(urlToSendToApi);
//
// 	elSearchInput.focus();
//
// 	if (elSearchInput.value !== '') {
// 		elIconClear.classList.remove('hidden');
// 		elIconClear.classList.add('shown');
// 	} else {
// 		elIconClear.classList.remove('shown');
// 		elIconClear.classList.add('hidden');
// 	}
//
// 	if (elIconClear.classList.contains('shown')) {
// 		elIconClear.addEventListener('click', function () {
// 			elMessage.textContent = '';
// 			elSearchInput.value = '';
// 			elIconClear.classList.remove('shown');
// 			elIconClear.classList.add('hidden');
// 		})
// 	}
//
// });
//
