import { 
    FILL_POST_LIST,
    EMPTY_POST_LIST,
    SELECT_POST_PROFILE,
    DELETE_POST,
    DELETE_POST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    postList: [],
    selectedPostDetailProfile: null,
    deleteLoading: false,
    deleteError: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case EMPTY_POST_LIST :
            return { ...state, postList: [] }
        case FILL_POST_LIST :
            return { ...state, postList: [...state.postList, action.payload] }
        case SELECT_POST_PROFILE :
            return { ...state, selectedPostDetailProfile: action.payload}
        case DELETE_POST :
            return { ...state, deleteLoading: true }
        case DELETE_POST_SUCCESS :
            return { ...state, deleteLoading: false, selectedPostDetailProfile: null }
        default :
            return state;
    }
}