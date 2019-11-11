import firebase from '@firebase/app';
import '@firebase/database';


import {
    EDIT_POST,
    SAVE_POST,
    CAPTION_CHANGE,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL
} from './types';

export const initEditPost = ({ caption }) => {
    return {
        type: EDIT_POST,
        payload: caption
    }
}

export const inputEditCaptionChange = (caption) => {
    return {
        type: CAPTION_CHANGE,
        payload: caption
    }
}

export const saveEditPost = ({id,caption,imageURL,userId}) => {
    return (dispatch)=>{
        dispatch({
            type: SAVE_POST

        })
        firebase.database().ref(`/posts/${id}`).set({
            caption:caption,
            imageURL:imageURL,
            userId:userId
        }).then(() =>{
           dispatch({
               type:EDIT_POST_SUCCESS
           }) 
        })
        .catch((err)=>{
            dispatch({
                type:EDIT_POST_FAIL,
                payload:err.message
            })
        })
    }
}




