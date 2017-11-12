import resources from './page_message.json';
import globalResources from '../../global/page_message.json';

import React from 'react';
import { Button, Form, Transition , Modal, Popup, Header, Image, Dropdown} from 'semantic-ui-react';


export default class Searchbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			loading: false
		};
	}

	

	state = { open: false }
	show = dimmer => () => this.setState({ dimmer, open: true })
	close = () => this.setState({ open: false })

	render() {
		const { open, dimmer } = this.state;
		return (

			<div>
				<Form onSubmit={this.search.bind(this)}>
					<Form.Input fluid icon='search' iconPosition='left' onChange={this.isReady.bind(this)} placeholder={resources.search.placeholder} />

					<Transition animation='fade up' duration={500} transitionOnMount unmountOnHide visible={!!this.state.query}>
						<Button basic={this.state.loading} color={globalResources.color.secondary} content={resources.search.button} fluid type='submit' />
					</Transition>
				</Form>

				<Button onClick={this.show('inverted')} size ='small' floated = 'right'>Advanced Search</Button>

				<Modal dimmer={dimmer} open={open} onClose={this.close}>
		          <Modal.Header>Advanced Search</Modal.Header>
		          <Modal.Content>
		            <form class="ui form">
		            	<label>Recipe Name</label>
					    <div class="field">
					      <div class="ui input">
					        <input type="text" placeholder="Recipe Name" />
					      </div>
					    </div>

		            	<label>Exclude Ingredients</label>
					    <div class="field">
					      <div class="ui input">
					        <input type="text" placeholder="Comma separated list ex. 'chicken, milk'" />
					      </div>
					    </div>

					    <label>Diet</label>
					    <div role="combobox" aria-expanded="false" class="ui fluid multiple search selection dropdown">
						  <input type="text" aria-autocomplete="list" autoComplete="off" class="search" tabIndex="0" value="" />
						  <span class="sizer"></span>
						  <div class="default text" role="alert" aria-live="polite">State</div>
						  <i aria-hidden="true" class="dropdown icon"></i>
						  <div aria-multiselectable="true" role="listbox" class="menu transition">
							  <div style="pointer-events:all" role="option" aria-checked="false" aria-selected="true" class="selected item">
							      <span class="text">Test</span>
							    </div>
						  </div>
						</div>

						<label>Intolerances</label>
						<div role="combobox" aria-expanded="false" class="ui fluid multiple search selection dropdown">
						  <input type="text" autoComplete="off" tabIndex="0" value="" />
						  <span class="sizer"></span>
						  <div class="default text" role="alert" aria-live="polite">State</div>
						  <i aria-hidden="true" class="dropdown icon"></i>
						  <div aria-multiselectable="true" role="listbox" class="menu transition">
						  </div>
						</div>
					</form>
		          </Modal.Content>
		          <Modal.Actions>
		            <Button color='red' onClick={this.close}>
		              Cancel
		            </Button>
		            <Button positive icon='checkmark' labelPosition='right' content="Submit" onClick={this.close} />
		          </Modal.Actions>
		        </Modal>


			</div>
		);
	}

	isReady(e, d) {
		this.setState({
			query: d.value
		});
	}

	search() {
		window.location.href = '/search?query=' + this.state.query;
	}

}
