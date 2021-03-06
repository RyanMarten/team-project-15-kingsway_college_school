import React from 'react';
import { uid } from "react-uid";
import './TopTags.css';
import Amplify from 'aws-amplify';

import SearchBar from '../SearchBar/SearchBar'

class TopTags extends React.Component {
	state = {
		hashtags: []
	}

	callHashtagApi = async (session) => {
		try {
			await Amplify.API.get('getPopularHashtags', '', {headers : {Authorization : session.idToken.jwtToken}})
			.then((response) => {
				const tags = [];

				if (Object.entries(response).length === 0 && response.constructor === Object) {
					response = [];
				}

				response.forEach((tag) => {
					tags.push('#' + tag.hashtag);
				});

				this.setState({ hashtags: tags });
			}).catch((error) => {
				console.error(error);
			});
			
			this.forceUpdate()
		} catch {}
	}

	async componentDidMount() {
		this.callHashtagApi(this.props.store.session)
	}

	render() {
		return (
		<div className="TopTags dark-grey light-grey-text">
			<SearchBar store={ this.props.store } />

			<h1>
				TopTags
			</h1>

			{
				this.state.hashtags.map((hashtag) => (
					<div key={ uid(hashtag) } onClick={ () => { this.props.store.trySearch(hashtag); } } className="Hashtag accent rounded-15">
						{ hashtag }
					</div>
				))
			}
		</div>
	)}
}

export default TopTags;