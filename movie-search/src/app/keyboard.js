import {elMessage, elSearchInput} from "./consts";
import {translateAllToEng} from './working-functions';
const formMovie = document.querySelector('#searchMovieForm');

class Keyboard {

	constructor() {
		this.shift = false;
		this.caps = false;
		this.ctrl = false;
		this.language = localStorage.getItem("language");
		this.keyFunctional = {};
		this.letterRu = {};
		this.keyNumRu = {};
		this.letterEng = {};
		this.keyNumEng = {};
		this.keyEl = {};
	}

//create keyboard
	keyboard() {

//textarea
		this.textarea = document.querySelector('#movie-input');
		this.textarea.setAttribute('autofocus', 'autofocus');

//kb wrapper
		this.keyboardWrapper = document.createElement('div');
		this.keyboardWrapper.classList.add('keyboard-wrapper','d-none');
		this.keyboardWrapper.setAttribute('data', 'wrap');
		formMovie.append(this.keyboardWrapper);

		this.title = document.createElement('div');
		this.title.classList.add('text-center');
		this.title.style.color = 'white';
		this.title.style.fontSize = '12px';
		this.title.innerText = 'Смена языка: левый Ctrl + Alt';
		this.keyboardWrapper.before(this.title);

//row1
		this.row1 = document.createElement('div');
		this.row1.classList.add('keyboard_line');
		this.row1.setAttribute('data', 'line');
		this.keyboardWrapper.prepend(this.row1);

//row2
		this.row2 = document.createElement('div');
		this.row2.classList.add('keyboard_line');
		this.row2.setAttribute('data', 'line');
		this.keyboardWrapper.append(this.row2);

//row3
		this.row3 = document.createElement('div');
		this.row3.classList.add('keyboard_line');
		this.row3.setAttribute('data', 'line');
		this.keyboardWrapper.append(this.row3);

//row4
		this.row4 = document.createElement('div');
		this.row4.classList.add('keyboard_line');
		this.row4.setAttribute('data', 'line');
		this.keyboardWrapper.append(this.row4);

//row5
		this.row5 = document.createElement('div');
		this.row5.classList.add('keyboard_line');
		this.row5.setAttribute('data', 'line');
		this.keyboardWrapper.append(this.row5);
	}


//keys
	kbButtons() {
		keyWhich.forEach(function (item, index) {
			let key = document.createElement('div');
			key.setAttribute('data', item);
			key.setAttribute('data-code', keyCodes[index]);
			this.keyEl[keyCodes[index]] = key;
			if (index >= 0 && index <= 13) {
				if (item === 8) {
					key.classList.add('special_key');
				} else {
					key.classList.add('key');
				}
				this.row1.append(key);
			} else if (index >= 14 && index <= 28) {
				if (item === 9 || item === 46) {
					key.classList.add('special_key');
				} else {
					key.classList.add('key');
				}
				this.row2.append(key);
			} else if (index >= 29 && index <= 41) {
				if (item === 20 || item === 13) {
					key.classList.add('special_key');
				} else {
					key.classList.add('key');
				}
				this.row3.append(key);
			} else if (index >= 42 && index <= 54) {
				if (item === 16 || item === 38) {
					key.classList.add('special_key');
				} else {
					key.classList.add('key');
				}
				this.row4.append(key);
			} else if (index >= 55 && index <= 63) {
				if (item === 17 || item === 91 || item === 18 || item === 32 || item === 37 || item === 40 || item === 39) {
					key.classList.add('special_key');
				}
				 if(item === 91) {
					key.classList.add('lang-key');
				}
				else {
					key.classList.add('key');
				}
				this.row5.append(key);
			}
		}, this);
	}


	keyObjectClassification() {
		for (let key in this.keyEl) {
			keyCodeLetterEng.forEach(function (item) {
				if (key === item) {
					this.letterEng[key] = this.keyEl[key];
				}
			}, this);
			keyCodeNumEng.forEach(function (item) {
				if (key === item) {
					this.keyNumEng[key] = this.keyEl[key];
				}
			}, this);
			keyCodeLetterRu.forEach(function (item) {
				if (key === item) {
					this.letterRu[key] = this.keyEl[key];
				}
			}, this);
			keyCodeNumRu.forEach(function (item) {
				if (key === item) {
					this.keyNumRu[key] = this.keyEl[key];
				}

			}, this);
			keyCodeFunct.forEach(function (item) {
				if (key === item) {
					this.keyFunctional[key] = this.keyEl[key];
				}
			}, this);
		}

	}

//check language
	LangCaseKb() {
		if (this.language === null) {
			localStorage.setItem('language', 'en');
			this.language = localStorage.getItem('language');
		}
		switch (this.language) {
			case "en":
				switch (this.caps) {
					case true:
						for (let key in lettersEnglishCaps) {
							this.letterEng[key].innerHTML = lettersEnglishCaps[key];
						}
						keyCodeFunct.forEach(function (item, index) {
							this.keyFunctional[item].innerHTML = keysFunction[index];
						}, this);
						break;
					case false:
						switch (this.shift) {
							case true:
								for (let key in lettersEnglishCaps) {
									this.letterEng[key].innerHTML = lettersEnglishCaps[key];
								}
								for (let key in keyCodeSymbolShift) {
									this.keyNumEng[key].innerHTML = keyCodeSymbolShift[key];
								}
								keyCodeFunct.forEach(function (item, index) {
									this.keyFunctional[item].innerHTML = keysFunction[index];
								}, this);
								break;
							case false:
								for (let key in lettersEnglish) {
									this.letterEng[key].innerHTML = lettersEnglish[key];
								}
								for (let key in keyCodeSymbol) {
									this.keyNumEng[key].innerHTML = keyCodeSymbol[key];
								}
								keyCodeFunct.forEach(function (item, index) {
									this.keyFunctional[item].innerHTML = keysFunction[index];
								}, this);
								break;
						}
				}
				break;

			case "ru":
				switch (this.caps) {
					case true:
						for (let key in lettersRussianCaps) {
							this.letterRu[key].innerHTML = lettersRussianCaps[key];
						}
						keyCodeFunct.forEach(function (item, index) {
							this.keyFunctional[item].innerHTML = keysFunction[index];
						}, this);
						break;
					case false:
						switch (this.shift) {
							case true:
								for (let key in lettersRussianCaps) {
									this.letterRu[key].innerHTML = lettersRussianCaps[key];
								}
								for (let key in keyCodeSymbolShiftRu) {
									this.keyNumRu[key].innerHTML = keyCodeSymbolShiftRu[key];
								}
								keyCodeFunct.forEach(function (item, index) {
									this.keyFunctional[item].innerHTML = keysFunction[index];
								}, this);
								break;
							case false:
								for (let key in lettersRussian) {
									this.letterRu[key].innerHTML = lettersRussian[key];
								}
								for (let key in keyCodeSymbolRu) {
									this.keyNumRu[key].innerHTML = keyCodeSymbolRu[key];
								}
								keyCodeFunct.forEach(function (item, index) {
									this.keyFunctional[item].innerHTML = keysFunction[index];
								}, this);
								break;
						}
				}
				break;
		}
	}


//switch lang
	switchLang(event) {
		let checker;
		if (event.type === 'click') {
			checker = event.target.getAttribute('data-code');
		} else {
			checker = event.code;
		}
		if (checker === 'ControlLeft' || checker === 'ControlRight') {
			this.ctrl = true;
		}
		if (checker === 'LANG') {
			if (localStorage.getItem('language') === 'en') {
				localStorage.setItem('language', 'ru');
				this.language = localStorage.getItem('language');
				this.LangCaseKb();
			} else {
				localStorage.setItem('language', 'en');
				this.language = localStorage.getItem('language');
				this.LangCaseKb();
			}
		}
	}


//textarea
	printText(event) {



		event.preventDefault();
		let checker2;
		if (event.type === 'click') {
			checker2 = event.target.getAttribute('data-code');
		} else {
			checker2 = event.code;
		}

		this.caretPos = this.textarea.selectionStart;
		this.caretPosEnd = this.textarea.selectionEnd;

		if (!this.keyFunctional[checker2]) {
			switch (this.language) {
				case 'en':
					switch (this.caps) {
						case true:
							if (!(checker2 in keyCodeSymbol)) {
								this.moveCursor(lettersEnglishCaps[checker2]);
							} else {
								this.moveCursor(keyCodeSymbol[checker2]);
							}
							break;
						case false:
							switch (this.shift) {
								case true:
									if (!(checker2 in keyCodeSymbolShift)) {
										this.moveCursor(lettersEnglishCaps[checker2]);
									} else {
										this.moveCursor(keyCodeSymbolShift[checker2]);
									}
									break;
								case false:
									if (!(checker2 in keyCodeSymbol)) {
										this.moveCursor(lettersEnglish[checker2]);
									} else {
										this.moveCursor(keyCodeSymbol[checker2]);
									}
									break;
							}

					}
					break;
				case 'ru':
					switch (this.caps) {
						case true:
							if (!(checker2 in keyCodeSymbolRu)) {
								this.moveCursor(lettersRussianCaps[checker2]);
							} else {
								this.moveCursor(keyCodeSymbolRu[checker2]);
							}
							break;
						case false:
							switch (this.shift) {
								case true:
									if (!(checker2 in keyCodeSymbolShiftRu)) {
										this.moveCursor(lettersRussianCaps[checker2]);
									} else {
										this.moveCursor(keyCodeSymbolShiftRu[checker2]);
									}
									break;
								case false:
									if (!(checker2 in keyCodeSymbolRu)) {
										this.moveCursor(lettersRussian[checker2]);
									} else {
										this.moveCursor(keyCodeSymbolRu[checker2]);
									}
									break;
							}
					}
					break;
			}
		}

	}

//cursors
	moveCursor(obj) {
		this.textarea.value = this.textarea.value.substring(0, this.caretPos) + obj + this.textarea.value.substring(this.caretPosEnd);
		this.caretPos += this.textarea.value.length;
		this.textarea.setSelectionRange(this.caretPos, this.caretPos);
	}


//enter
	enter(event) {
		let checker5;
		if (event.type === 'click') {
			checker5 = event.target.getAttribute('data-code');
		} else {
			checker5 = event.code;
		}
		if (checker5 === 'Enter') {
			const userInput = elSearchInput.value;
			if (userInput.length < 3) {
				elMessage.textContent = 'Введите минимум 3 символа';
			} else {
				elMessage.textContent = `Looking for ${userInput}`;
				translateAllToEng(userInput);
			}
			elSearchInput.focus();
		}
	}


//backspace + delete
	deletion(event) {
		let checker3;
		if (event.type === 'click') {
			checker3 = event.target.getAttribute('data-code');
		} else {
			checker3 = event.code;
		}

		switch (checker3) {
			case "Backspace":
				if (this.textarea.selectionStart === 0) {
					return;
				} else {
					this.caretPos = this.textarea.selectionStart;
					this.textarea.value = this.textarea.value.substring(0, this.caretPos - 1) + this.textarea.value.substring((this.caretPos), (this.textarea.value.length));
					this.textarea.setSelectionRange(this.caretPos - 1, this.caretPos - 1);
				}

				break;
			case "Delete":
				this.caretPos = this.textarea.selectionStart;
				this.textarea.value = this.textarea.value.substring(0, this.caretPos) + this.textarea.value.substring((this.caretPos + 1), (this.textarea.value.length));
				this.textarea.setSelectionRange(this.caretPos, this.caretPos);
				break;
		}
	}


//arrows
	arrow(event) {
		let checker4;
		if (event.type === 'click' || event.type === 'mousedown') {
			checker4 = event.target.getAttribute('data-code');
		} else {
			checker4 = event.code;
		}
		switch (checker4) {
			case "ArrowRight":
				this.textarea.selectionStart += 1;
				break;
			case "ArrowLeft":
				this.textarea.selectionStart -= 1;
				this.textarea.selectionEnd -= 1;
				break;
			case "ArrowUp":
				this.textarea.value += "▲";
				break;
			case "ArrowDown":
				this.textarea.value += "▼";
				break;
		}
	}


//space
	space(event) {
		let checker6;
		if (event.type === 'click') {
			checker6 = event.target.getAttribute('data-code');
		} else {
			checker6 = event.code;
		}
		if (checker6 === 'Space') {
			this.moveCursor(' ');
		}
	}


//tab
	tab(event) {
		let checker7;
		if (event.type === 'click') {
			checker7 = event.target.getAttribute('data-code');
		} else {
			checker7 = event.code;
		}
		if (checker7 === 'Tab') {
			this.moveCursor('\t');
		}
	}


	keydown(event) {

		event.preventDefault();
		let checker8;
		if (event.type === 'mousedown') {
			checker8 = event.target.getAttribute('data-code');
		} else {
			checker8 = event.code;
		}
		switch (checker8) {
			case 'CapsLock':
				switch (this.caps) {
					case true:
						this.caps = false;
						this.LangCaseKb();
						this.keyEl[checker8].classList.remove('active_key');
						break;
					case false:
						this.caps = true;
						this.LangCaseKb();
						this.keyEl[checker8].classList.add('active_key');
						break;
				}
				break;
			case 'ShiftLeft':
				this.shift = true;
				this.LangCaseKb();
				this.keyEl[checker8].classList.add('active_key');
				break;
			case 'ShiftRight':
				this.shift = true;
				this.LangCaseKb();
				this.keyEl[checker8].classList.add('active_key');
				break;
			case 'OSRight':
				break;
			case 'OSLeft':
				break;
			case 'Escape':
				break;
			default:
				this.keyEl[checker8].classList.add('active_key');
				break;
		}
	}

	keyup(event) {
		event.preventDefault();
		let checker9;
		if (event.type === 'mouseup') {
			checker9 = event.target.getAttribute('data-code');
		} else {
			checker9 = event.code;
		}
		switch (checker9) {
			case 'ShiftLeft':
				this.shift = false;
				this.LangCaseKb();
				this.keyEl[checker9].classList.remove('active_key');
				break;
			case 'ShiftRight':
				this.shift = false;
				this.LangCaseKb();
				this.keyEl[checker9].classList.remove('active_key');
				break;
			case 'CapsLock':
				break;
			case 'OSRight':
				break;
			case 'OSLeft':
				break;
			case 'Escape':
				break;
			default:
				this.keyEl[checker9].classList.remove('active_key');
				break;
		}
	}


	keyEvent() {
		document.addEventListener('keydown', (event) => {
			if (event.code === 'OSRight' || event.code === 'OSLeft') {
				console.log('this key works only on Mac and not presented here')
			} else {
				this.keydown(event);
				this.switchLang(event);
				this.printText(event);
				this.deletion(event);
				this.arrow(event);
				this.enter(event);
				this.space(event);
				this.tab(event);
				this.textarea.focus();
			}

		});

		document.addEventListener('keyup', (event) => this.keyup(event));

		this.keyboardWrapper.addEventListener('mousedown', (event) => {
			if (event.target.getAttribute('data') === 'wrap' || event.target.getAttribute('data') === 'line') {
			} else {
				this.keydown(event);
				this.textarea.focus();
			}
		});

		this.keyboardWrapper.addEventListener('mouseup', (event) => {
			if (event.target.getAttribute('data') === 'wrap' || event.target.getAttribute('data') === 'line') {
			} else {
				this.keyup(event);
				this.textarea.focus();
			}
		});


		this.keyboardWrapper.addEventListener('click', (event) => {
			if (event.target.getAttribute('data') === 'wrap' || event.target.getAttribute('data') === 'line') {
			} else {
				this.deletion(event);
				this.switchLang(event);
				this.printText(event);
				this.arrow(event);
				this.tab(event);
				this.enter(event);
				this.textarea.focus();
			}
		});
	}
}

const btnKb = document.querySelector('.with-keyboard');

window.onload = function () {
	let keyboardBasic = new Keyboard();
	keyboardBasic.keyboard();
	keyboardBasic.kbButtons();
	keyboardBasic.keyObjectClassification();
	keyboardBasic.LangCaseKb();
	keyboardBasic.keyEvent();
	keyboardBasic.textarea.focus();
};


btnKb.addEventListener('click', function (e) {
	e.preventDefault();
	const kbWrapper = document.querySelector('.keyboard-wrapper');
	kbWrapper.classList.toggle('d-none');
});



const keyWhich = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
	9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
	20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
	16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
	17, 91, 18, 32, 18, 37, 40, 39, 17
];

const keysFunction = ["&#8656;",
	"Tab", "Delete",
	"CapsLock", "Enter",
	"Shift", " &#9650;", "Shift",
	"Ctrl", "LANG", "Alt", "", "Alt", " &#9664;", " &#9660;", " &#9654;", "Ctrl"
];


const lettersEnglish = {
	"KeyQ": 'q',
	"KeyW": 'w',
	"KeyE": 'e',
	"KeyR": 'r',
	"KeyT": 't',
	"KeyY": 'y',
	"KeyU": 'u',
	"KeyI": 'i',
	"KeyO": 'o',
	"KeyP": 'p',
	"KeyA": 'a',
	"KeyS": 's',
	"KeyD": 'd',
	"KeyF": 'f',
	"KeyG": 'g',
	"KeyH": 'h',
	"KeyJ": 'j',
	"KeyK": 'k',
	"KeyL": 'l',
	"KeyZ": 'z',
	"KeyX": 'x',
	"KeyC": 'c',
	"KeyV": 'v',
	"KeyB": 'b',
	"KeyN": 'n',
	"KeyM": 'm',
};

const lettersEnglishCaps = {
	"KeyQ": 'Q',
	"KeyW": 'W',
	"KeyE": 'E',
	"KeyR": 'R',
	"KeyT": 'T',
	"KeyY": 'Y',
	"KeyU": 'U',
	"KeyI": 'I',
	"KeyO": 'O',
	"KeyP": 'P',
	"KeyA": 'A',
	"KeyS": 'S',
	"KeyD": 'D',
	"KeyF": 'F',
	"KeyG": 'G',
	"KeyH": 'H',
	"KeyJ": 'J',
	"KeyK": 'K',
	"KeyL": 'L',
	"KeyZ": 'Z',
	"KeyX": 'X',
	"KeyC": 'C',
	"KeyV": 'V',
	"KeyB": 'B',
	"KeyN": 'N',
	"KeyM": 'M',
};

const lettersRussian = {
	"Backquote": "ё",
	"KeyQ": 'й',
	"KeyW": 'ц',
	"KeyE": 'у',
	"KeyR": 'к',
	"KeyT": 'е',
	"KeyY": 'н',
	"KeyU": 'г',
	"KeyI": 'ш',
	"KeyO": 'щ',
	"KeyP": 'з',
	"BracketLeft": 'х',
	"BracketRight": 'ъ',
	"KeyA": 'ф',
	"KeyS": 'ы',
	"KeyD": 'в',
	"KeyF": 'а',
	"KeyG": 'п',
	"KeyH": 'р',
	"KeyJ": 'о',
	"KeyK": 'л',
	"KeyL": 'д',
	"Semicolon": 'ж',
	"Quote": 'э',
	"KeyZ": 'я',
	"KeyX": 'ч',
	"KeyC": 'с',
	"KeyV": 'м',
	"KeyB": 'и',
	"KeyN": 'т',
	"KeyM": 'ь',
	"Comma": 'б',
	"Period": 'ю',
};

const lettersRussianCaps = {
	"Backquote": "Ё",
	"KeyQ": 'Й',
	"KeyW": 'Ц',
	"KeyE": 'У',
	"KeyR": 'К',
	"KeyT": 'Е',
	"KeyY": 'Н',
	"KeyU": 'Г',
	"KeyI": 'Ш',
	"KeyO": 'Щ',
	"KeyP": 'З',
	"BracketLeft": 'Х',
	"BracketRight": 'Ъ',
	"KeyA": 'Ф',
	"KeyS": 'Ы',
	"KeyD": 'В',
	"KeyF": 'А',
	"KeyG": 'П',
	"KeyH": 'Р',
	"KeyJ": 'О',
	"KeyK": 'Л',
	"KeyL": 'Д',
	"Semicolon": 'Ж',
	"Quote": 'Э',
	"KeyZ": 'Я',
	"KeyX": 'Ч',
	"KeyC": 'С',
	"KeyV": 'М',
	"KeyB": 'И',
	"KeyN": 'Т',
	"KeyM": 'Ь',
	"Comma": 'Б',
	"Period": 'Ю',
};


const keyCodeSymbol = {
	"Backquote": '`',
	"Digit1": '1',
	"Digit2": '2',
	"Digit3": '3',
	"Digit4": '4',
	"Digit5": '5',
	"Digit6": '6',
	"Digit7": '7',
	"Digit8": '8',
	"Digit9": '9',
	"Digit0": '0',
	"Minus": '-',
	"Equal": '=',
	"BracketLeft": '[',
	"BracketRight": ']',
	"Backslash": '\\',
	"Semicolon": ';',
	"Quote": '\'',
	"Comma": ',',
	"Period": '.',
	"Slash": '/',
};

const keyCodeSymbolShift = {
	"Backquote": '~',
	"Digit1": '!',
	"Digit2": '@',
	"Digit3": '#',
	"Digit4": '$',
	"Digit5": '%',
	"Digit6": '^',
	"Digit7": '&',
	"Digit8": '*',
	"Digit9": '(',
	"Digit0": ')',
	"Minus": '_',
	"Equal": '+',
	"BracketLeft": '{',
	"BracketRight": '}',
	"Backslash": '|',
	"Semicolon": ':',
	"Quote": '"',
	"Comma": '<',
	"Period": '>',
	"Slash": '?',
};

const keyCodeSymbolRu = {
	"Backquote": 'ё',
	"Digit1": '1',
	"Digit2": '2',
	"Digit3": '3',
	"Digit4": '4',
	"Digit5": '5',
	"Digit6": '6',
	"Digit7": '7',
	"Digit8": '8',
	"Digit9": '9',
	"Digit0": '0',
	"Minus": '-',
	"Equal": '=',
	"Backslash": '\\',
	"Slash": '.',
};

const keyCodeSymbolShiftRu = {
	"Backquote": 'Ё',
	"Digit1": '!',
	"Digit2": '"',
	"Digit3": '№',
	"Digit4": ';',
	"Digit5": '%',
	"Digit6": ':',
	"Digit7": '?',
	"Digit8": '*',
	"Digit9": '(',
	"Digit0": ')',
	"Minus": '_',
	"Equal": '+',
	"Backslash": '/',
	"Slash": ',',
};

const keyCodeLetterEng = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
	"KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
	"KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
];

const keyCodeNumEng = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal",
	"BracketLeft", "BracketRight", "Backslash",
	"Semicolon", "Quote",
	"Comma", "Period", "Slash"
];

const keyCodeFunct = ["Backspace",
	"Tab", "Delete",
	"CapsLock", "Enter",
	"ShiftLeft", "ArrowUp", "ShiftRight",
	"ControlLeft", "LANG", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"
];

const keyCodeLetterRu = ["Backquote",
	"KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight",
	"KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote",
	"KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period",
];

const keyCodeNumRu = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal",
	"Backslash",
	"Slash",
];

const keyCodes = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
	"Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
	"CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
	"ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
	"ControlLeft", "LANG", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"
];

export {Keyboard};