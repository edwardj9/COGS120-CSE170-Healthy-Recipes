import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Header, Icon, List, Loader, Statistic } from 'semantic-ui-react';

export default class Recipe extends React.Component {

	constructor() {
		super();

		this.state = {
			name: '',
			ingredients: [],
			instructions: [],
			health: {}
		};
	}

	render() {
		let content = !!this.state.name ? this.renderRecipe() : this.renderLoading();

		let help = resources.help;

		let title = this.state.name;

		return <Actionbar back content={content} help={help} signOut title={title} />;
	}

	renderLoading() {
		return (
			<Container textAlign='center'>
        <Loader active content={resources.loader.text} />
      </Container>
		);
	}

	renderRecipe() {
		let headerSize = 'medium';

		let ingredients = (
			<List bulleted vertical>
				{this.state.ingredients.map(ingredient => <List.Item description={ingredient} key={ingredient} />)}
			</List>
		);

		let instructions = (
			<List ordered vertical>
				{this.state.instructions.map(instruction => <List.Item description={instruction} key={instruction} />)}
			</List>
		);

		let health = (
			<Container textAlign='center'>
				<List relaxed='very' vertical>
					{Object.keys(this.state.health).map(healthStat => <List.Item content={<Statistic key={healthStat} label={healthStat} value={this.state.health[healthStat]} color={globalResources.color.primary} />} />)}
				</List>
			</Container>
		);

		let content = (
			<div>
				<Button color={globalResources.color.primary} content={resources.health.button.text} fluid onClick={this.recipeHealth.bind(this)} />

				<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
					<Icon name='shopping basket' />
					{resources.ingredients.title}
				</Header>
				{ingredients}

				<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
					<Icon name='ordered list' />
					{resources.instructions.title}
				</Header>
				{instructions}

				<div ref='health'>
					<Header as='h2' color={globalResources.color.secondary} icon size={headerSize} textAlign='center'>
						<Icon name='heartbeat' />
						{resources.health.title}
					</Header>
				</div>
				{health}

			</div>
		);

		return content;
	}

	recipeHealth() {
		ReactDOM.findDOMNode(this.refs.health).scrollIntoView();
	}

}
