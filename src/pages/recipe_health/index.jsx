import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';

export default class RecipeHealth extends React.Component {

	render() {
    let content = 'Health Information';

    let title = 'Health Information';

		return (
			<div>
				<Actionbar back content={content} help title={title} />
			</div>
		);
	}

}
