import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Posts from './Posts.jsx'
import {
    addNewPostThunk,
    addRemoveIdThunk,
    deletePostThunk,
    getPostsIdThunk,
    getPostsOneIdThunk,
    getPostsThunk
} from "../../reducer/getPosts-reducer";


let mapStateToProps = (state) => ({
    getPosts: state.getPosts,

})
let PostsContainer = compose(connect(mapStateToProps, {
    getPostsThunk,
    getPostsIdThunk,
    getPostsOneIdThunk,
    addRemoveIdThunk,
    deletePostThunk,
    addNewPostThunk
}))(Posts);
export default PostsContainer;
