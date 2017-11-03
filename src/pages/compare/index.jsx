import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import Actionbar from '../../components/actionbar/index';

import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default class Compare extends React.Component {

	render() {
    let headerSize = 'medium';

		let content = (
      <Grid columns='equal' divided textAlign='center'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' color={globalResources.color.primary} content={1} size={headerSize} />
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' color={globalResources.color.primary} content={1} size={headerSize} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    let help = resources.help;

		return <Actionbar back content={content} help={help} signOut />;
	}

}
