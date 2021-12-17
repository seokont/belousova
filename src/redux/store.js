import thunkMiddleware from 'redux-thunk';
import GetPostsreducer from "../reducer/getPosts-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";

let reducers = combineReducers({
         getPosts: GetPostsreducer,
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// window.store = store;
export default store;
