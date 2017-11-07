import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import { Form } from 'semantic-ui-react';

const cookies = require('js-cookie');

export default class Login extends React.Component {

	constructor() {
		super();

		this.state = {
			username: '',
			password: ''
		};
	}

	render() {
		let buttonText = resources.submit.text;
		if (!this.state.username)
			buttonText = resources.username.error;
		else if (!this.state.password)
			buttonText = resources.password.error;

		let content = (
			<Form onSubmit={this.login.bind(this)}>
				<Form.Input fluid label={resources.username.label} onChange={(e, d) => this.setField('username', d.value)} />
				<Form.Input fluid label={resources.password.label} onChange={(e, d) => this.setField('password', d.value)} type='password' />

				<Form.Button basic={this.state.loading} color='teal' content={buttonText} disabled={!this.state.username || !this.state.password} fluid type='submit' />
			</Form>
		);

		let help = resources.help;

		return <Actionbar content={content} help={help} />;
	}

	setField(field, data) {
		let newState = {};
		newState[field] = data;
		this.setState(newState);
	}

	login() {
		cookies.set(globalResources.cookies.loggedIn, 1);
		window.location.href = '/';
	}

}
