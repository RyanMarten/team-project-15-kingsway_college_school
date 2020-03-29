import React, { Component } from 'react';
import { Alert, Image, Text, View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
// import {
//     Menu,
//     MenuOptions,
//     MenuOption,
//     MenuTrigger,
// } from 'react-native-popup-menu';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class MenuIcon extends Component {
	render() {
		return <MaterialCommunityIcons name="dots-horizontal" color={'#fcfcff'} size={20} />
	}
}
class PostMenu extends Component {
	constructor() {
		super();
		this.deletePost = this.deletePost.bind(this)
		this.deleteAlert = this.deleteAlert.bind(this)
	}

	deletePost() {

		const reqParams = { queryStringParameters: { postID: this.props.postID } };
		Amplify.API.del('deletePost', '', reqParams).then((response) => {
		        this.hideMenu();
			this.props.refresh();
			Alert.alert("Post deleted", ":)")
		}).catch((error) => {
			console.log(error);
		});
	}

	favouritePost() {
		const reqParams = { queryStringParameters: { postID: this.props.postID} };
		Amplify.API.put('favouritePost', '', reqParams).then( (response) => {
			this.props.refresh();
			this.hideMenu();
			//Alert.alert("Post saved to favourites!");
		}).catch((error) => {
			console.log(error)
			this.hideMenu();
			//Alert.alert("REQUEST FAILED");
		})
	}

	unfavouritePost() {

		const reqParams = { queryStringParameters: { postID: this.props.postID} };
		Amplify.API.put('unfavouritePost', '', reqParams).then( (response) => {
			console.log(response);
			this.props.refresh();
			this.hideMenu();
			//Alert.alert("Post removed from favourites.");
		}).catch((error) => {
			console.log(error)
			this.hideMenu();
			//Alert.alert("REQUEST FAILED");
		})
	}

	showMenu = () => {
		this._menu.show();
	};

	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	deleteAlert() {
		Alert.alert(
			'Delete post?',
			'Are you sure you want to delete this post?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => this.deletePost() },
			],
			{ cancelable: true },
		);
	}

	unfavouriteAlert() {
		Alert.alert(
			'Remove from favourites?',
			'Are you sure you want to remove this post from your favourites?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => this.unfavouritePost() },
			],
			{ cancelable: true },
		);
		
	}

	render() {
		const userID = 2;
		const menuOptionStyle = {
			optionWrapper: {
				backgroundColor: "#fcfcff",
				borderRadius: 10
			},
			optionText: {
				fontSize: 15
			},
			optionsWrapper: {
				borderRadius: 10,
			}
		}

		// Change "Favourite" option to "Remove from favourites" when looking at Favourites screen
		let favouriteOption = <MenuItem onPress={() => this.favouritePost()} customStyles={menuOptionStyle}>Favourite</MenuItem>;
		if (this.props.alreadyFavourite) {
			favouriteOption = <MenuItem onPress={() => this.unfavouriteAlert()} customStyles={menuOptionStyle}>Remove from favourites</MenuItem>;
		}

		return (
			<View style={{ borderRadius: 10 }}>
				<Menu
					ref={this.setMenuRef}
					button={<MaterialCommunityIcons name="dots-horizontal" color={'#fcfcff'} size={20} onPress={this.showMenu} />}>
					{favouriteOption}
					<MenuDivider />
					<MenuItem onPress={() => this.deleteAlert()} disabled={!this.props.userID == userID}> Delete</MenuItem>
				</Menu>
			</View>
		)
	}
}
export default class Post extends Component {
	locationHeader = null;
	dateHeader = null;
	image = null;
	render() {
		const month = {
			0: 'January',
			1: 'February',
			2: 'March',
			3: 'April',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		}
		if (this.props.post.location && this.props.post.location.name) {
			this.locationHeader = (
				<Text style={styles.locationText}>@{this.props.post.location.name.split(',')[0]}</Text>
			)
		}
		if (this.props.post.images.length > 0) {
			this.image = (
				<View style={{ alignItems: 'center', paddingTop: 20 }}>
					<Image
						style={{ width: 300, height: 300 }}
						source={{ uri: this.props.post.images[0] }}
					/>
				</View>
			)
		}
		let time = new Date(this.props.post.timeUploaded * 1000);

		let favIcon = <></>
		if (this.props.post.favourited) {
			favIcon = <Text style={styles.filledStar}>★</Text>;
		}
		// Note: This can be used if we want Favourite and Delete to be 2 separate UI items instead of the drawer menu.
		// else {
		// 	favIcon = <Text style={styles.emptyStar}>☆</Text>;
		// }

		return (
			<View style={styles.post}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						{this.locationHeader}
						<Text style={styles.date}>{'' + month[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear()}</Text>
					</View>
					<View styles={styles.headerRight}>
						<PostMenu alreadyFavourite={this.props.post.favourited} userID={this.props.post.userID} postID={this.props.post.postID} refresh={() => this.props.refresh()} />
					</View>
				</View>
				<View styles={{ flex: 1 }}>
					<Text style={styles.content}>{this.props.post.content}</Text>
				</View>
				{this.image}
				{favIcon}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	post: {
		backgroundColor: '#23275f',
		padding: 15,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 10,
		flex: 1
	},
	content: {
		fontSize: 15,
		color: '#fcfcff',
	},
	header: {
		flex: 1,
		paddingBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	headerLeft: {
		flexDirection: "row",
	},
	headerRight: {

	},
	locationText: {
		fontSize: 15,
		color: '#fcfcff',
		fontWeight: 'bold',
		fontStyle: 'italic',
		paddingRight: 10
	},
	emptyStar: {
		fontSize: 15,
		color: '#fcfcff',
		textAlign: "right"
	},
	filledStar: {
		fontSize: 15,
		color: '#FB9B38',
		textAlign: "right"
	},
	date: {
		fontSize: 15,
		color: 'lightgrey',
	},
	menuOption: {
		backgroundColor: "red"
	}
});

