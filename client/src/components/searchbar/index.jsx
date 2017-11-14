import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Form, Transition } from 'semantic-ui-react';

const queryString = require('query-string');

export default class Searchbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			diet: ' ',
			excludeIngredients: '',
			intolerances: [],
			loading: false,
			showOptions: false,
		};
	}

	render() {
		let diet = Object.keys(resources.options.diet.values).map(d => {
			return {
				key: d,
				text: resources.options.diet.values[d],
				value: d
			};
		});

		let intolerances = Object.keys(resources.options.intolerances.values).map(intolerance => {
			return {
				key: intolerance,
				text: resources.options.intolerances.values[intolerance],
				value: intolerance
			};
		});

		return (
			<div>
				<Form onSubmit={this.search.bind(this)}>
					<Form.Input fluid icon='search' iconPosition='left' onChange={this.isReady.bind(this)} placeholder={resources.search.placeholder} />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={!!this.state.query}>
						<Form.Button basic={this.state.loading} color={globalResources.color.secondary} content={resources.search.button} fluid />
					</Transition>

					<Form.Button basic color={globalResources.color.secondary} content={(this.state.showOptions ? 'Hide' : 'Show') + ' ' + resources.options.button.content} fluid onClick={this.toggleOptions.bind(this)} type='button' />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={this.state.showOptions}>
						<div>
							<Form.Dropdown defaultValue={this.state.diet} fluid label={resources.options.diet.label} options={diet} onChange={this.setDiet.bind(this)} selection />
							<Form.Input defaultValue={this.state.excludeIngredients} fluid label={resources.options.excludeIngredients.label} onChange={this.setExcludeIngredients.bind(this)} placeholder={resources.options.excludeIngredients.placeholder} />
							<Form.Dropdown defaultValue={this.state.intolerances} fluid label={resources.options.intolerances.label} multiple options={intolerances} onChange={this.setIntolerances.bind(this)} placeholder={resources.options.intolerances.placeholder} selection />
						</div>
					</Transition>
				</Form>

			</div>
		);
	}

	isReady(e, d) {
		this.setState({
			query: d.value
		});
	}

	setDiet(e, d) {
		this.setState({
			diet: d.value
		});
	}

	setExcludeIngredients(e, d) {
		this.setState({
			excludeIngredients: d.value
		});
	}

	setIntolerances(e, d) {
		this.setState({
			intolerances: d.value
		});
	}

	toggleOptions() {
		this.setState({
			showOptions: !this.state.showOptions
		});
	};

	search() {
		if (this.state.query.length) {
			let qs = {
				query: this.state.query,
				diet: this.state.diet.trim(),
				excludeIngredients: this.state.excludeIngredients.split(',').map(ingredient => ingredient.trim()).join(','),
				intolerances: this.state.intolerances.join(',')
			};

			window.location.href = '/search?' + queryString.stringify(qs, { encode: false });
		}
	}

}
