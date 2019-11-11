import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/database';

class Explore extends Component {
  state = {
    post: [],
    search: '',
  };

  componentDidMount() {
    this.ExplorePost();
  }

  ExplorePost = () => {
    firebase.database().ref('/posts').once('value')
      .then(post => {
        var arrData = [];
        Object.keys(post.val()).forEach(data => {
          const data1 = post.val()[data];
          if (data1.userId !== this.props.uid) {
            arrData.push(arrData);
          }
        });
        this.setState({
          post: arrData
        });
        console.log(arrData);
      });
  };

  renderExplorePost = () => {
    var i = 2;
    return this.state.post.map((val, idx) => {
      var styleOBJ = {width: '33%', marginVertical: 1};
      if (idx + 1 === i) {
        styleOBJ.marginHorizontal = '.5%';
        i += 3;
      }
      if (val.caption.toLowerCase().includes(this.state.search.toLowerCase())) {
        return (
          <View style={styleOBJ}>
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate('PostExploreDetail', val)
              }>
              <Image
                source={{uri: val.imageURL}}
                style={{height: 125, width: '100%', borderRadius: 2}}
              />
            </TouchableWithoutFeedback>
          </View>
        );
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Search"
          onChangeText={text => this.setState({search: text})}
          value={this.state.search}
          containerStyle={{backgroundColor: '#fff'}}
          inputContainerStyle={{backgroundColor: '#fff'}}
          inputStyle={{color: 'black'}}
          lightTheme={true}
          searchIcon={{size: 27}}
        />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {this.renderExplorePost()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapToStateProps = ({auth}) => {
  return {
    ...auth.user,
  };
};

export default connect(mapToStateProps)(Explore);