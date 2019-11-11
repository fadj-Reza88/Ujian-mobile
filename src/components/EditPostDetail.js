import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { inputEditCaptionChange, saveEditPost } from '../actions/EditPostAction';

class EditPostDetail extends Component {

    state = {
        isVisible : false,
        deleteVisible : false,
    }

    componentDidUpdate(){
        if(!this.props.username){
            this.props.navigation.goBack()
        }
    }


    onEditPress = () => {
        this.props.initEditProfile({
            username: this.props.user.displayName,
            profileImage: this.props.user.photoURL
        })
        this.props.navigation.navigate('EditPostDetail')
    }


    onDeletePress = ( ) => {
        this.setState({ deleteVisible: false})
        this.props.deletePost(this.props.id)
    }

    render() {
        if(!this.props.username){
            return <View/>
        }
        return (
            <View>
                <Header
                    placement='left'
                    centerComponent={{ 
                        text: 'Edit Info', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftComponent={{ 
                        icon: 'clear', 
                        color: 'black',
                        onPress: () => this.props.selectProfilePost(null) 
                    }}rightComponent={this.props.loading ? <ActivityIndicator size="small" color="#4388d6" /> : { 
                        icon: 'done', 
                        color: '#4388d6',
                        onPress: this.saveProfile
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                />
                <Card>
                        <CardItem>
                            <Left style={{flex : 3}}>
                                <Thumbnail source={{uri: this.props.userPhoto }} />
                                <Body>
                                    <Text>{this.props.username}</Text>
                                    <Text note>Instagrin User</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Icon
                                    name='more-vert'
                                    size={30}
                                    onPress={() => this.setState({ isVisible : true})}
                                />
                            </Right>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: this.props.imageURL }} style={{height: 350, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                            <Input
                                value={this.props.caption}
                                onChangeText={this.props.inputEditCaptionChange}
                            />
                            </Left>
                        </CardItem>
                </Card>
               
            </View>
        );
    }
}

const mapStateToProps=({editPost,post})=>{
    return{
        ...editPost,
        ...post.selectedPostDetailProfile,
    }
}

export default connect(mapStateToProps,{inputEditCaptionChange,saveEditPost})(EditPostDetail);