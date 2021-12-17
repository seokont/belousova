import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import PageId from './PageId.jsx'
import {
    getPostsOneCommentIdThunk,
    getPostsOneIdThunk,
    getPostsOneTitleIdThunk,
    getPostsThunk
} from "../../reducer/getPosts-reducer.js";


let mapStateToProps = (state) => ({

    getPosts: state.getPosts,

})
let PageIdContainer = compose(connect(mapStateToProps, {
    getPostsThunk,
    getPostsOneIdThunk,
    getPostsOneTitleIdThunk,
    getPostsOneCommentIdThunk
}))(PageId);
export default PageIdContainer;
