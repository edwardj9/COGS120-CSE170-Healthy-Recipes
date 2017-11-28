import ReactGA from 'react-ga';

export function init() {
  ReactGA.initialize('UA-109989482-2');
  ReactGA.pageview(window.location.pathname + window.location.search);
};
