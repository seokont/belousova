import React, {createRef, useEffect, useState} from "react";
import style from './Posts.module.css';
import {DataGrid} from '@material-ui/data-grid';
import {
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, InputLabel, MenuItem, Select, TextareaAutosize,
    TextField
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Route, Redirect, Switch, withRouter, useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
const Posts = (props) => {
    const [valuePosts, setValuePosts] = useState([...props.getPosts.Result]);
    let navigate = useNavigate();
    const classes = useStyles();
    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'userId',
            headerName: 'Автор',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Название',
            width: 600,
            editable: true,
        },
        {
            field: 'body',
            headerName: 'Текст',
            width: 600,
            editable: true,
        },
        {
            field: 'coment',
            headerName: 'Кометнарий',
            width: 400,
            editable: true,
        },
    ];
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [items, setItems] = useState('posts');
    useEffect(() => {
        if (props.getPosts.Result.length === 0) {
            props.getPostsThunk(items)
        }
    }, [])
    const getValue = (e) => {
        let p = []
        if (e.target.value.length == 1) {
            p = props.getPosts.Result.filter((obj) => {
                return obj.userId == e.target.value
            })
        } else {
            p = props.getPosts.Result
        }
        setValuePosts(p)
    }
    const showPopUp = (e) => {
        props.getPostsIdThunk(e)
        navigate(`${e}`);
    }
    const addToRemove = (array) => {
        props.addRemoveIdThunk(array)
    }
    const deletePost = () => {
        props.deletePostThunk(props.getPosts.removeId)
    }
    const [valueTitle, setValueTitle] = useState('');
    const [valueText, setValueText] = useState('');
    const [author, setAuthor] = useState('');
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    };
    const handleChange = (event) => {
        setValueText(event.target.value);
    };
    const handleChangeTitle = (event) => {
        setValueTitle(event.target.value);
    };
    const addNewPost = () => {
        props.addNewPostThunk(valueTitle, valueText, author);
    };
    const noRepeatItem = () => {
        let g = []
        props.getPosts.Result.forEach(h => {
            g.push(h.userId)
        })
        const uniqueNames = Array.from(new Set(g))
        return uniqueNames
    }
    let wrapper = createRef();
    return (
        <div>
            <div className={style.delete_post}>
                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-basic" onChange={getValue} label="Поиск по автору" variant="outlined"/>
                </form>

                <Button variant="outlined" onClick={handleClickOpen}>
                    Добавить пост
                </Button>
                <Dialog open={open} onClose={handleClose} ref={wrapper}>
                    <DialogTitle>Добавить пост</DialogTitle>
                    <DialogContent>
                        <InputLabel id="demo-simple-select-label">Выбирите автора</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={author}
                            label="Author"
                            onChange={handleChangeAuthor}
                        >

                            {noRepeatItem().map(k => {
                                return <MenuItem key={k} value={k}>{k}</MenuItem>
                            })}

                        </Select>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeTitle}
                        />

                        <TextField
                            id="standard-multiline-static"
                            label="Пост"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отменить</Button>
                        <Button onClick={() => {
                            addNewPost()
                            handleClose()
                        }}>Добавить</Button>
                    </DialogActions>
                </Dialog>
                {props.getPosts.removeId.length !== 0 ?
                    <Button onClick={deletePost} variant="contained">Удалить пост</Button> :
                    <div>Нажмите на чексбокс, чтобы выделить и удалить посты</div>}
            </div>


            {props.getPosts.Result.length !== 0 ? <div style={{height: 900, width: '100%'}}>
                <DataGrid
                    rows={valuePosts.length === 0 ? props.getPosts.Result : valuePosts}
                    columns={columns}
                    pageSize={15}
                    checkboxSelection
                    onSelectionModelChange={itm => addToRemove(itm)}
                    disableSelectionOnClick
                    onCellClick={(e) => {
                        showPopUp(e.id)
                    }}
                />
            </div> : <CircularProgress variant="determinate"/>}
        </div>
    )
}
export default Posts;
