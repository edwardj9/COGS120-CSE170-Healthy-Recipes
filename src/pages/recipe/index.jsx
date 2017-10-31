import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import { Button } from 'semantic-ui-react';

export default class Recipe extends React.Component {

	render() {
		return (
			<div>
				<Actionbar back help />
				<Button content='Health Information' fluid onClick={this.recipeHealth.bind(this)} />
			</div>
		);
	}

	recipeHealth() {
		window.location.href = '/recipe/' + this.props.match.params.id + '/health';
	}

}
