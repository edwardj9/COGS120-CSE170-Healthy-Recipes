import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Divider, Header, Image, List, Menu, Segment, Transition } from 'semantic-ui-react';

var imageBase = 'https://spoonacular.com/recipeImages/';
var imageRes = '-480x360'; //Tentative

export default class RecipeList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: []
		};
	}

	render() {
		let transitionDuration = 500;

		let recipeItems = this.props.recipes.map(recipe => {
			let isChecked = this.state.selected.indexOf(recipe.id) > -1;
			return <RecipeItem id={recipe.id} ref={recipe.id} key={recipe.id} isChecked={isChecked} disabledCheckbox={!isChecked && this.state.selected.length >= 2} 
				name={recipe.title} time={recipe.readyInMinutes} onCheck={isChecked => this.onRecipeCheck(recipe.id, isChecked)} 
					imgSrc={imageBase+recipe.id+imageRes+'.jpg'}/>;
		});

		return (
			<div>
				<Header as='p' color={globalResources.color.primary} content={resources.instructions} size='tiny' textAlign='center' />
				<Divider clearing hidden />

				<List verticalAlign='middle' divided={true}>
					{recipeItems}
				</List>

				<div ref='padding' />

				<Transition animation='fade up' duration={transitionDuration} onShow={this.padBottom.bind(this)} onHide={this.padBottom.bind(this)} transitionOnMount unmountOnHide visible={this.state.selected.length >= 1}>
					<Menu borderless fixed='bottom' fluid ref='menu' secondary size='large'>
						<Segment color={globalResources.color.primary} content={resources.compare.clear} inverted onClick={this.clearRecipes.bind(this)} textAlign='center' vertical />

						<Transition animation='fade up' duration={transitionDuration} onShow={this.padBottom.bind(this)} onHide={this.padBottom.bind(this)} transitionOnMount unmountOnHide visible={this.state.selected.length >= 2}>
							<Segment color={globalResources.color.secondary} content={resources.compare.confirm} inverted onClick={this.compareRecipes.bind(this)} textAlign='center' vertical />
						</Transition>
					</Menu>
				</Transition>
			</div>
		);
	}

	padBottom() {
		let menu = ReactDOM.findDOMNode(this.refs.menu);
		ReactDOM.findDOMNode(this.refs.padding).style.height = (menu ? menu.offsetHeight : 0) + 'px';
	}

	onRecipeCheck(recipeId, isChecked) {
		if (isChecked) {
			this.state.selected.push(recipeId);
		} else {
			let index = this.state.selected.indexOf(recipeId);
			if (index > -1)
				this.state.selected.splice(index, 1);
		}

		this.setState(this.state);
	}

	clearRecipes() {
		this.setState({
			selected: []
		});
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
					<Checkbox checked={this.props.isChecked} disabled={this.props.disabledCheckbox} onChange={(e, d) => this.props.onCheck(d.checked)} />
				</List.Content>

				<Image shape='rounded' size='small' src={this.props.imgSrc} />

				<List.Content onClick={this.goToRecipe.bind(this)}>
					<List.Header as='h5' content={this.props.name} />
					<List.Description content={'Ready in '+ this.props.time+' minutes'}/>
				</List.Content>
			</List.Item>
		);
	}

	goToRecipe() {
		window.location.href = '/recipe/' + this.props.id;
	}

}
