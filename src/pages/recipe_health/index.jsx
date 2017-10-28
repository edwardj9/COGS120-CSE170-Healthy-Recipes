import resources from './page_message.json';

import React from 'react';

export default class RecipeHealth extends React.Component {

    back(){
        window.history.back();
    }

	render() {
		return <div>
            Recipe Health Page
            <br/>
            <button onClick={ (e) => { this.back();}}>Go Back</button>
            </div>;
	}

}