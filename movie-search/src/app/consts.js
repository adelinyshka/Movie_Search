const elSearchInput = document.querySelector('#movie-input');
const elSearchBtn = document.querySelector('#buttonSearch');
const apikey = '8abfe35c';
const cardWrapper = document.querySelector('#movies-wrapper');
const elIconClear = document.querySelector('#icon-clear');
const elLoadIcon = document.querySelector('#load-icon');
const elMessage = document.querySelector('#message');
const cross = document.querySelector('.with-cross');
const yaApi = 'trnsl.1.1.20200507T172307Z.9cd6f5e16be3ab0b.2f6b74e3ebb2279b7c6daa0f69031c5a7f3f314f';
const pattern = /([а-я]+)/ui;

export {yaApi,pattern,cross,elSearchInput, elSearchBtn,apikey,cardWrapper,elIconClear,elLoadIcon,elMessage};