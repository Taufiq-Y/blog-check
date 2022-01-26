import axios from 'axios';

const URL = 'http://localhost:5000';


export const createPost = async (post) => {
    try{
       return await  axios.post(`${URL}/create`, post)
    } catch (error) {
console.log('Error while calling createPost API', error);
    }
}
export const getAllPosts = async(param) => {
    try {
     let response =  await  axios.get(`${URL}/posts${param}`);
     return response.data;
    } catch (error) {
        console.log("Error while calling get all post API");
        
    }
}

export const getPost = async(id) => {
try {
    let res =await axios.get(`${URL}/post/${id}`);
    return res.data;
} catch (error) {
    console.log('Error while calling getPost API', error);
}
}

export const updatePost = async (id, post) => {
    try {
        await axios.post(`${URL}/update/${id}`,post)
    } catch (error) {
        console.log("Error while calling updatepost API", error);
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(`${URL}/delete/${id}`)
    } catch (error) {
        console.log("Error while calling deletepost API", error);
    }
}

export const uploadFile = async (post) => {
    console.log(post);
    try {
       return await axios.post(`${URL}/file/upload`, post)
    } catch (error) {
        console.log("Error while uploading image", error);
    }
}

export const newComment = async (data) => {
    try {
        return await axios.post(`${URL}/comment/new`, data);
    } catch (error) {
        console.log("Error while calling newComment API", error);
    }
}

export const getComments = async (id) => {
    try {
       let res = await axios.get(`${URL}/comments/${id}`);
       return res.data
    } catch (error) {
        console.log("Error while calling getComments API", error);
    }
}

export const deleteComment = async (id) => {
    try {
       return await axios.delete(`${URL}/comment/delete/${id}`);
       //return response.data
    } catch (error) {
        console.log("Error while calling deleteComment API", error);
    }
}