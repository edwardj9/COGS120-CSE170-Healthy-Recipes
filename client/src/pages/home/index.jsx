import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Image } from 'semantic-ui-react';

export default class Home extends React.Component {

	render() {
		let content = (
			<div>
				<div style={{ margin: '20%' }} />

				<Image shape='circular' size='small' centered src={require('../../global/icon.png')} />

				<div style={{ margin: '5%' }} />

				<Searchbar alwaysOpen />
			</div>
		);

		let help = resources.help;

		return <Actionbar content={content} help={help} signOut />;
	}

}
