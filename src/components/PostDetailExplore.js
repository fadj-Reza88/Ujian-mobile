import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {Image, KeyboardAvoidingView,View } from 'react-native';
import {Body, Card, CardItem, Left, Right, Text, Thumbnail} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

class PostDetailExplore extends Component {
  state = {
    username: '',
    userPhoto: '',
  };

  componentDidMount() {
    this.ExplorePostData();
  }
  
  ExplorePostData = () => {
    firebase
      .database()
      .ref(`users/${this.props.navigation.getParam('userId')}`)
      .once('value')
      .then(async post => {
        await Object.keys(post.val()).forEach(data => {
          this.setState({
            username: post.val()[data].displayName,
            userPhoto: post.val()[data].photoURL,
          });
        });
      });
  };
  

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Header
          placement="left"
          centerComponent={{
            text: 'Post',
            style: {color: 'black', fontSize: 18, fontWeight: '700'},
          }}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.navigation.goBack(),
          }}
          containerStyle={{
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            elevation: 2,
            marginTop: Platform.OS === 'ios' ? 0 : -25,
          }}
        />

        <KeyboardAvoidingView>
          <Card>
            <CardItem>
              <Left style={{flex: 3}}>
                <Thumbnail source={{uri: this.state.userPhoto}} />
                <Body>
                  <Text>{this.state.username}</Text>
                  <Text note>Instagrin User</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{uri: navigation.getParam('imageURL')}}
                style={{height: 350, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text>{navigation.getParam('caption')}</Text>
              </Left>
            </CardItem>
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default PostDetailExplore