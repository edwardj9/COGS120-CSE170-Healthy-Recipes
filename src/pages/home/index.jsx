import resources from './page_message.json';

import React from 'react';

export default class Home extends React.Component {

	help(){
	window.location.href = '../help';
	}

	render() {
		return <div>
			Home Page
			<button onClick = { (e) => {this.help();}}> Help</button>
			</div>;
	}

}
