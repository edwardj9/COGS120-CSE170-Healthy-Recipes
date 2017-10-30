import resources from './page_message.json';

import React from 'react';

export default class Search extends React.Component {


	
	callAPI(){
		//input = document.getElementbyID("searchInput");
		//call whatever api
		//make an arraylist of recipes

	}

	createList(){
	//	var recipeList = callAPI();
	//	for each(recipe in recipeList){
	//		<div className = 'recipeBox'>
	//			<h1>{recipeName} </h1>
	//
	//			</div>
	//	}

		
	}
	

	help(){
	window.location.href = '../help'
	}

	render(){
		return <div>
			Search Page
			<br/>

			//<input type = "text" id = "searchInput" onkeyup = "createList" placeholder = "Search">
			<button onClick = { (e)	=> { this.help();}}>Help</button>

			</div>;

	}
	



}
