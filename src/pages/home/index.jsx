import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Button } from 'semantic-ui-react';

export default class Home extends React.Component {

	help(){
		window.location.href = '/help';
	}

	render() {
		return (
			<div>
				<Actionbar help />
				<Searchbar />
			</div>
		);
	}

}
