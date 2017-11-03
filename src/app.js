import globalResources from './global/page_message.json';

import Compare from './pages/compare/index';
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
			'/': Home,
			'/compare/:id1/:id2': Compare,
			'/login': Login,
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
		let isLoginScreen = path === '/login';

		if (!loggedIn && !isLoginScreen)
			window.location.href = '/login';
		else if (loggedIn && isLoginScreen)
			window.location.href = '/';
		else
			return React.createElement(component, Object.assign(props, queryString.parse(props.location.search)))
	}

}
