(function () {
	'use strict';

	const someUtils = () => 'Build some util functions here';

	document.body.innerHTML += '<p class="text-red-500">This is a paragraph added by JavaScript from src/index.js</p>';
	document.body.innerHTML += someUtils();

})();
