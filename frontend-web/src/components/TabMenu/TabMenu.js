import React from 'react';
import { uid } from "react-uid";
import './TabMenu.css';

class TabMenu extends React.Component {
	state = {
		selected: 'Home',
		tabs: [
			'Home',
			'Favourites',
			'My Posts',
			'Settings'
		]
	}

	tabClicked = (tab) => {
		this.setState({ selected: tab });

		this.props.parent.setState({ currentView: tab });
	}

	render() {
		return (
		<div className="TabMenu mid-grey light-grey-text">
			<h1>
				KCShare
			</h1>
			{
				this.state.tabs.map((tab) => (
						<div key={ uid(tab) } onClick={ () => { this.tabClicked(tab) } } className={'Tab accent ' + (this.state.selected === tab ? 'dark-grey' : 'mid-grey')}>
							{ tab }
						</div>
				))
			}
		</div>
	)}
};

export default TabMenu;