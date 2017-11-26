import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';
import Request from '../../components/request/index';

import React from 'react';
import { Container, Grid, Header, Loader, Statistic } from 'semantic-ui-react';

import ReactGA from 'react-ga';

export const initGA = () => {
	ReactGA.initialize('UA-109989482-2');
	ReactGA.pageview(window.location.pathname + window.location.search);
}

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
		initGA();
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

		let headers = Object.keys(this.state).map(recipeId => (
			<Grid.Column key={recipeId + 'col'}>
				<Header as='h2' color={globalResources.color.secondary} content={this.state[recipeId].name} key={recipeId} size={headerSize} />
			</Grid.Column>
		));

		let healthNames = {};
		Object.keys(this.state).forEach(recipeId => {
			Object.keys(this.state[recipeId].health).forEach(healthKey => {
				healthNames[healthKey] = this.state[recipeId].health[healthKey].unit;
			});
		});

		let healthStats = Object.keys(healthNames).map(healthName => (
			<Grid.Row>
					{
						Object.keys(this.state).map(recipeId => (
							<Grid.Column>
								<Statistic label={healthName} value={!!this.state[recipeId].health[healthName] ? (this.state[recipeId].health[healthName].amount + ' ' + this.state[recipeId].health[healthName].unit) : '-'} size='mini' />
							</Grid.Column>
						))
					}
			</Grid.Row>
		));

		let content = (
			<Grid columns='equal' divided textAlign='center'>
				<Grid.Row>
					{headers}
				</Grid.Row>

				{healthStats}
			</Grid>
		);

		return content;
	}

}
