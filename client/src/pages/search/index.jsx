import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import RecipeList from '../../components/recipelist/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

const queryString = require('query-string');

export default class Search extends React.Component {

    
	constructor() {
		super();

		this.state = {
			recipes: [],
			resultCount: 0,
		};
	}


	componentWillMount() {
		let qs = {
			number: 100,
			query: this.props.query,
			diet: this.props.diet,
			excludeIngredients: this.props.excludeIngredients,
			instructionsRequired: true,
			intolerances: this.props.intolerances
		};

		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?" + queryString.stringify(qs, { encode: false }));
		xhr.setRequestHeader("X-Mashape-Key", process.env.API_KEY);
		xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
		xhr.onload = function(e){
			if (xhr.readyState === 4){
				if (xhr.status === 200){
					let response = JSON.parse(xhr.response);
					this.setState({
						recipes: response.results,
						resultCount: response.number,
					});
				} else {
					console.error(xhr.statusText);
				}
			}
		}.bind(this);
		xhr.send();
	}


	render() {
		let recipeList;
		if (!!Object.keys(this.state.recipes).length)
			recipeList = <RecipeList recipes={this.state.recipes} />;
		else
			recipeList = (
				<Container textAlign='center'>
					<Loader active content={resources.loader.text} />
				</Container>
		);

		let content = (
			<div>
				<Searchbar />

				<div style={{ margin: '5%' }} />

				{recipeList}
			</div>
		);

		let help = resources.help;

		let title = resources.title.replace('-', this.props.query);
		title = title.replace('#', this.state.resultCount);

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

}
