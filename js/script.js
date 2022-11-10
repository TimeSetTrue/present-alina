const loadMoreBlock = document.querySelector('.load'),
	  windowHeight = document.documentElement.clientHeight,
	  btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
	e.preventDefault();
	lazyScroll();
});


btn.addEventListener('touchend', (e) => {
	e.preventDefault();
	lazyScroll();
});

function lazyScroll() {
	if(!loadMoreBlock.classList.contains('_loading')) {
		getContent();
	}
}

// function loadMore() {
// 	const loadMoreBlockPos = loadMoreBlock.getBoundingClientRect().top + pageYOffset;
// 	const loadMoreBlockHeight = loadMoreBlock.offsetHeight;
	
// 	if(pageYOffset > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight) {
// 		getContent();

// 	}
// }

async function getContent() {
	if (!document.querySelector('.load__icon')) {
		loadMoreBlock.insertAdjacentHTML(
			'beforeend',
			`<div class="load__icon"></div>`
		);
	}
	loadMoreBlock.classList.add('_loading');

	let setContent = await fetch('getContent.html', {
		method: 'GET',
	});
	if(setContent.ok) {
		let result = await setContent.text();
		loadMoreBlock.insertAdjacentHTML('beforeend', result);
		loadMoreBlock.classList.remove('_loading');
		if(document.querySelector('.load__icon')) {
			document.querySelector('.load__icon').remove();
		}else {
			alert('Ошибка, дурак!');
		}
	}
}
