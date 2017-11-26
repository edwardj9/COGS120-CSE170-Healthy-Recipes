import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import RecipeList from '../../components/recipelist/index';
import Request from '../../components/request/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

export default class Search extends React.Component {

	constructor() {
		super();

		this.state = {
			recipes: undefined
		};
	}

	render() {
		let recipesExists = this.state.recipes !== undefined;
		let recipesNonEmpty = recipesExists ? Object.keys(this.state.recipes).length : false;

		let recipeList;
		if (!recipesExists)
			recipeList = (
				<Container textAlign='center'>
					<Loader active content={resources.loader.text} />
				</Container>
			);
		else if (recipesNonEmpty)
			recipeList = <RecipeList recipes={this.state.recipes} />;
		else
			recipeList = <div></div>;

		let content = (
			<div>
				<Searchbar />

				<div style={{ margin: '5%' }} />

				{recipeList}

				<Request ref='request' />
			</div>
		);

		let help = resources.help;

		let title = (recipesExists ? resources.title.display : resources.title.searching).replace('-', this.props.query);
		title = title.replace('#', recipesExists ? this.state.recipes.length : '');

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

	componentDidMount() {

		let qs = {
			number: 25,
			query: this.props.query,
			diet: this.props.diet,
			excludeIngredients: this.props.excludeIngredients,
			instructionsRequired: true,
			intolerances: this.props.intolerances
		};

		this.refs.request.get('/api/1.0/recipe/search', qs, (err, data) => {
			if (err)
				return;

			this.setState({
				recipes: JSON.parse(data)
			});
		});
	}

}
