import React, {Component} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect
} from "react-router-dom";
import '../styles/App.css';
import PostsContainer from "./Posts/PostsContainer.jsx";
import PageIdContainer from "./PageId/PageIdContainer.jsx";

class App extends Component {
    render() {
        return (
            <div>

                <Routes>
                    <Route exact path="/" element={<PostsContainer/>}/>
                    <Route path=":id" element={<PageIdContainer/>}/>
                </Routes>

            </div>
        );
    }
}

export default App;