import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Menu, Segment } from 'semantic-ui-react';

export default class Actionbar extends React.Component {

	render() {
		let barSize = 'large';
		let color = 'grey';

		if (this.props.title)
			var title = (
				<Segment size={barSize} vertical>
					<Header as='h3' color={color} content={this.props.title} textAlign='center' />
				</Segment>
			);

		return (
			<div>

				<Menu ref='menu' borderless color={color} fixed='top' fluid inverted secondary size={barSize}>
					{this.props.back ? <Menu.Item content='Back' icon='arrow left' onClick={this.goBack.bind(this)} /> : undefined}

					<Menu.Menu position='right'>
						{this.props.logout ? <Menu.Item content='Logout' icon='sign out' onClick={this.logout.bind(this)} /> : undefined}

						{this.props.help ? <Menu.Item content='Help' icon='help circle' onClick={this.getHelp.bind(this)} /> : undefined}
					</Menu.Menu>
				</Menu>

				<div ref='padding' />

				{title}

				<div style={{ padding: '5%' }}>
					{this.props.content}
				</div>
			</div>
		);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.padding).style.height = ReactDOM.findDOMNode(this.refs.menu).offsetHeight + 'px';
	}

	goBack() {
		window.history.back();
	}

	logout() {

	}

	getHelp() {
		window.location.href = '/help';
	}

}
