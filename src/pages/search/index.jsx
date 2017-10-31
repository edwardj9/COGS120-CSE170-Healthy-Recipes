import resources from './page_message.json';

import Actionbar from '../../components/actionbar/index';
import Searchbar from '../../components/searchbar/index';

import React from 'react';

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

	render() {
    let content = (
      <div>
        <Searchbar />
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
