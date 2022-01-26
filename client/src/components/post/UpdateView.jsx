import { useState, useEffect } from "react";
import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import { getPost, updatePost, uploadFile } from '../../service/api';
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit : 'cover'
    },
    form: {
        display: 'flex',
        flexDirection :'row',
        margintop :10
    },
    textfield: {
        flex: 1, 
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        marginTop: 30,
        border: 'none',
        fontSize: 18,
        "&:focus-visible":{
            outline: 'none'
        }
    }
 }));
 const intialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'Mohamed',
    categories: 'All',
    createdDate: new Date()
}

const UpdateView = ({ match }) => {
    const classes = useStyles();
   
    const history = useHistory();

    const [post, setPost] = useState({intialValues});
    const [file, setFile] = useState('');
    const [image, setImage] = useState('')
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    
    useEffect(() => {
        const getImage = async () => {
            console.log(file);
            if(file) {
                const data = new FormData() ;
                data.append("name", file.name);
                data.append("file", file);

                const image = await uploadFile(data);
                post.picture = image.data;
                setImage(image.data);
                
            }
        }
        getImage();
    }, [file])
    useEffect(() => {
        const fetchData = async () => {
           let data =  await getPost(match.params.id);
           console.log(data);
           setPost(data);
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        setPost({ ...setPost, [e.target.name]: e.target.value})
    }
    
    const updateBlog =async () => {
        await updatePost(match.params.id, post)
        history.push(`/details/${match.params.id}`);
    }
    return(
  <Box className={classes.container}>
      <img className={classes.image} src={url} alt="banner" />

      <FormControl className={classes.form}>
      <label htmlFor="fileInput">
          <AddCircle fontSize="large" color="action"/>
          </label>
          <input 
            type="file"         
            id="fileInput" 
            style={{display:'none'}}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputBase placeholder="Title" name="title" onChange={(e) => handleChange(e)} value={post.title}className={classes.textfield}/>
          <Button  onClick={() => updateBlog()} variant="contained" color="primary">Update Post</Button>
      </FormControl>
      <TextareaAutosize 
      rowsMin={5}
      placeholder="Write Something Here..."
      className={classes.textarea}
      value={post.description}
      onChange={(e) => handleChange(e)}
      name="description"
      />
  </Box>
    )
}

export default UpdateView;
