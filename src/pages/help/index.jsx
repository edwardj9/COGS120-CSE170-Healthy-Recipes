import resources from './page_message.json';

import React from 'react';

export default class Help extends React.Component {

	back(){
	window.history.back();
	}

	render() {
		return <div>
			Help Page
			<button onClick = { (e)=>{ this.back();}}>Go Back</button>
			</div>;
	}

}
