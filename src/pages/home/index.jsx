import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Button } from 'semantic-ui-react';

export default class Home extends React.Component {

	render() {
		let content = (
			<div>
				<Searchbar />
			</div>
		);

		return (
			<div>
				<Actionbar content={content} help />
			</div>
		);
	}

}
