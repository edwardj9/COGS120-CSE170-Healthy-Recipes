import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import { init, sendTime } from '../../global/ga';

import Actionbar from '../../components/actionbar/index';
import Request from '../../components/request/index';

import React from 'react';
import { Container, Grid, Header, Loader, Statistic } from 'semantic-ui-react';

export default class Compare extends React.Component {

	constructor() {
		super();

		this.state = {
			start: init()
		};
	}

	onExit() {
		sendTime(this.props.match.path, this.state.start);
	}

	componentWillMount() {
		this.setState({
			start: init()
		});

		window.addEventListener('beforeunload', this.onExit.bind(this));
	}

	componentWillUnmount() {
		this.onExit();
		window.removeEventListener('beforeunload', this.onExit.bind(this));
	}

	render() {
		let content = (
			<div>
				{(Object.keys(this.state).filter(key => key !== 'start').length >= 2) ? this.renderHealth() : this.renderLoading()}

				<Request ref='request' />
			</div>
		);

		let help = resources.help;

		return <Actionbar back content={content} help={help} onExit={() => sendTime(this.state.start)} signOut />;
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

	renderHealth() {
		let headerSize = 'medium';
		let recipeIds = Object.keys(this.state).filter(key => key !== 'start');

		let headers = recipeIds.map(recipeId => (
			<Grid.Column key={recipeId + 'col'}>
				<Header as='h2' color={globalResources.color.secondary} content={this.state[recipeId].name} key={recipeId} size={headerSize} />
			</Grid.Column>
		));

		let healthNames = {};
		recipeIds.forEach(recipeId => {
			Object.keys(this.state[recipeId].health).forEach(healthKey => {
				healthNames[healthKey] = this.state[recipeId].health[healthKey].unit;
			});
		});

		let healthStats = Object.keys(healthNames).map(healthName => (
			<Grid.Row>
				{
					recipeIds.map(recipeId => (
						<Grid.Column>
							<Statistic label={healthName} key={healthName + recipeId} value={!!this.state[recipeId].health[healthName] ? (this.state[recipeId].health[healthName].amount + ' ' + this.state[recipeId].health[healthName].unit) : '-'} size='mini' />
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
