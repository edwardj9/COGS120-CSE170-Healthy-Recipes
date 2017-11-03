import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Button, Form, Transition } from 'semantic-ui-react';

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
					<Form.Input fluid icon='search' iconPosition='left' onChange={this.isReady.bind(this)} placeholder={resources.search.placeholder} />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={!!this.state.query}>
						<Button basic={this.state.loading} color={globalResources.color.secondary} content={resources.search.button} fluid type='submit' />
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
