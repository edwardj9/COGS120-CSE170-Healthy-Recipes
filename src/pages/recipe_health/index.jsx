import resources from './page_message.json';

import React from 'react';

export default class RecipeHealth extends React.Component {

    back(){
        window.history.back();
    }
    
    help(){
    window.location.href = '../help';
    }



	render() {
		return <div>
            Recipe Health Page
            <br/>
            <button onClick={ (e) => { this.back();}}>Go Back</button>
            
            <button onClick={ (e) => { this.help();}}>Help</button>
	    </div>;
	}

}
