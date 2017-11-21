import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Button, Form, Modal, Transition } from 'semantic-ui-react';

const queryString = require('query-string');

export default class Searchbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			diet: {
				standard: ' ',
				custom: ''
			},
			excludeIngredients: '',
			intolerances: {
				standard: [],
				custom: []
			},
			loading: false,
			showOptions: false || !!this.props.alwaysOpen,
		};

		this.other = 'other';

		this.diet = Object.keys(resources.options.diet.values).map(d => {
			return {
				key: d,
				text: resources.options.diet.values[d],
				value: d
			};
		});

		this.intolerances = Object.keys(resources.options.intolerances.values).map(intolerance => {
			return {
				key: intolerance,
				text: resources.options.intolerances.values[intolerance],
				value: intolerance
			};
		});
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.search.bind(this)}>
					<Form.Input fluid icon='search' iconPosition='left' onChange={this.isReady.bind(this)} placeholder={resources.search.placeholder} />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={!!this.state.query}>
						<Form.Button basic={this.state.loading} color={globalResources.color.secondary} content={resources.search.button} fluid />
					</Transition>

					{this.props.alwaysOpen ? undefined : <Form.Button basic color={globalResources.color.secondary} content={(this.state.showOptions ? 'Hide' : 'Show') + ' ' + resources.options.buttons.health} fluid onClick={this.toggleOptions.bind(this)} type='button' />}

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={this.state.showOptions}>
						<div>
							<Form.Dropdown defaultValue={this.state.diet.standard} fluid label={resources.options.diet.label} options={this.diet} onChange={this.setDiet.bind(this)} selection text={!!this.state.diet.custom ? this.state.diet.custom : undefined} />
							<CustomFieldModal ref='dietModal' onSubmit={this.setCustomDiet.bind(this)} />

							<Form.Input defaultValue={this.state.excludeIngredients} fluid label={resources.options.excludeIngredients.label} onChange={this.setExcludeIngredients.bind(this)} placeholder={resources.options.excludeIngredients.placeholder} />

							<Form.Dropdown fluid label={resources.options.intolerances.label} multiple options={this.intolerances} onChange={this.setIntolerances.bind(this)} placeholder={resources.options.intolerances.placeholder} selection value={this.state.intolerances.standard.concat(this.state.intolerances.custom)} />
							<CustomFieldModal ref='intolerancesModal' onSubmit={this.setCustomIntolerances.bind(this)} />
						</div>
					</Transition>
				</Form>
				

			</div>
		);
	}

	search() {
		if (this.state.query.length) {
			let qs = {
				query: this.state.query,
				diet: this.state.diet.standard.trim(),
				excludeIngredients: this.state.excludeIngredients.split(',').map(ingredient => ingredient.trim()).join(','),
				intolerances: this.state.intolerances.standard.join(',')
			};

			window.location.href = '/search?' + queryString.stringify(qs, { encode: false });
		}
	}

	isReady(e, d) {
		this.setState({
			query: d.value
		});
	}

	setDiet(e, d) {
		if (d.value === this.other) {
			this.refs.dietModal.open()
			return;
		}

		this.state.diet.standard = d.value;
		this.state.diet.custom = '';
		this.setState(this.state);
	}

	setCustomDiet(diet) {
		this.state.diet.standard = ' ';
		this.state.diet.custom = diet;
		this.setState(this.state);
	}

	setExcludeIngredients(e, d) {
		this.setState({
			excludeIngredients: d.value
		});
	}

	setIntolerances(e, d) {
		let indexOfOther = d.value.indexOf(this.other)
		if (indexOfOther > -1) {
			d.value.splice(indexOfOther, 1);
			this.refs.intolerancesModal.open()
			return;
		}

		this.state.intolerances.custom.forEach(intolerance => {
			let indexOfIntolerance = d.value.indexOf(intolerance);
			if (indexOfIntolerance > -1)
				d.value.splice(indexOfIntolerance, 1);
			else
				this.state.intolerances.custom.splice(this.state.intolerances.custom.indexOf(intolerance), 1)
		});

		this.state.intolerances.standard = d.value;
		this.setState(this.state);
	}

	setCustomIntolerances(intolerances) {
		intolerances.split(',').forEach(intolerance => {
			let trimmed = intolerance.trim();

			this.intolerances.push({
				key: 'custom' + trimmed,
				text: trimmed,
				value: trimmed
			});
		});

		this.state.intolerances.custom.push(intolerances);
		this.setState(this.state);
	}

	toggleOptions() {
		this.setState({
			showOptions: !this.state.showOptions
		});
	};
}

class CustomFieldModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			error: false,
			input: '',
			open: false
		};
	}

	render() {
		return (
			<Modal onClose={this.close.bind(this)} open={this.state.open}>
				<Modal.Content>
					<Form onSubmit={this.submit.bind(this)}>
						<Form.Input fluid label={resources.options.modal.header} onChange={this.updateInput.bind(this)} error={this.state.error} />
					</Form>
				</Modal.Content>

				<Modal.Actions>
					<Button content={resources.options.modal.buttons.cancel} key={resources.options.modal.buttons.cancel} onClick={this.close.bind(this)} />
					<Button color={globalResources.color.secondary} content={resources.options.modal.buttons.add} key={resources.options.modal.buttons.add} onClick={this.submit.bind(this)} />
				</Modal.Actions>
			</Modal>
		);
	}

	open() {
		this.setState({
			error: false,
			open: true
		});
	}

	close() {
		this.setState({
			open: false
		});
	}

	submit() {
		if (!this.state.input) {
			this.setState({
				error: true
			});
			return;
		}

		this.props.onSubmit(this.state.input);
		this.close();
	}

	updateInput(e, d) {
		this.setState({
			input: d.value
		});
	}

}
