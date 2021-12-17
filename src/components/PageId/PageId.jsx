import React, {useEffect, useState} from "react";
import {Route, Redirect, Switch, withRouter, useNavigate, NavLink} from 'react-router-dom';

import {Button, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
const PageId = (props) => {
    const classes = useStyles();

    let navigate = useNavigate();
    useEffect(() => {
        if (isFiltiring() === 'error') {
            navigate('/');
        }
    }, [])
    const isFiltiring = () => {
        let o = [];
        if (props.getPosts.PostId == null) {
            o = ['error']
        } else {
            o = props.getPosts.Result.filter(h => {
                return h.id === props.getPosts.PostId
            })
        }
        return o[0];
    }
    const onPostChange = (event) => {
        let text = event.target.value
        props.getPostsOneIdThunk(props.getPosts.PostId, text)
    }
    const onPostChangeTitle = (event) => {
        let title = event.target.value
        props.getPostsOneTitleIdThunk(props.getPosts.PostId, title)
    }
    const onPostChangeComent = (event) => {
        let coment = event.target.value
        props.getPostsOneCommentIdThunk(props.getPosts.PostId, coment)
    }
    return (
        <div>
            <NavLink to='/'>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon/>}
                >
                    Вернуться
                </Button>


            </NavLink>
            <h2>id Поста: {props.getPosts.PostId}</h2>

            <TextField
                id="standard-multiline-static"
                label="Заголовок"
                multiline
                rows={4}
                onChange={onPostChangeTitle}
                variant="standard"
                fullWidth
                value={isFiltiring().title}
            />


            <TextField
                id="standard-multiline-static"
                label="Пост"
                multiline
                rows={4}
                onChange={onPostChange}
                variant="standard"
                fullWidth
                value={isFiltiring().body}

            />
            <TextField
                id="standard-multiline-static"
                label="Коментарий"
                multiline
                rows={4}
                onChange={onPostChangeComent}
                variant="standard"
                fullWidth
                value={isFiltiring().coment}

            />


        </div>
    )
}
export default PageId;
