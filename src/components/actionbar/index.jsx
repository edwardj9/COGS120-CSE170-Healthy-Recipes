import React from 'react';
import { Menu } from 'semantic-ui-react';

export default class Actionbar extends React.Component {

	render() {
		return (
      <Menu borderless color='teal' inverted secondary>
        {this.props.back ? <Menu.Item content='Back' icon='arrow left' onClick={this.goBack.bind(this)} /> : undefined}

        <Menu.Menu position='right'>
          {this.props.logout ? <Menu.Item content='Logout' icon='sign out' onClick={this.logout.bind(this)} /> : undefined}

          {this.props.help ? <Menu.Item content='Help' icon='help circle' onClick={this.getHelp.bind(this)} /> : undefined}
        </Menu.Menu>
      </Menu>
    );
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
