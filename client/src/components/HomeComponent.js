import React, { useEffect, useState } from 'react'
import { Link} from "react-router-dom";
import postService from '../services/post.service';

const HomeComponent = () => {
  

  const [currentUser, setUser] = useState("");  

  const [posts, setPosts] = useState();
  useEffect(() => {
    postService.getAllPost().then((response) => {
      setPosts(response)
    })

  })

  const deletePost = (_id) => {
    postService.deletePost(_id).then((response) => {
      alert("Post Deleted Successfully")
    })
  }

  return (

    <div class="grid max-h-screen place-items-center mt-24 mb-10 w-3/4 mx-auto">

      {posts ?
        posts.map(post => (
          <div key={post._id} className=" rounded overflow-hidden border w-full lg:w-6/12 bg-white md:w-6/12 mx-3 md:mx-0 lg:mx-0">
            <div class="w-full flex justify-between p-3">
              <div class="flex">
                <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic"></img>
                </div>
                {/* <button type='submit' onClick={goProfile.bind(this,post.owner)} class="pt-1 ml-2 font-bold text-sm">{post.owner}</button> */}
                <Link class="pt-1 ml-2 font-bold text-sm" to={`/profile/${post.owner}`} >{post.owner}</Link>

              </div>

              <span class="px-2 hover:bg-gray-300 cursor-pointer rounded"><i class="fas fa-ellipsis-h pt-2 text-lg"></i></span>
              {localStorage.getItem('user') ?
                JSON.parse(localStorage.getItem('user')).user.username == post.owner ?
                  <button type="submit" onClick={deletePost.bind(this,post._id)} class="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-red-700 dark:focus:ring-blue-800">delete</button>
                  :
                  <div></div>

                :
                <div></div>
              }


            </div>
            <img class="w-full bg-cover overflow-hidden" src={post.imagePath}></img>
            <div class="px-3 pb-2">
              <div class="pt-2">
                <i class="far fa-heart cursor-pointer"></i>
                <span class="text-sm text-gray-400 font-medium">{post.likes.length}</span>
                <button class="text-sm text-green-500 font-bold ml-4 ">Like</button>
              </div>
              <div class="pt-1">
                <div class="mb-2 text-sm">
                <Link class="pt-1 ml-2 font-bold text-sm" to={`/profile/${post.owner}`} >{post.owner}</Link> {post.description}
                </div>
              </div>
              {/* <div class="text-sm mb-2 text-gray-400 cursor-pointer font-medium">View all 14 comments</div>
          <div class="mb-2">
            <div class="mb-2 text-sm">
              <span class="font-medium mr-2">razzle_dazzle</span> Dude! How cool! I went to New Zealand last summer and had a blast taking the tour! So much to see! Make sure you bring a good camera when you go!
            </div>
          </div> */}
            </div>
          </div>
        ))
        : <div> asdasd </div>
      }
    </div>

  )
}

export default HomeComponent