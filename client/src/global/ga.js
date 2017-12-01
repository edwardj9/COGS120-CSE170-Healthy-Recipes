

export function init() {
	// ReactGA.initialize('UA-110505342-1');
	// ReactGA.pageview(window.location.pathname + window.location.search);
	return Date.now();
};

export function sendTime(url, start) {
	// ReactGA.event({
	// 	category: url,
	// 	action: ((Date.now() - start) / 1000).toString()
	// });
};
