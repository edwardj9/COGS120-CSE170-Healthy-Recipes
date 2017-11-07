import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import RecipeList from '../../components/recipelist/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

export default class Search extends React.Component {

// var resultSize = 10;
// var autoCompleteUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?";
// var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?";

	constructor() {
		super();

		this.state = {
			recipes: [{"id":556816,"title":"Herb Butter \"Coins\" for Roasted Chicken","readyInMinutes":10,"image":"Herb-Butter-Coins-for-Roasted-Chicken-556816.jpg","imageUrls":["Herb-Butter-Coins-for-Roasted-Chicken-556816.jpg"]},{"id":207201,"title":"Cook the Book: Miso Tofu Nuggets with Edamame","readyInMinutes":45,"image":"Cook-the-Book--Miso-Tofu-Nuggets-with-Edamame-207201.jpg","imageUrls":["Cook-the-Book--Miso-Tofu-Nuggets-with-Edamame-207201.jpg"]},{"id":530312,"title":"Tender Green Kale with Creamy Goat Cheese and Walnuts","readyInMinutes":45,"image":"Tender-Green-Kale-with-Creamy-Goat-Cheese-and-Walnuts-530312.jpg","imageUrls":["Tender-Green-Kale-with-Creamy-Goat-Cheese-and-Walnuts-530312.jpg"]},{"id":35606,"title":"Chicken Stir-Fry","readyInMinutes":45,"image":"chicken-stir-fry-35606.jpg","imageUrls":["chicken-stir-fry-35606.jpg"]},{"id":158679,"title":"White Chicken Chili","readyInMinutes":115,"image":"White-Chicken-Chili-158679.jpg","imageUrls":["White-Chicken-Chili-158679.jpg"]}],
			resultCount: 5
		};
	}


/* Uncomment when full access is received
	componentWillMount(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url+"number="+this.resultSize+"&query=" = this.props.query, true);
		xhr.setRequestHeader("X-Mashape-Key", process.env.API_KEY);
		xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
		xhr.send();
		xhr.onload = function(e){
			if (xhr.readyState === 4){
				if (xhr.status === 200){
					this.setState({
						recipes: xhr.response.results,
						resultCount: xhr.response.totalResults,
					});
				} else {
					console.error(xhr.statusText);
				}
			}
		}.bind(this);
		xhr.send();
	},
*/

	render() {
		let recipeList;
		if (!!Object.keys(this.state.recipes).length)
			recipeList = <RecipeList recipes={this.state.recipes} />;
		else
			recipeList = (
				<Container textAlign='center'>
					<Loader active content={resources.loader.text} />
				</Container>
			);

		let content = (
			<div>
				<Searchbar />

				<div style={{ margin: '5%' }} />

				{recipeList}
			</div>
		);

		let help = resources.help;

		let title = resources.title.replace('-', this.props.query);
		title = title.replace('#', this.state.resultCount);

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

}
