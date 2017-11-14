import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Modal } from 'semantic-ui-react';

const queryString = require('query-string');

export default class Request extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
		};
	}

	render() {
		return <Modal actions={[{ color: globalResources.color.secondary, content: resources.modal.button.positive, key: resources.modal.button.positive, onClick: this.close.bind(this) }]} content={resources.modal.text} open={this.state.showModal} onClose={this.close.bind(this)} />
	}

	close() {
		this.setState({
			showModal: false
		});
	}

	get(url, qs, callback = () => {}) {
		let that = this;
		let xhr = new XMLHttpRequest();

		xhr.open('GET', url + '?' + queryString.stringify(qs, { encode: false }));
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300)
				callback(undefined, xhr.response);
			else
				that.setState({
					showModal: true
				}, () => {
					if (!!xhr.response)
						callback(undefined, xhr.response);
					else
						callback(xhr.status, undefined)
				});
		};

		xhr.send();
	}

}
