import { useState, useEffect } from 'react';
import { Box, TextareaAutosize, Button, makeStyles } from '@material-ui/core';
import { newComment, getComments } from '../../service/api.js'

//Components
import Comment from './Comment';


const useStyles = makeStyles({
    component: {
        marginTop: 100,
        display: 'flex'
    },
    image: {
        width :50,
        height: 50,
        borderRadius: '50%'
    },
    textarea:{
        width: '100%',
        margin: '0 20px'
    },
    button: {
        height: 40
    }
})


const initialValues= {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}
const Comments = ({ post }) => {
    const classes = useStyles();
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getData = async () => {
        let response = await getComments(post._id);
        setComments(response);
        }
        getData();
    }, [post, toggle])
    // console.log(post);
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: post.username,
            // name: 'wadw',
            postId: post._id,
            comments: e.target.value
        })
    }
    const postComment = async () => {
        await newComment(comment);
        setToggle(prev => !prev);
    }
    return (
        <Box>
            <Box className={classes.component}>
                <img src={url} alt="dp" className={classes.image}/>
                <TextareaAutosize className={classes.textarea}
                rowsMin={5}
                onChange={(e) => handleChange(e)} />
                <Button 
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                onClick={() => postComment()}
                >POST</Button>
            </Box>
            {
                comments && comments.map(comment => (
                    <Comment comment={comment} setToggle={setToggle}/>
                ))
            }
        </Box>
    )
}


export default Comments;