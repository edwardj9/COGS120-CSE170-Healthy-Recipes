import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Header, Icon, List, Loader, Statistic } from 'semantic-ui-react';

export default class Recipe extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			ingredients: [],
			instructions: {},
			health: {}
		};
	}

	componentWillMount() {
		// let xhr = new XMLHttpRequest();

		// xhr.open('GET', 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + this.props.match.params.id + '/information?includeNutrition=true');
		// xhr.setRequestHeader("X-Mashape-Key", process.env.API_KEY);
		// xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
		// xhr.onload = () => {
		// 	let recipeInfo = JSON.parse(xhr.response);
			let recipeInfo = require('../../test_data/recipe_info/' + this.props.match.params.id);

			if (!recipeInfo.analyzedInstructions.length)
				recipeInfo.analyzedInstructions = [{
					name: '',
					steps: [{
						step: 'Information not available'
					}]
				}];

			this.setState({
				name: recipeInfo.title,
				ingredients: recipeInfo.extendedIngredients.map(ingredient => [ingredient.amount, ingredient.unitLong, ingredient.name].join(' ')),
				instructions: recipeInfo.analyzedInstructions.reduce((instructions, instructionSet) => {
					instructions[instructionSet.name] = instructionSet.steps.map(instruction => instruction.step);
					return instructions;
				}, {}),
				health: recipeInfo.nutrition.nutrients.reduce((health, nutrient) => {
					health[nutrient.title] = [nutrient.amount, nutrient.unit].join(' ');
					return health;
				}, {})
			});
		// };

		// xhr.send();
		
		let xhr = new XMLHttpRequest();

		xhr.open('POST', '/api/1.0/food/test');
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = () => {
			console.log(xhr.response);
		};

		xhr.send(JSON.stringify({
			test: 'test'
		}));
	}

	render() {
		let content = !!this.state.name ? this.renderRecipe() : this.renderLoading();

		let help = resources.help;

		let title = this.state.name;

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

	renderLoading() {
		return (
			<Container textAlign='center'>
				<Loader active content={resources.loader.text} />
			</Container>
		);
	}

	renderRecipe() {
		let headerSize = 'medium';

		let ingredients = (
			<List bulleted>
				{this.state.ingredients.map(ingredient => <List.Item description={ingredient} key={ingredient} />)}
			</List>
		);

		let instructions = Object.keys(this.state.instructions).map(instructionSet => (
			<div key={instructionSet}>
				{!!instructionSet ? <Header content={instructionSet} size='small' /> : undefined}
				<List ordered>
					{this.state.instructions[instructionSet].map(instruction => <List.Item description={instruction} key={instruction} />)}
				</List>
			</div>
		));

		let health = (
			<Container textAlign='center'>
				<List relaxed='very'>
					{Object.keys(this.state.health).map(healthStat => <List.Item content={<Statistic key={healthStat+'stat'} label={healthStat} value={this.state.health[healthStat]} color={globalResources.color.primary} size='small' />} key={healthStat + 'item'} />)}
				</List>
			</Container>
		);

		let content = (
			<div>
				<Button color={globalResources.color.primary} content={resources.health.button.text} fluid onClick={this.recipeHealth.bind(this)} />

				<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
					<Icon name='shopping basket' />
					{resources.ingredients.title}
				</Header>
				{ingredients}

				<Header content='' size='small' />
				<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
					<Icon name='ordered list' />
					{resources.instructions.title}
				</Header>
				{instructions}

				<Header content='' size='small' />
				<div ref='health'>
					<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
						<Icon name='heartbeat' />
						{resources.health.title}
					</Header>
				</div>
				{health}

			</div>
		);

		return content;
	}

	recipeHealth() {
		ReactDOM.findDOMNode(this.refs.health).scrollIntoView();
	}

}
