import {cross, elIconClear,elSearchInput} from "./consts";
import {clearMessageToUser,clearInput} from './working-functions';

cross.addEventListener('click', function (e) {
	e.preventDefault();
});

elIconClear.addEventListener('click', function () {
	clearMessageToUser();
	clearInput();
	elSearchInput.focus();
});