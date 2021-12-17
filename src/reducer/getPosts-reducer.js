import {getPosts} from "../api/api";

const GET_ONE_POST_TITLE = "GET_ONE_POST_TITLE";
const GET_ONE_POST_COMENT = "GET_ONE_POST_COMENT";
const GET_POSTS = "GET_POSTS";
const GET_POSTS_ID = "GET_POSTS_ID";
const GET_ONE_POST = "GET_ONE_POST";
const ADD_REMOVE_ID = "ADD_REMOVE_ID";
const DELETE_POST = "DELETE_POST";
const ADD_NEW_POST = "ADD_NEW_POST";

let Initialization = {
    Result: [],
    PostId: null,
    removeId: [],
    Posts:[],

};
let GetPostsReducer = (state = Initialization, action) => {
    switch (action.type) {
        case GET_POSTS_ID:
            return {
                ...state,
                PostId: action.id
            };
        case GET_POSTS:
            return {
                ...state,
                Result: action.result,

            };
        case ADD_REMOVE_ID:
            return {
                ...state,
                removeId: action.array
            };
        case ADD_NEW_POST:
            return {
                ...state,
                Result: [{id:new Date().valueOf(),userId:action.author,title:action.title, body:action.text},...state.Result]
            };
        case GET_ONE_POST:
            const recordsCopy = [...state.Result];
            const recordToChange = recordsCopy.find(x => x.id === action.id)
            if (recordToChange) {
                recordToChange.body = action.text;
            }
            return {...state, Result: [...recordsCopy]}
        case GET_ONE_POST_TITLE:
            const resultCopy = [...state.Result];
            const recordToChangeTitle = resultCopy.find(x => x.id === action.id)
            if (recordToChangeTitle) {
                recordToChangeTitle.title = action.title;
            }
            return {...state, Result: [...resultCopy]}
        case GET_ONE_POST_COMENT:
            const resultCopyComent = [...state.Result];
            const recordToAddComent = resultCopyComent.find(x => x.id === action.id)
            if (recordToAddComent) {
                recordToAddComent.coment = action.coment;
            }
            return {...state, Result: [...resultCopyComent]}
        case DELETE_POST:
            const resultCopyDeletePost = [...state.Result];
            const array = resultCopyDeletePost.filter((obj) => !action.array.includes(obj.id))
            return {...state, Result: [...array]}
        default:
            return state;
    }
}
export let getPostsForState = (result) => ({type: GET_POSTS, result: result});
export let getPostsIdForState = (id) => ({type: GET_POSTS_ID, id: id});
export let getPostsOneIdForState = (id, text) => ({type: GET_ONE_POST, id: id, text: text});
export let getPostsOneTitleIdForState = (id, text) => ({type: GET_ONE_POST_TITLE, id: id, title: text});
export let getPostsOneComentIdForState = (id, coment) => ({type: GET_ONE_POST_COMENT, id: id, coment: coment});
export let addRemoveIdForState = (array) => ({type: ADD_REMOVE_ID, array});
export let deletePostForState = (array) => ({type: DELETE_POST, array});
export let addNewPostForState = (title,text,author) => ({type: ADD_NEW_POST, title,text,author});
export const getPostsThunk = (args) =>
    async (dispatch) => {
        let response = await getPosts.getPostsArgument(args);
        if (response.status === 200) {
            dispatch(getPostsForState(response.data));
        }
    }
export const getPostsIdThunk = (id) => (dispatch) => {
    dispatch(getPostsIdForState(id));
}
export const getPostsOneIdThunk = (id, text) => (dispatch) => {
    dispatch(getPostsOneIdForState(id, text));
}
export const getPostsOneTitleIdThunk = (id, title) => (dispatch) => {
    dispatch(getPostsOneTitleIdForState(id, title));
}
export const getPostsOneCommentIdThunk = (id, coment) => (dispatch) => {
    dispatch(getPostsOneComentIdForState(id, coment));
}
export const addRemoveIdThunk = (array) => (dispatch) => {
    dispatch(addRemoveIdForState(array));
}
export const deletePostThunk = (array) => (dispatch) => {
    dispatch(deletePostForState(array));
}

export const addNewPostThunk = (title,text,author) => (dispatch) => {
    dispatch(addNewPostForState(title,text,author));
}
export default GetPostsReducer;
