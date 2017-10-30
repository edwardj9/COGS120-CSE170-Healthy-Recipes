import resources from './page_message.json';

import React from 'react';

export default class Recipe extends React.Component {


	help(){
	window.location.href = '../help';
	}

	back(){
	window.history.back();
	}

	recipeHealth(){
	window.location.href = '../recipe_health';
	}


	render() {
		return <div>
			Recipe Page
			<button onClick = { (e) => { this.recipeHealth();}}> Health Information</button>
			<button onClick = { (e) => { this.help();}}> Help</button>
			<button onClick = { (e) => { this.back();}}> Go Back</button>
			</div>;
	}

}
