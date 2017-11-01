import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import RecipeList from '../../components/recipelist/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';

export default class Search extends React.Component {

	render() {
    let content = (
      <div>
        <Searchbar />

        <div style={{ margin: '5%' }} />

        <RecipeList />
      </div>
    );

    let title = 'Recipes relating to "' + this.props.query + '"';

		return (
			<div>
				<Actionbar back content={content} help title={title} />
			</div>
		);
	}

}
