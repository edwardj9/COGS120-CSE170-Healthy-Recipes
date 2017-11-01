import Compare from './pages/compare/index';
import Help from './pages/help/index';
import Home from './pages/home/index';
import Recipe from './pages/recipe/index';
import RecipeHealth from './pages/recipe_health/index';
import Search from './pages/search/index';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

const queryString = require('query-string');

export default class App extends React.Component {

	render() {

		let routeMap = {
			'/': Home,
			'/compare/:id1/:id2': Compare,
			'/help': Help,
			'/recipe/:id': Recipe,
			'/recipe/:id/health': RecipeHealth,
			'/search': Search,
			'*': () => <p>404 Page not found</p>
		};

		return (
			<Switch>
				{Object.keys(routeMap).map(path => <Route exact path={path} render={props => React.createElement(routeMap[path], Object.assign(props, queryString.parse(props.location.search)))} />)}
			</Switch>
		);
	}

}
