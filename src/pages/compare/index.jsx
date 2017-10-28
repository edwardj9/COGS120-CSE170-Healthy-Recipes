import resources from './page_message.json';

import React from 'react';

export default class Compare extends React.Component {

    back(){
        window.history.back();
    }

	render() {
		return <div>
            Compare Page
            <br/>
            <button onClick={ (e) => { this.back();}}>Go Back</button>
            </div>;
	}

}