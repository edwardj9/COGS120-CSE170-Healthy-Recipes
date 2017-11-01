import React from 'react';
import { Button, Checkbox, Container, Divider, Header, Image, List, Menu, Transition } from 'semantic-ui-react';

export default class RecipeList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: []
		};
	}

	render() {
		let recipeItems = [];
		for (let i = 0; i < 7; ++i)
			recipeItems.push(<RecipeItem id={i} ref={i} key={i} disabledCheckbox={this.state.selected.indexOf(i) < 0 && this.state.selected.length >= 2} name='Recipe Name' onCheck={isChecked => this.onRecipeCheck(i, isChecked)} imgSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Color_icon_blue_%26_pink.svg/2000px-Color_icon_blue_%26_pink.svg.png' />);

		return (
			<div>
				<Header as='p' color='grey' content='Check 2 recipes to compare' floated='right' size='tiny' />
				<Divider clearing hidden />

				<List verticalAlign='middle'>
					{recipeItems}
				</List>

				<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={this.state.selected.length >= 2}>
					<Button basic={this.state.selected.length == 1} color='teal' content='Compare recipes' fluid onClick={this.compareRecipes.bind(this)} />
				</Transition>
			</div>
		);
	}

	onRecipeCheck(id, isChecked) {
		if (isChecked) {
			this.state.selected.push(id);
		} else {
			let index = this.state.selected.indexOf(id);
			if (index > -1)
				this.state.selected.splice(index, 1);
		}

		this.setState(this.state);
	}

	compareRecipes() {
		window.location.href = '/compare/' + this.state.selected[0] + '/' + this.state.selected[1];
	}

}

class RecipeItem extends React.Component {

	render() {
		return (
			<List.Item>
				<List.Content floated='right'>
					<Checkbox disabled={this.props.disabledCheckbox} onChange={(e, d) => this.props.onCheck(d.checked)} />
				</List.Content>

				<Image shape='rounded' size='tiny' src={this.props.imgSrc} />

				<List.Content fluid onClick={this.goToRecipe.bind(this)}>
					<List.Header as='h2' content={this.props.name} />
				</List.Content>
			</List.Item>
		);
	}

	goToRecipe() {
		window.location.href = '/recipe/' + this.props.id;
	}

}
