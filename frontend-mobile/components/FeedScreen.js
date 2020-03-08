import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { SearchBar } from 'react-native-elements';

class FeedHeader extends Component {
    render() {
	return (
	    <View style={styles.header}>
		<Text style={styles.headerText}>KCShare</Text>
		<SearchBar
		    containerStyle={styles.searchBarContainer}
		inputContainerStyle={styles.searchBarInput}
		placeholder={"Search..."}
		/>
	    </View>
	)
    }
}

export default class FeedScreen extends Component {
    state = {
	posts: []
    }

    componentDidMount() {
	if (this.state.posts.length === 0) {
	    Amplify.API.get('getPosts', "").then( (response) => {
		this.setState({posts: response});
		console.log("Response: ")
		
		console.log(this.state.posts)

	    }).catch((error) => {
		console.log(error)
	    })
	}
    }

    render() {
	
	return (
	    <View style={styles.view}>
		<FeedHeader/>
		<SafeAreaView style={styles.container}>
		    <FlatList
			data={this.state.posts}
			renderItem={({ item }) => <Post post={item} />}
			keyExtractor={post => post.postID}
		    />
		</SafeAreaView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    view: {
	flex: 1,
	backgroundColor: '#110d41'
    },
    container: {
	flex: 8,
    },
    header: {
	flex:1,
	flexDirection: 'row'
    },
    headerText: {
	fontSize: 30,
	fontWeight: 'bold',
	color: '#fcfcff',
	padding: 25,
    },
    searchBarContainer: {
	flex: 1,
	backgroundColor:'#110d41',
	paddingTop: 25,
	paddingBottom: 10
    },
    searchBarInput: {
	backgroundColor: '#fcfcff'
    }
});
