import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Menu, Modal, Segment } from 'semantic-ui-react';

const cookies = require('js-cookie');

export default class Actionbar extends React.Component {

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.padding).style.height = ReactDOM.findDOMNode(this.refs.menu).offsetHeight + 'px';
	}

	render() {
		let barSize = 'large';

		if (this.props.back)
			var back = <Menu.Item content={resources.back.text} icon='arrow left' onClick={this.goBack.bind(this)} />;

		if (this.props.signOut)
			var signOut = <Modal actions={[resources.signOut.modal.button.negative, { color: globalResources.color.secondary, content: resources.signOut.modal.button.positive, onClick: () => this.signOut() }]} content={resources.signOut.modal.text} trigger={<Menu.Item content={resources.signOut.text} icon='sign out' />} />;

		if (this.props.help)
			var help = <Modal actions={[{ color: globalResources.color.secondary, content: resources.help.modal.button.positive }]} content={this.props.help.map(h => <p key={h}>{h}</p>)} trigger={<Menu.Item content={resources.help.text} icon='help circle' />} />;

		if (this.props.title)
			var title = (
				<Segment size={barSize} vertical>
					<Header as='h3' color={globalResources.color.primary} content={this.props.title} textAlign='center' />
				</Segment>
			);

		return (
			<div>

				<Menu ref='menu' borderless color={globalResources.color.primary} fixed='top' fluid inverted secondary size={barSize}>
					{back}

					<Menu.Menu position='right'>
						{signOut}

						{help}
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


	goBack() {
		window.history.back();
	}

	signOut() {
		cookies.remove(globalResources.cookies.loggedIn);
		window.location.href = '/';
	}

}
