import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://social-app-demirel.herokuapp.com/post/";


class PostService {
  createPost(email, password,) {
    return axios
      .post(API_URL + "createPost", {
        email,
        password
      },{ headers: authHeader() })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  getAllPost() {
    return axios
      .get(API_URL + "getAllPost", {
      }).then((response =>{
        return response.data
      }))
      .catch((err)=>{
        return err.data
      })
    
  }
  deletePost(_id) {
    console.log(_id)
    return axios.post(API_URL + "deletePost", {
      _id
    },{ headers: authHeader() });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new PostService();