import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import RecipeList from '../../components/recipelist/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

export default class Search extends React.Component {

    
	constructor() {
		super();

		this.resultSize = 10;
    this.url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true";

		this.state = {
			recipes: [],
			resultCount: 0,
		};
	}


	componentWillMount(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", this.url+"&number="+this.resultSize+"&query="+this.props.query, true);
		console.log(process.env.API_KEY);
		xhr.setRequestHeader("X-Mashape-Key", process.env.API_KEY);
		xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
		xhr.onload = function(e){
			if (xhr.readyState === 4){
				if (xhr.status === 200){
					var response = JSON.parse(xhr.response);
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
