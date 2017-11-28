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
			username: {
				value: '',
				error: false
			},
			password: {
				value: '',
				error: false
			}
		};
	}

	render() {
		let content = (
			<Form onSubmit={this.login.bind(this)}>
				<Form.Input error={this.state.username.error} fluid label={resources.username.label} onChange={(e, d) => this.setField('username', d.value)} />
				<Form.Input error={this.state.password.error} fluid label={resources.password.label} onChange={(e, d) => this.setField('password', d.value)} type='password' />

				<Form.Button basic={this.state.loading} color={globalResources.color.secondary} content={resources.submit.text} fluid type='submit' />
			</Form>
		);

		let help = resources.help;

		return <Actionbar content={content} help={help} />;
	}

	setField(field, data) {
		this.state[field].value = data;
		this.setState(this.state);
	}

	login() {
		console.log(this.state)
		let usernameError = !this.state.username.value;
		let passwordError = !this.state.password.value;

		if (usernameError || passwordError) {
			this.state.username.error = usernameError;
			this.state.password.error = passwordError;
			this.setState(this.state);
			return;
		}

		cookies.set(globalResources.cookies.loggedIn, 1);
		window.location.href = '/home';
	}

}
