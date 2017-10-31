import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';

export default class Search extends React.Component {

	render() {
		return (
			<div>
				<Actionbar back help />
				<Searchbar />
			</div>
		);
	}

}
