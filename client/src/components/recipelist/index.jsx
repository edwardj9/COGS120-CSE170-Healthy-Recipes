import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import QuickJump from '../quickjump/index.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Divider, Grid, Header, Image, List, Menu, Segment, Transition } from 'semantic-ui-react';

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
			return <RecipeItem id={recipe.id} ref={recipe.id} key={recipe.id} isChecked={isChecked} disabledCheckbox={!isChecked && this.state.selected.length >= 2} name={recipe.title} time={recipe.readyInMinutes} onCheck={isChecked => this.onRecipeCheck(recipe.id, isChecked)} imgSrc={recipe.image} />;
		});

		return (
			<div>
				<Header as='p' color={globalResources.color.primary} content={resources.instructions} size='tiny' textAlign='center' />
				<Divider clearing hidden />

				<List divided relaxed verticalAlign='middle'>
					{recipeItems}
				</List>

				<Divider clearing hidden />
				<QuickJump />

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
		window.location.href = '/compare2/' + this.state.selected[0] + '/' + this.state.selected[1];
	}

}

class RecipeItem extends React.Component {

	render() {
		return (
			<List.Item ref='item'>
				<Image avatar id={this.props.id + 'image'} src={this.props.imgSrc} size='tiny' />
				<List.Content description={'Ready in ' + this.props.time + ' minutes'} header={this.props.name} id={this.props.id + 'title'} />
				
				<Grid columns={2} style={{ marginTop: '0.01%' }}>
					<Grid.Row>
						<Grid.Column>
							<Button basic compact content={resources.view.text} fluid onClick={this.goToRecipe.bind(this)} />
						</Grid.Column>
						<Grid.Column>
							<Button basic={this.props.disabledCheckbox} color={this.props.isChecked ? globalResources.color.tertiary : (this.props.disabledCheckbox ? globalResources.color.primary : globalResources.color.secondary)} compact content={this.props.disabledCheckbox ? resources.checkbox.negative : (this.props.isChecked ? resources.checkbox.confirm : resources.checkbox.positive)} disabled={this.props.disabledCheckbox} fluid onClick={() => this.props.onCheck(!this.props.isChecked)} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</List.Item>
		);
	}

	componentDidMount() {
		document.getElementById(this.props.id + 'title').style.width = Math.round((ReactDOM.findDOMNode(this.refs.item).offsetWidth - document.getElementById(this.props.id + 'image').offsetWidth) * 0.95) + 'px';
	}

	goToRecipe() {
		window.location.href = '/recipe/' + this.props.id;
	}
}
