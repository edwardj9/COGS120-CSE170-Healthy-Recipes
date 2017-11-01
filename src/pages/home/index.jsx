import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Button, Image } from 'semantic-ui-react';

import icon from '../../icon.png'

export default class Home extends React.Component {

	render() {
		let content = (
			<div>
				<div style={{ margin: '30%' }} />

				<Image shape='circular' size='small' centered src={icon} />

				<div style={{ margin: '5%' }} />

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
