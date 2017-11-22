import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';
import Request from '../../components/request/index';

import React from 'react';
import { Button, Container, Divider, Grid, Header, Loader, Progress, Statistic } from 'semantic-ui-react';

export default class Compare extends React.Component {

	constructor() {
		super();

		this.state = {};
	}

	render() {
		let content = (
			<div>
				{(Object.keys(this.state).length >= 2) ? this.renderHealth() : this.renderLoading()}

				<Request ref='request' />
			</div>
		);

		let help = resources.help;

		return <Actionbar back content={content} help={help} signOut />;
	}

	componentDidMount() {
		[this.props.match.params.id1, this.props.match.params.id2].forEach(recipeId => {
			this.refs.request.get('/api/1.0/recipe/' + recipeId, {}, (err, data) => {
				if (err)
					return;

				let recipeInfo = JSON.parse(data);

				let stateUpdate = {};
				stateUpdate[recipeId] = {
					name: recipeInfo.title,
					health: recipeInfo.nutrition.nutrients.reduce((health, nutrient) => {
						health[nutrient.title] = {
							amount: Math.round(nutrient.amount),
							total: Math.round(nutrient.amount / (nutrient.percentOfDailyNeeds ? nutrient.percentOfDailyNeeds / 100 : 1)),
							unit: nutrient.unit
						};
						return health;
					}, {})
				};

				this.setState(stateUpdate);
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

		let colors = [globalResources.color.tertiary, globalResources.color.secondary];
		let indices = Object.keys(this.state);

		let totals = {};
		Object.keys(this.state).forEach(recipeId => {
			Object.keys(this.state[recipeId].health).forEach(healthKey => {
				totals[healthKey] = this.state[recipeId].health[healthKey].total;
			});
		});

		let recipeNames = (
			<Grid.Row>
				{
					Object.keys(this.state).map(recipeId => (
						<Grid.Column key={recipeId + 'name'}>
							<Header as='h2' color={colors[indices.indexOf(recipeId)]} content={this.state[recipeId].name} key={recipeId} size={headerSize} />
						</Grid.Column>
					))
				}
			</Grid.Row>
		);

		let recipeButtons = (
			<Grid.Row>
				{
					Object.keys(this.state).map(recipeId => (
						<Grid.Column key={recipeId + 'button'}>
							<Button basic color={colors[indices.indexOf(recipeId)]} content={resources.button.text} fluid onClick={() => window.location.href = '/recipe/' + recipeId} />
						</Grid.Column>
					))
				}
			</Grid.Row>
		);

		let healthNames = {};
		Object.keys(this.state).forEach(recipeId => {
			Object.keys(this.state[recipeId].health).forEach(healthKey => {
				healthNames[healthKey] = this.state[recipeId].health[healthKey].unit;
			});
		});

		let noMargin = {
			margin: '0px'
		};

		let noPadding = {
			padding: '0px'
		};

		let healthStats = Object.keys(healthNames)
			.filter(healthName => {
				let healthInfoExists = Object.keys(this.state)
					.map(recipeId => !!this.state[recipeId].health[healthName] ? this.state[recipeId].health[healthName].amount : false)
					.filter(hasHealthInfo => hasHealthInfo);

				return healthInfoExists.length >= Object.keys(this.state).length;
			})
			.map(healthName => {
				let divider = <Divider fitted key={healthName + 'divider'} />;

				let healthHeader = (
					<Grid.Row key={healthName + 'name row'} style={Object.assign({}, noMargin, { paddingBottom: '0px' })}>
						<Grid.Column key={healthName + 'name col'}>
							<Header content={healthName} key={healthName} />
						</Grid.Column>
					</Grid.Row>
				);

				let statValues = [];
				let statBars = [];
				Object.keys(this.state).forEach(recipeId => {
					let key = healthName + recipeId;
					let marginVertical = '0.5%';

					let amount = this.state[recipeId].health[healthName].amount;
					let total = totals[healthName];
					let unit = this.state[recipeId].health[healthName].unit;

					statValues.push(
						<Grid.Column key={key + 'value stat col'}>
							<Statistic color={colors[indices.indexOf(recipeId)]} key={key + 'value stat'} size='mini' style={{ margin: '0px' }} value={amount + ' ' + unit.toUpperCase()} />
						</Grid.Column>
					);

					statBars.push(<Progress color={colors[indices.indexOf(recipeId)]} key={key + 'progress'} percent={amount / total * 100} style={{ marginTop: marginVertical, marginBottom: marginVertical }} size='tiny' />);
				});

				let statValuesRow = (
					<Grid.Row key={healthName + 'value stat row'} style={Object.assign({}, noMargin, noPadding)}>
						{statValues}
					</Grid.Row>
				);

				let statBarsRow = (
					<Grid.Row key={healthName + 'bar stat row'} style={Object.assign({}, noMargin, noPadding)}>
						<Grid.Column key={healthName + 'bar stat col'}>
							{statBars}
						</Grid.Column>
					</Grid.Row>
				);

				return [healthHeader, statValuesRow, statBarsRow];
			});

		let content = (
			<Grid columns='equal' textAlign='center'>
				{recipeNames}
				{healthStats}
			</Grid>
		);

		return content;
	}

}
