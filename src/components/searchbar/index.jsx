import React from 'react';
import { Button, Dimmer, Form, Loader, Transition } from 'semantic-ui-react';

export default class Searchbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			loading: false
		};
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.search.bind(this)}>
					<Form.Input fluid icon='search' iconPosition='left' onChange={this.isReady.bind(this)} placeholder='Search for recipes' />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={this.state.query}>
						<Button basic={this.state.loading} color='teal' content='Search for recipes' fluid type='submit' />
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

	search() {
		window.location.href = '/search?query=' + this.state.query;
	}

}
