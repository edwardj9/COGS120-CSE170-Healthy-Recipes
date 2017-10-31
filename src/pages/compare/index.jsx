import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';

export default class Compare extends React.Component {

	render() {
		let content = 'Compare';

		return (
			<div>
				<Actionbar back content={content} help />
			</div>
		);
	}

}
