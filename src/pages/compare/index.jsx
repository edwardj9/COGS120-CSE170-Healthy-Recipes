import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import { Container, Grid, Header, List, Loader, Statistic } from 'semantic-ui-react';

export default class Compare extends React.Component {

	componentWillMount() {
		[this.props.match.params.id1, this.props.match.params.id2].forEach(recipeId => {
			// let xhr = new XMLHttpRequest();

			// xhr.open('GET', 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/information?includeNutrition=true');
			// xhr.setRequestHeader("X-Mashape-Key", process.env.API_KEY);
			// xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
			// xhr.onload = () => {
			//	let recipeInfo = JSON.parse(xhr.response);
				let recipeInfo = require('../../test_data/recipe_info/' + recipeId);

				let stateUpdate = {};
				stateUpdate[recipeId] = {
					name: recipeInfo.title,
					ingredients: recipeInfo.extendedIngredients.map(ingredient => [ingredient.amount, ingredient.unitLong, ingredient.name].join(' ')),
					health: recipeInfo.nutrition.nutrients.reduce((health, nutrient) => {
						health[nutrient.title] = [nutrient.amount, nutrient.unit].join(' ');
						return health;
					}, {})
				};

				this.setState(stateUpdate);
		//	};

		//	xhr.send();
		});
	}

	render() {
		let content = (Object.keys(this.state).length >= 2) ? this.renderHealth() : this.renderLoading();

		let help = resources.help;

		return <Actionbar back content={content} help={help} signOut />;
	}

	renderLoading() {
		return (
			<Container textAlign='center'>
				<Loader active content={resources.loader.text} />
			</Container>
		);
	}

	renderCharts(ingredients) {
		return ( 
			<div>
				<pre id="spoonacular-ingredients" style={{ display: "none" }}>
          {ingredients}
				</pre>
				<div id="spoonacular-nutrition-visualizer"></div>
				<script type="text/javascript">
			 		var spoonacularServings = 1;
				</script>
				<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
				<script type="text/javascript" src="https://spoonacular.com/cdn/spoonacular-1.6.min.js"></script>
			</div>
		);
	}


	renderHealth() {
		let headerSize = 'medium';

		let healthStats = Object.keys(this.state).map(recipeId => (
			<Grid.Column key={recipeId}>
				<Grid.Column>
					<Header as='h2' color={globalResources.color.primary} content={this.state[recipeId].name} size={headerSize} />
				</Grid.Column>

				<List relaxed='very'>
					{Object.keys(this.state[recipeId].health).map(healthStat => <List.Item content={<Statistic key={healthStat + 'stat'} label={healthStat} value={this.state[recipeId].health[healthStat]} size='mini' />} key={healthStat + 'item'} />)}
				</List>
			</Grid.Column>
		));

		let content = (
			<Grid columns='equal' divided textAlign='center'>
				<Grid.Row>
					{healthStats}
				</Grid.Row>
			</Grid>
		);

		return content;
	}

}
