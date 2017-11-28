import ReactGA from 'react-ga';

export function init() {
  console.log(process.env);
  ReactGA.initialize(process.env.GA_KEY);
  ReactGA.pageview(window.location.pathname + window.location.search);
};
