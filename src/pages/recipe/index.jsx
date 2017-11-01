import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import { Button } from 'semantic-ui-react';

export default class Recipe extends React.Component {

	render() {
		let content = (
			<div>
				<Button content='Health Information' fluid onClick={this.recipeHealth.bind(this)} />
			</div>
		);

		let title = 'Recipe Name';

		return (
			<div>
				<Actionbar back content={content} help title={title} />
			</div>
		);
	}

	recipeHealth() {
		window.location.href = '/recipe/' + this.props.match.params.id + '/health';
	}

}
