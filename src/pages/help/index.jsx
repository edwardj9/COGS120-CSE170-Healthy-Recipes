import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';

export default class Help extends React.Component {

	render() {
    let content = 'Help';

    let title = 'Help';

		return (
			<div>
				<Actionbar back content={content} title={title} />
			</div>
		);
	}

}
