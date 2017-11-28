import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import QuickJump from '../../components/quickjump/index.jsx';

import Actionbar from '../../components/actionbar/index';
import Request from '../../components/request/index';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Divider, Header, Icon, Image, List, Loader, Progress } from 'semantic-ui-react';

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

	render() {
		let content = (
			<div>
				{!!this.state.name ? this.renderRecipe() : this.renderLoading()}

				<Request ref='request' />
			</div>
		);

		let help = resources.help;

		let title = this.state.name;

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

	componentDidMount() {
		this.refs.request.get('/api/1.0/recipe/' + this.props.match.params.id, {}, (err, data) => {
			if (err)
				return;

			let recipeInfo = JSON.parse(data);
			if (!recipeInfo.analyzedInstructions.length)
				recipeInfo.analyzedInstructions = [{
					name: '',
					steps: [{
						step: resources.instructions.missing
					}]
				}];

			this.setState({
				name: recipeInfo.title,
				image: recipeInfo.image,
				ingredients: recipeInfo.extendedIngredients.map(ingredient => [ingredient.amount, ingredient.unitLong, ingredient.name].join(' ')),
				instructions: recipeInfo.analyzedInstructions.reduce((instructions, instructionSet) => {
					instructions[instructionSet.name] = instructionSet.steps.map(instruction => instruction.step);
					return instructions;
				}, {}),
				health: recipeInfo.nutrition.nutrients.reduce((health, nutrient) => {
					health[nutrient.title] = {
						amount: Math.round(nutrient.amount),
						total: Math.round(nutrient.amount / (nutrient.percentOfDailyNeeds ? nutrient.percentOfDailyNeeds / 100 : 1)),
						unit: nutrient.unit
					};
					return health;
				}, {})
			});
		});
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
				<List as='ol'>
					{
						this.state.instructions[instructionSet].map(instruction => {
							let instructionSteps = instruction.split('.').map(step => step.trim()).filter(step => !!step);

							let instructionContent;
							if (instructionSteps.length === 1)
								instructionContent = <List.Item as='li' description={instructionSteps[0]} key={instructionSteps[0]} />
							else
								instructionContent = (
									<List.Item as='li' key={instruction + 'item'}>
										<List.List as='ol' key={instruction + 'list'}>
											{instructionSteps.map(step => <List.Item as='li' description={step} key={step} />)}
										</List.List>
									</List.Item>
								);

							return instructionContent;
						})
					}
				</List>
			</div>
		));

		let health = (
			<Container textAlign='center'>
				<List>
					{
						Object.keys(this.state.health).filter(healthStat => this.state.health[healthStat].amount).map(healthStat => {
							let amount = this.state.health[healthStat].amount;
							let total = this.state.health[healthStat].total;
							let unit = this.state.health[healthStat].unit;

							return (
								<List.Item key={healthStat + 'item'}>
									<Header content={healthStat} key={healthStat + 'header'} />
									<Header as='p' color={globalResources.color.secondary} content={amount + ' / ' + total + ' ' + unit + ' of daily need'} key={healthStat + 'numbers'} style={{ margin: '0px' }} />
									<Progress color={globalResources.color.secondary} key={healthStat + 'progress'} percent={amount / total * 100} size='small' />
								</List.Item>
							);
						})
					}
				</List>
			</Container>
		);

		let content = (
			<div>
				<Image fluid shape='rounded' src={this.state.image} />

				<Divider hidden />

				<Button color={globalResources.color.secondary} content={resources.health.button.text} fluid onClick={this.recipeHealth.bind(this)} />

				<Header as='h2' color={globalResources.color.tertiary} icon size={headerSize} textAlign='center'>
					<Icon name='shopping basket' />
					{resources.ingredients.title}
				</Header>
				{ingredients}

				<Header content='' size='small' />
				<Header as='h2' color={globalResources.color.tertiary} icon size={headerSize} textAlign='center'>
					<Icon name='ordered list' />
					{resources.instructions.title}
				</Header>
				{instructions}

				<Header content='' size='small' />
				<div ref='health'>
					<Header as='h2' color={globalResources.color.tertiary} icon size={headerSize} textAlign='center'>
						<Icon name='heartbeat' />
						{resources.health.title}
					</Header>
				</div>
				{health}

				<QuickJump />
			</div>
		);

		return content;
	}

	recipeHealth() {
		ReactDOM.findDOMNode(this.refs.health).scrollIntoView();
	}

}
