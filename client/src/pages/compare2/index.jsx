import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';
import Request from '../../components/request/index';

import React from 'react';
import { Button, Container, Divider, Grid, Header, Loader, Progress } from 'semantic-ui-react';

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
						}
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

		let headers = Object.keys(this.state).map(recipeId => (
			<Grid.Column key={recipeId + 'col'}>
				<Header as='h2' color={colors[indices.indexOf(recipeId)]} content={this.state[recipeId].name} key={recipeId} size={headerSize} />
			</Grid.Column>
		));

		let buttons = Object.keys(this.state).map(recipeId => (
			<Grid.Column key={recipeId + 'col'}>
				<Button basic color={colors[indices.indexOf(recipeId)]} content={resources.button.text} fluid onClick={() => window.location.href = '/recipe/' + recipeId} />
			</Grid.Column>
		));

		let healthNames = {};
		Object.keys(this.state).forEach(recipeId => {
			Object.keys(this.state[recipeId].health).forEach(healthKey => {
				healthNames[healthKey] = this.state[recipeId].health[healthKey].unit;
			});
		});

		let healthStats = Object.keys(healthNames).map(healthName => {
			let healthInfoExists = Object.keys(this.state)
				.map(recipeId => !!this.state[recipeId].health[healthName] ? this.state[recipeId].health[healthName].amount : false)
				.filter(hasHealthInfo => hasHealthInfo);

			if (healthInfoExists.length)
				return [
					<Divider fitted key={healthName + 'divider'} />
					,
					<Grid.Row key={healthName + 'header row'}>
						<Grid.Column key={healthName + 'header col'}>
							<Header content={healthName} key ={healthName} />
						</Grid.Column>
					</Grid.Row>
					,
					<Grid.Row key={healthName + 'stat row'}>
						<Grid.Column key={healthName + 'stat col'}>
						{
							Object.keys(this.state).map(recipeId => {
								let key = healthName + recipeId;
								let marginVertical = '0.5%';

								let amount = !!this.state[recipeId].health[healthName] ? this.state[recipeId].health[healthName].amount : 0;
								let total = totals[healthName];
								let unit = amount ? this.state[recipeId].health[healthName].unit : undefined

								let header = <Header as='p' color={colors[indices.indexOf(recipeId)]} content={amount ? (amount + ' / ' + total) + ' ' + unit + ' of daily need': resources.health.noinfo} key={key + 'header'} style={{ margin: '0px' }} />;

								return [
									(indices.indexOf(recipeId) === 0) ? header : undefined,
									<Progress color={colors[indices.indexOf(recipeId)]} disabled={!amount} key={key + 'progress'} percent={amount ? amount / total * 100 : 0} style={{ marginTop: marginVertical, marginBottom: marginVertical }} />,
									(indices.indexOf(recipeId) === 0) ? undefined : header
								];
							})
						}
						</Grid.Column>
					</Grid.Row>
				];

			return undefined;
		});

		let content = (
			<Grid columns='equal' textAlign='center'>
				<Grid.Row>
					{headers}
				</Grid.Row>

				<Grid.Row>
					{buttons}
				</Grid.Row>

				{healthStats}
			</Grid>
		);

		return content;
	}

}
