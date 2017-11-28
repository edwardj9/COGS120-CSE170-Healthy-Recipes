import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Button } from 'semantic-ui-react';

export default class QuickJump extends React.Component {

	render() {
		return <Button basic color={globalResources.color.secondary} content={resources.top.text} fluid onClick={this.jump.bind(this)} />;
	}

	jump() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

}
