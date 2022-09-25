import axios from "axios";
import authHeader from './auth-header';
// const API_URL = "https://social-app-demirel.herokuapp.com/post/";
const API_URL = "http://localhost:3001/post/";

class PostService {
  
  createPost(postName, description, image) {
    const formData = new FormData()
    formData.append('image',image)
    formData.append('description',description)
    formData.append('name',postName)

    return axios
      .post(API_URL + "createPost", {
        image,description,image
      },{ headers: authHeader("multipart/form-data")})
      .then(response => {
        return response;
      });
  }
  getAllPost() {
    return axios
      .get(API_URL + "getAllPost", {
      }).then((response =>{
        console.log(response)
        return response.data
      }))
      .catch((err)=>{
        return err.data
      })
    
  }
  getPostsFromUser(username) {
    return axios
      .post(API_URL + "getPostsFromUser", {
        username
      }).then((response =>{
        return response.data
      }))
      .catch((err)=>{
        return err.data
      })
    
  }
  deletePost(_id) {
    let username = JSON.parse(localStorage.getItem('user')).user.username
    
    return axios.post(API_URL + "deletePost", {
      _id, username
    },{ headers: authHeader("application/json") });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new PostService();