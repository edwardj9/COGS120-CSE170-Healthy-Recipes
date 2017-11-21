import globalResources from './global/page_message.json';

import Compare from './pages/compare/index';
import Compare2 from './pages/compare2/index';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Recipe from './pages/recipe/index';
import Search from './pages/search/index';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

const cookies = require('js-cookie');
const queryString = require('query-string');

export default class App extends React.Component {

	render() {

		let routeMap = {
			'/': Login,
			'/compare/:id1/:id2': Compare,
			'/compare2/:id1/:id2': Compare2,
			'/home': Home,
			'/recipe/:id': Recipe,
			'/search': Search
		};

		return (
			<Switch>
				{Object.keys(routeMap).map(path => <Route exact key={path} path={path} render={props => this.renderPage(routeMap[path], props, path)} />)}
			</Switch>
		);
	}

	renderPage(component, props, path) {
		let loggedIn = cookies.get(globalResources.cookies.loggedIn);
		let isLoginScreen = path === '/';

		if (!loggedIn && !isLoginScreen)
			window.location.href = '/';
		else if (loggedIn && isLoginScreen)
			window.location.href = '/home';
		else
			return React.createElement(component, Object.assign(props, queryString.parse(props.location.search)))
	}

}
